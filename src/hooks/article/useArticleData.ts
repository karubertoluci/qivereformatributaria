
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { supabase } from '@/integrations/supabase/client';

export const useArticleData = (segment: BusinessSegment) => {
  const [segmentArticles, setSegmentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      setIsLoading(true);
      
      try {
        const cachedArticles = localStorage.getItem('segmentArticles');
        if (cachedArticles) {
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        console.log('Buscando artigos do Supabase para o segmento:', segment.id);
        
        const { data: impactos, error: impactosError } = await supabase
          .from('impactos')
          .select('*')
          .eq('segmento_id', segment.id);
          
        if (impactosError) {
          console.error('Erro ao buscar impactos:', impactosError);
          setIsLoading(false);
          return;
        }
        
        if (!impactos || impactos.length === 0) {
          console.log('Nenhum impacto encontrado para o segmento:', segment.id);
          setIsLoading(false);
          return;
        }
        
        const artigoIds = impactos.map(impacto => impacto.artigo_id);
        
        const { data: artigos, error: artigosError } = await supabase
          .from('artigos')
          .select('*')
          .in('id', artigoIds);
          
        if (artigosError) {
          console.error('Erro ao buscar artigos:', artigosError);
          setIsLoading(false);
          return;
        }
        
        if (artigos) {
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
          
          setSegmentArticles(formattedArticles);
          
          localStorage.setItem('segmentArticles', JSON.stringify(formattedArticles));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Supabase:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticlesFromSupabase();
  }, [segment.id]);

  return {
    segmentArticles,
    isLoading
  };
};
