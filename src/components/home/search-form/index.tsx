
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
  
  // Function to map CNAE (CNAE code) to a business segment
  const mapCnaeToSegment = (cnae: string): string => {
    // Logic to map CNAE codes to business segments
    // This is a simplification, you can expand with a more complete mapping table
    const firstDigits = cnae.substring(0, 2);
    
    // Examples of mapping (simplified)
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
      default: return 'servicos'; // Default segment if no match
    }
  };

  // Function to fetch articles from the livros_reforma table
  const fetchArticlesForSegment = async (segmentId: string) => {
    try {
      // Fetch articles from the livros_reforma table
      const { data: artigos, error: artigosError } = await supabase
        .from('livros_reforma' as any)
        .select('*');
        
      if (artigosError) throw new Error(artigosError.message);
      
      if (!artigos || artigos.length === 0) {
        console.log(`No articles found in the livros_reforma table`);
        return [];
      }
      
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
      
      return formattedArticles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  };

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store form data for later use
      localStorage.setItem('formData', JSON.stringify(data));
      
      // Get CNAE from company data
      let segmentId: string;
      let cnaeCode: string = '';
      
      if (data.companyData?.cnaePrincipal?.codigo) {
        // If we have the CNAE code in the company data
        cnaeCode = data.companyData.cnaePrincipal.codigo;
        segmentId = mapCnaeToSegment(cnaeCode);
        
        // Record the query in Supabase
        try {
          const { error: insertError } = await supabase
            .from('consultas' as any)
            .insert({
              cnpj: data.cnpj,
              cnae: cnaeCode,
              consultado_em: new Date().toISOString()
            });
            
          if (insertError) {
            console.error('Error recording query:', insertError);
          } else {
            console.log('Query recorded successfully');
          }
        } catch (err) {
          console.error('Error trying to record query:', err);
        }
      } else {
        // Fallback to a default segment
        segmentId = 'servicos';
      }
      
      // Find the corresponding segment object
      const segment = businessSegments.find(s => s.id === segmentId);
      
      if (!segment) {
        throw new Error('Segment not found');
      }
      
      try {
        // Fetch articles related to the segment
        const articles = await fetchArticlesForSegment(segmentId);
        
        // Store in localStorage for use in the results component
        localStorage.setItem('selectedSegment', JSON.stringify(segment));
        localStorage.setItem('segmentArticles', JSON.stringify(articles));
        
        // Close the dialog and navigate to the results page
        closeFormDialog();
        navigate(`/results/${segmentId}`);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
      
    } catch (error) {
      console.error('Error processing form:', error);
      setError('An error occurred. Please try again.');
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
