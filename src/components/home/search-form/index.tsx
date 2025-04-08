
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
import { mapCnaeToSegment } from './utils';

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
            .from('consultas')
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
        const { data: artigos, error: artigosError } = await supabase
          .from('livros_reforma')
          .select('*');
          
        if (artigosError) throw new Error(artigosError.message);
        
        if (!artigos || artigos.length === 0) {
          console.log(`No articles found in the livros_reforma table`);
        } else {
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
