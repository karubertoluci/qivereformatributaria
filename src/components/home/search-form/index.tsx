
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
import { mapCnaeToSegment, formatCNPJForStorage } from './utils';
import { toast } from 'sonner';

const SearchForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isFormDialogOpen, closeFormDialog } = useFormDialogContext();

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store form data for later use
      localStorage.setItem('formData', JSON.stringify(data));
      
      // Get CNAE from company data or localStorage
      let segmentId: string;
      let cnaeCode: string = '';
      let cnaeDesc: string = '';
      let companyName: string = '';
      let companyDataObj = null;
      
      // Tenta obter os dados da empresa do localStorage primeiro
      const companyDataStr = localStorage.getItem('companyData');
      if (companyDataStr) {
        try {
          companyDataObj = JSON.parse(companyDataStr);
          
          // Tenta diferentes formatos de CNAE (camelCase ou snake_case)
          if (companyDataObj.cnaePrincipal?.codigo) {
            cnaeCode = companyDataObj.cnaePrincipal.codigo;
            cnaeDesc = companyDataObj.cnaePrincipal.descricao || '';
          } else if (companyDataObj.cnae_fiscal) {
            cnaeCode = companyDataObj.cnae_fiscal.toString();
            cnaeDesc = companyDataObj.cnae_fiscal_descricao || '';
          }
          
          // Tenta diferentes formatos de nome (camelCase ou snake_case)
          companyName = companyDataObj.razaoSocial || companyDataObj.razao_social || 
                        companyDataObj.nomeFantasia || companyDataObj.nome_fantasia || 
                        data.nome || "Empresa não identificada";
        } catch (err) {
          console.error('Erro ao analisar dados da empresa do localStorage:', err);
        }
      }
      
      // Verifica se temos o CNAE code, senão busca no localStorage
      if (!cnaeCode) {
        cnaeCode = localStorage.getItem('cnae') || '';
      }
      
      if (cnaeCode) {
        segmentId = mapCnaeToSegment(cnaeCode);
        console.log(`CNAE: ${cnaeCode}, mapeado para segmento: ${segmentId}`);
        
        // Record the query in Supabase
        try {
          // Remove non-numeric characters from CNPJ for storage
          const formattedCNPJ = formatCNPJForStorage(data.cnpj);
          
          // First, save to consultas table (existing functionality)
          const { error: insertError } = await supabase
            .from('consultas')
            .insert({
              cnpj: formattedCNPJ,
              cnae: cnaeCode,
              consultado_em: new Date().toISOString()
            });
            
          if (insertError) {
            console.error('Erro ao registrar consulta:', insertError);
            // Continue with the flow even if the record fails
          } else {
            console.log('Consulta registrada com sucesso');
          }
          
          // Now, save to the new cnae_consultas table with more details
          const { error: cnaeError } = await supabase
            .from('cnae_consultas')
            .insert({
              cnae: cnaeCode,
              descricao: cnaeDesc,
              cnpj: formattedCNPJ,
              empresa: companyName,
              segmento: segmentId
            });
          
          if (cnaeError) {
            console.error('Erro ao registrar dados detalhados do CNAE:', cnaeError);
          } else {
            console.log('Dados do CNAE registrados com sucesso');
          }
        } catch (err) {
          console.error('Erro ao tentar registrar consulta:', err);
          // Continue with the flow even if the record fails
        }
      } else {
        // Fallback to a default segment
        segmentId = 'servicos';
        companyName = data.nome || "Usuário";
        toast.warning('CNAE não encontrado. Usando segmento padrão: Serviços');
      }
      
      // Find the corresponding segment object
      const segment = businessSegments.find(s => s.id === segmentId);
      
      if (!segment) {
        throw new Error('Segmento não encontrado');
      }
      
      try {
        // Fetch articles related to the segment
        const { data: artigos, error: artigosError } = await supabase
          .from('livros_reforma')
          .select('*');
          
        if (artigosError) throw new Error(artigosError.message);
        
        if (!artigos || artigos.length === 0) {
          console.log(`Nenhum artigo encontrado na tabela livros_reforma`);
          toast.warning('Nenhum artigo encontrado. O relatório pode estar incompleto.');
        } else {
          console.log(`${artigos.length} artigos encontrados na tabela livros_reforma`);
          
          // Format the articles to the expected format of the application
          const formattedArticles = artigos.map((artigo: any) => {
            return {
              id: `art_${artigo.id}`,
              number: artigo.artigo || "N/A",
              title: `Artigo ${artigo.artigo || "N/A"}`,
              originalText: artigo.conteudo || "",
              simplifiedText: artigo.conteudo || "",
              impacts: [
                {
                  type: "positive", // Default impact type
                  description: `Artigo relacionado a ${segmentId}`,
                  relevance: "medium",
                  segments: [segmentId]
                }
              ],
              metadata: {
                livro: artigo.livro,
                titulo: artigo.titulo,
                capitulo: artigo.capitulo,
                secao: artigo.secao,
                subsecao: artigo.subsecao
              }
            };
          });
          
          // Store in localStorage for use in the results component
          localStorage.setItem('segmentArticles', JSON.stringify(formattedArticles));
        }
        
        // Store segment in localStorage
        localStorage.setItem('selectedSegment', JSON.stringify(segment));
        
        // Store company name for display
        localStorage.setItem('companyName', companyName);
        
        // Close the dialog and navigate to the results page
        closeFormDialog();
        navigate(`/results/${segmentId}`);
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Erro ao buscar dados. Por favor, tente novamente.');
        toast.error('Erro ao buscar dados. Por favor, tente novamente.');
      }
      
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      setError('Ocorreu um erro. Por favor, tente novamente.');
      toast.error('Ocorreu um erro. Por favor, tente novamente.');
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
