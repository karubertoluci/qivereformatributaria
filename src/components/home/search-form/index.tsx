
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessSegments } from '@/data/segments';
import { Dialog } from '@/components/ui/dialog';
import FormDialog from './FormDialog';
import SearchFormButton from './SearchFormButton';
import { FormValues } from './FormDialog';
import LoadingDialog from './LoadingDialog';
import { useFormDialogContext } from '../FormDialogContext';
import { supabase } from '@/integrations/supabase/client';

const SearchForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isFormDialogOpen, closeFormDialog } = useFormDialogContext();
  
  // Função para associar o CNAE (código CNAE) a um segmento de negócio
  const mapCnaeToSegment = (cnae: string): string => {
    // Lógica para mapear códigos CNAE para segmentos de negócio
    // Esta é uma simplificação, você pode expandir com uma tabela de mapeamento mais completa
    const firstDigits = cnae.substring(0, 2);
    
    // Exemplos de mapeamento (simplificado)
    switch (true) {
      case firstDigits >= '01' && firstDigits <= '03': return 'agronegocio';
      case firstDigits >= '10' && firstDigits <= '33': return 'industria';
      case firstDigits >= '41' && firstDigits <= '43': return 'construcao';
      case firstDigits >= '45' && firstDigits <= '47': return 'comercio_varejo';
      case firstDigits >= '49' && firstDigits <= '53': return 'transporte';
      case firstDigits >= '55' && firstDigits <= '56': return 'servicos';
      case firstDigits >= '58' && firstDigits <= '63': return 'tecnologia';
      case firstDigits >= '64' && firstDigits <= '66': return 'financeiro';
      case firstDigits === '85': return 'educacao';
      case firstDigits >= '86' && firstDigits <= '88': return 'saude';
      default: return 'servicos'; // Segmento padrão se não houver correspondência
    }
  };

  // Função para buscar artigos impactados de acordo com o segmento
  const fetchArticlesForSegment = async (segmentId: string) => {
    try {
      // Buscar artigos que têm impacto para o segmento específico
      const { data: impactos, error: impactosError } = await supabase
        .from('impactos')
        .select('*')
        .eq('segmento_id', segmentId);
        
      if (impactosError) throw new Error(impactosError.message);
      
      if (!impactos || impactos.length === 0) {
        console.log(`Nenhum artigo encontrado para o segmento: ${segmentId}`);
        return [];
      }
      
      // Obter IDs dos artigos encontrados
      const artigoIds = impactos.map(impacto => impacto.artigo_id);
      
      // Buscar detalhes dos artigos
      const { data: artigos, error: artigosError } = await supabase
        .from('artigos')
        .select('*')
        .in('id', artigoIds);
        
      if (artigosError) throw new Error(artigosError.message);
      
      // Associar impactos aos artigos
      if (artigos) {
        return artigos.map(artigo => {
          const artigoImpactos = impactos.filter(impacto => impacto.artigo_id === artigo.id);
          return {
            ...artigo,
            impactos: artigoImpactos
          };
        });
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      throw error;
    }
  };

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Armazenar dados do formulário para uso posterior
      localStorage.setItem('formData', JSON.stringify(data));
      
      // Obter o CNAE a partir dos dados da empresa
      let segmentId: string;
      
      if (data.companyData?.cnaePrincipal?.codigo) {
        // Se temos o código CNAE nos dados da empresa
        segmentId = mapCnaeToSegment(data.companyData.cnaePrincipal.codigo);
      } else {
        // Fallback para um segmento padrão
        segmentId = 'servicos';
      }
      
      // Buscar o objeto de segmento correspondente
      const segment = businessSegments.find(s => s.id === segmentId);
      
      if (!segment) {
        throw new Error('Segmento não encontrado');
      }
      
      try {
        // Buscar artigos relacionados ao segmento
        const articles = await fetchArticlesForSegment(segmentId);
        
        // Armazenar no localStorage para uso no componente de resultados
        localStorage.setItem('selectedSegment', JSON.stringify(segment));
        localStorage.setItem('segmentArticles', JSON.stringify(articles));
        
        // Fechar o diálogo e navegar para a página de resultados
        closeFormDialog();
        navigate(`/results/${segmentId}`);
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Erro ao buscar dados. Por favor, tente novamente.');
      }
      
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
        <FormDialog onSubmit={handleSubmit} isLoading={isLoading} />
      </Dialog>
      
      {isLoading && (
        <LoadingDialog 
          open={isLoading} 
          onOpenChange={() => setIsLoading(false)} 
          progress={50} 
          companyName="Sua empresa" 
        />
      )}
      
      <div className="flex flex-col items-center justify-center py-6 gap-6">
        <SearchFormButton />
      </div>
    </div>
  );
};

export default SearchForm;
