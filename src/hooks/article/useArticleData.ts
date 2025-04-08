
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CACHE_LIMIT = 100; // Limitar a quantidade de artigos no cache para evitar exceder a quota

export const useArticleData = (segment: BusinessSegment) => {
  const [segmentArticles, setSegmentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Para desenvolvimento, podemos usar dados em cache para reduzir chamadas à API
        const cachedArticles = localStorage.getItem(`segmentArticles_${segment.id}`);
        if (cachedArticles) {
          console.log(`Usando artigos em cache para o segmento: ${segment.id}`);
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        console.log(`Buscando artigos do Supabase para o segmento: ${segment.id}`);
        
        // Buscar da tabela livros_reforma
        const { data: livrosData, error: livrosError } = await supabase
          .from('livros_reforma')
          .select('*');
          
        if (livrosError) {
          console.error('Erro ao buscar da tabela livros_reforma:', livrosError);
          setError(`Erro ao buscar da tabela livros_reforma: ${livrosError.message}`);
          setIsLoading(false);
          return;
        }
        
        if (livrosData && livrosData.length > 0) {
          console.log(`Encontrados ${livrosData.length} artigos na tabela livros_reforma`);
          
          // Limitar a quantidade de artigos para evitar exceder o limite de armazenamento
          const limitedData = livrosData.slice(0, CACHE_LIMIT);
          console.log(`Processando ${limitedData.length} artigos (limitado para evitar exceder quota do localStorage)`);
          
          // Formatar artigos da tabela livros_reforma com dados reduzidos
          const formattedArticles = limitedData.map((item: any) => {
            return {
              id: `art_${item.id}`,
              number: item.artigo || "N/A",
              title: `Artigo ${item.artigo || "N/A"}`,
              // Limitar o tamanho do texto para economizar espaço
              originalText: item.conteudo?.substring(0, 500) || "",
              simplifiedText: item.conteudo?.substring(0, 500) || "",
              impacts: [
                {
                  type: "positive", // Tipo de impacto padrão
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
          
          console.log(`Formatados ${formattedArticles.length} artigos de livros_reforma`);
          setSegmentArticles(formattedArticles);
          
          // Tentar armazenar os artigos em cache, mas com tratamento para quando exceder a quota
          try {
            localStorage.setItem(`segmentArticles_${segment.id}`, JSON.stringify(formattedArticles));
          } catch (storageError) {
            console.warn('Não foi possível armazenar em cache devido ao tamanho dos dados:', storageError);
            // Falhar silenciosamente sem afetar a experiência do usuário
          }
          
          setIsLoading(false);
          return;
        }
        
        // Se não houver dados na tabela livros_reforma, usar dados de exemplo da aplicação
        console.log('Não foram encontrados dados na tabela livros_reforma, usando dados de exemplo');
        
        // Filtrar artigos de exemplo com base no segmento
        const mockArticles = articles.filter(article => 
          article.impacts.some(impact => impact.segments.includes(segment.id))
        );
        
        console.log(`Usando ${mockArticles.length} artigos de exemplo para o segmento`);
        setSegmentArticles(mockArticles);
        
        // Tentar armazenar os artigos em cache com tratamento de erro
        try {
          localStorage.setItem(`segmentArticles_${segment.id}`, JSON.stringify(mockArticles));
        } catch (storageError) {
          console.warn('Não foi possível armazenar em cache devido ao tamanho dos dados:', storageError);
          // Falhar silenciosamente
        }
        
      } catch (error: any) {
        console.error('Erro ao buscar dados do Supabase:', error);
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

// Importando dados de exemplo locais
import { articles } from '@/data/articles';
