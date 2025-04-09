
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { clearArticleCache, safelyStoreInCache } from '@/utils/cacheUtils';

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
        const cachedArticles = localStorage.getItem(`allArticles`);
        if (cachedArticles) {
          console.log(`Usando artigos em cache`);
          setSegmentArticles(JSON.parse(cachedArticles));
          setIsLoading(false);
          return;
        }
        
        console.log(`Buscando todos os artigos do Supabase`);
        
        // Buscar todos os artigos da tabela livros_reforma sem limites
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
          
          // Formatar todos os artigos da tabela livros_reforma
          const formattedArticles = livrosData.map((item: any) => {
            // Determinar o livro com base no campo livro do banco de dados
            let bookId;
            
            // Armazenar o valor original do livro para exibição
            const originalLivro = item.livro;
            
            // Extrair o número romano do livro
            if (originalLivro) {
              const match = originalLivro.match(/LIVRO\s+([IVX]+)/i);
              if (match && match[1]) {
                bookId = match[1]; // Apenas o numeral romano
              } else {
                // Se não conseguir extrair, usar ID do artigo para distribuição
                const articleId = parseInt(item.id);
                const randomVal = articleId % 10;
                if (randomVal < 3) {
                  bookId = 'I';
                } else if (randomVal < 7) {
                  bookId = 'II';
                } else {
                  bookId = 'III';
                }
              }
            } else {
              // Criar distribuição aleatória com base no ID do artigo se não houver livro
              const articleId = parseInt(item.id);
              const randomVal = articleId % 10;
              if (randomVal < 3) {
                bookId = 'I';
              } else if (randomVal < 7) {
                bookId = 'II';
              } else {
                bookId = 'III';
              }
            }
            
            // Determinação da relevância baseada no ID do artigo
            const articleId = parseInt(item.id);
            let relevancia;
            const randomRelevance = articleId % 10;
            
            if (randomRelevance < 2) {
              relevancia = 'irrelevante';
            } else if (randomRelevance < 4) {
              relevancia = 'poucoRelevante';
            } else if (randomRelevance < 8) {
              relevancia = 'moderadamenteRelevante';
            } else {
              relevancia = 'muitoRelevante';
            }
            
            return {
              id: `art_${item.id}`,
              number: item.artigo || "N/A",
              title: `Artigo ${item.artigo || "N/A"}`,
              // Manter o texto completo
              originalText: item.conteudo || "",
              simplifiedText: item.conteudo || "",
              impacts: [
                {
                  type: "positive", // Tipo de impacto padrão
                  description: `Artigo relacionado a ${segment.name}`,
                  relevance: "medium",
                  segments: [segment.id]
                }
              ],
              metadata: {
                bookId: bookId,
                livro: originalLivro || `LIVRO ${bookId}`, // Keep original livro data if available
                titulo: item.titulo,
                capitulo: item.capitulo,
                secao: item.secao,
                subsecao: item.subsecao,
                relevancia: relevancia // Adicionar relevância no metadata
              }
            };
          });
          
          console.log(`Formatados ${formattedArticles.length} artigos de livros_reforma`);
          setSegmentArticles(formattedArticles);
          
          // Tentar armazenar os artigos em cache, mas com tratamento para quando exceder a quota
          try {
            localStorage.setItem(`allArticles`, JSON.stringify(formattedArticles));
          } catch (storageError) {
            console.warn('Não foi possível armazenar em cache devido ao tamanho dos dados:', storageError);
            // Se falhar ao salvar no cache, limpe o cache existente para evitar inconsistências
            clearArticleCache(segment.id);
            toast.warning('Cache de artigos limitado devido ao tamanho. Os dados completos serão carregados do servidor em cada visita.');
          }
          
          setIsLoading(false);
          return;
        }
        
        // Se não houver dados na tabela livros_reforma, usar dados de exemplo da aplicação
        console.log('Não foram encontrados dados na tabela livros_reforma, usando dados de exemplo');
        
        // Usar todos os artigos de exemplo, sem filtrar por segmento
        const mockArticles = articles;
        
        console.log(`Usando ${mockArticles.length} artigos de exemplo`);
        setSegmentArticles(mockArticles);
        
        // Tentar armazenar os artigos em cache com tratamento de erro
        safelyStoreInCache(`allArticles`, mockArticles);
        
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
