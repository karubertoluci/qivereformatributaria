
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { supabase } from '@/integrations/supabase/client';

export const useArticleData = (segment: BusinessSegment) => {
  const [segmentArticles, setSegmentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // For development, we can use cached data if available to reduce API calls
        const cachedArticles = localStorage.getItem(`segmentArticles_${segment.id}`);
        if (cachedArticles) {
          console.log(`Using cached articles for segment: ${segment.id}`);
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        console.log(`Fetching articles from Supabase for segment: ${segment.id}`);
        
        // First check if we should load from livros_reforma table
        // Using the generic query method to avoid TypeScript errors
        const { data: livrosData, error: livrosError } = await supabase
          .from('livros_reforma' as any)
          .select('*');
          
        if (livrosError) {
          console.error('Error fetching from livros_reforma:', livrosError);
          setError(`Erro ao buscar da tabela livros_reforma: ${livrosError.message}`);
          setIsLoading(false);
          return;
        }
        
        if (livrosData && livrosData.length > 0) {
          console.log(`Fetched ${livrosData.length} articles from livros_reforma table`);
          
          // Format articles from livros_reforma table
          const formattedArticles = livrosData.map((item: any) => {
            return {
              id: `art_${item.id}`,
              number: item.artigo || "N/A",
              title: `Artigo ${item.artigo || "N/A"}`,
              originalText: item.conteudo || "",
              simplifiedText: item.conteudo || "",
              impacts: [
                {
                  type: "positive", // Default impact type
                  description: `Artigo relacionado a ${segment.name}`,
                  relevance: "medium",
                  segments: [segment.id]
                }
              ],
              metadata: {
                livro: item.livro,
                titulo: item.titulo,
                capitulo: item.capitulo,
                secao: item.secao,
                subsecao: item.subsecao
              }
            };
          });
          
          console.log(`Formatted ${formattedArticles.length} articles from livros_reforma`);
          setSegmentArticles(formattedArticles);
          
          // Cache the articles for this segment to improve performance
          localStorage.setItem(`segmentArticles_${segment.id}`, JSON.stringify(formattedArticles));
          setIsLoading(false);
          return;
        }
        
        // If no data in livros_reforma, fall back to original impactos method
        const { data: impactos, error: impactosError } = await supabase
          .from('impactos')
          .select('*')
          .eq('segmento_id', segment.id);
          
        if (impactosError) {
          console.error('Error fetching impacts:', impactosError);
          setError(`Erro ao buscar impactos: ${impactosError.message}`);
          setIsLoading(false);
          return;
        }
        
        if (!impactos || impactos.length === 0) {
          console.log(`No impacts found for segment: ${segment.id}`);
          setIsLoading(false);
          return;
        }
        
        const artigoIds = impactos.map(impacto => impacto.artigo_id);
        console.log(`Found ${artigoIds.length} article IDs for segment: ${segment.id}`);
        
        // Then fetch the articles
        const { data: artigos, error: artigosError } = await supabase
          .from('artigos')
          .select('*')
          .in('id', artigoIds);
          
        if (artigosError) {
          console.error('Error fetching articles:', artigosError);
          setError(`Erro ao buscar artigos: ${artigosError.message}`);
          setIsLoading(false);
          return;
        }
        
        if (!artigos || artigos.length === 0) {
          console.log('No articles found');
          setIsLoading(false);
          return;
        }
        
        console.log(`Fetched ${artigos.length} articles from Supabase`);
        
        // Format articles with their impacts
        const formattedArticles = artigos.map(artigo => {
          const artigoImpactos = impactos
            .filter(impacto => impacto.artigo_id === artigo.id)
            .map(impacto => ({
              type: impacto.tipo,
              description: impacto.descricao,
              relevance: impacto.relevancia,
              segments: [segment.id]
            }));
            
          return {
            id: `art_${artigo.id}`,
            number: artigo.numero.toString(),
            title: `Artigo ${artigo.numero}`,
            originalText: artigo.texto,
            simplifiedText: artigo.texto_simplificado || artigo.texto,
            impacts: artigoImpactos,
            metadata: {
              capituloId: artigo.capitulo_id,
              secaoId: artigo.secao_id,
              subsecaoId: artigo.subsecao_id
            }
          };
        });
        
        console.log(`Formatted ${formattedArticles.length} articles with their impacts`);
        setSegmentArticles(formattedArticles);
        
        // Cache the articles for this segment to improve performance
        localStorage.setItem(`segmentArticles_${segment.id}`, JSON.stringify(formattedArticles));
      } catch (error: any) {
        console.error('Error fetching data from Supabase:', error);
        setError(`Erro ao buscar dados: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticlesFromSupabase();
  }, [segment.id]);

  return {
    segmentArticles,
    isLoading,
    error
  };
};
