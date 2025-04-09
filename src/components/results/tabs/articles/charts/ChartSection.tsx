
import React, { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { useIsMobile } from '@/hooks/use-mobile';
import ChartExpandToggle from '../components/ChartExpandToggle';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';
import { filterArticlesByRelevance } from '@/components/report/charts/utils/chartCalculations';

interface ChartSectionProps {
  filteredArticles: Article[];
  segmentId: string;
  setExpandedArticleId: (id: string) => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  filteredArticles,
  segmentId,
  setExpandedArticleId,
  expanded,
  toggleExpanded
}) => {
  const isMobile = useIsMobile();
  // Ensure we have a valid array
  const safeArticles = filteredArticles || [];
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedRelevance, setSelectedRelevance] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Debug the filtered articles
  useEffect(() => {
    console.log(`ChartSection received ${safeArticles.length} articles for segment ${segmentId}`);
    // Log a sample of articles to debug
    if (safeArticles.length > 0) {
      console.log(`Sample article metadata:`, safeArticles[0].metadata);
    }
  }, [safeArticles, segmentId]);

  // Filter articles by both book and relevance
  const getFilteredArticles = () => {
    let result = safeArticles;
    
    // Apply book filter
    if (selectedBookId) {
      result = result.filter(article => {
        if (!article.metadata) return false;
        
        // First try using explicit book ID from metadata
        if (article.metadata.bookId) {
          return article.metadata.bookId === selectedBookId;
        }
        
        // Then try using livro from metadata (may include "Livro " prefix)
        if (article.metadata.livro) {
          const normalizedLivro = article.metadata.livro.replace('Livro ', '');
          return normalizedLivro === selectedBookId;
        }
        
        // Finally fall back to article number logic
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (selectedBookId === 'I') return articleNum <= 200;
        if (selectedBookId === 'II') return articleNum > 200 && articleNum <= 350;
        return articleNum > 350;
      });
    }
    
    // Apply relevance filter
    if (selectedRelevance) {
      result = filterArticlesByRelevance(result, segmentId, selectedRelevance);
    }
    
    return result;
  };
  
  const displayedArticles = getFilteredArticles();
  
  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    setExpandedArticleId(articleId);
  };

  const handleBookSelect = (bookId: string | null) => {
    console.log(`Book selected: ${bookId}`);
    setSelectedBookId(bookId);
    
    if (bookId) {
      // Find the first article of this book
      const article = safeArticles.find(a => {
        if (!a.metadata) return false;
        
        // Try using explicit book ID from metadata
        if (a.metadata.bookId) {
          return a.metadata.bookId === bookId;
        }
        
        // Try using livro from metadata
        if (a.metadata.livro) {
          const normalizedLivro = a.metadata.livro.replace('Livro ', '');
          return normalizedLivro === bookId;
        }
        
        // Fall back to article number logic
        const articleNum = parseInt(a.number.replace(/\D/g, '')) || parseInt(a.id.replace(/\D/g, ''));
        if (bookId === 'I') return articleNum <= 200;
        if (bookId === 'II') return articleNum > 200 && articleNum <= 350;
        return articleNum > 350;
      });
      
      if (article) {
        handleArticleSelect(article.id);
        console.log(`Selected article ${article.id} from book ${bookId}`);
      } else {
        console.log(`No articles found for book ${bookId}`);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Análise de Impactos</h3>
        <ChartExpandToggle 
          expanded={expanded} 
          toggleExpanded={toggleExpanded} 
        />
      </div>

      <div className={`overflow-x-auto transition-all duration-300 ${expanded ? 'max-h-[2000px]' : 'max-h-[1200px]'}`}>
        <div className={isMobile ? "min-w-[500px]" : ""}>
          <div className="space-y-6">
            {/* 1. Distribuição de Artigos por Livro (Gráfico de Barras Empilhadas) */}
            <div className="mb-6">
              <RelevanceDistributionChart 
                articles={safeArticles}
                segmentId={segmentId}
                onSelectBook={handleBookSelect}
                selectedBook={selectedBookId}
                onSelectRelevance={setSelectedRelevance}
                selectedRelevance={selectedRelevance}
              />
            </div>
            
            {/* 2. Favorability Relevance Chart */}
            <div className="mb-6">
              <FavorabilityRelevanceChart 
                articles={safeArticles}
                segmentId={segmentId}
                bookId={selectedBookId}
                onRelevanceFilter={setSelectedRelevance}
                selectedRelevance={selectedRelevance}
              />
            </div>
            
            {/* Only show additional charts when expanded */}
            {expanded && (
              <>
                {/* Book Distribution Chart */}
                <div className="mb-6">
                  <BookDistributionChart 
                    articles={safeArticles}
                    onSelectBook={handleBookSelect}
                    selectedBook={selectedBookId}
                  />
                </div>
                
                {/* Impact Distribution Chart */}
                <div className="mb-6">
                  <ImpactDistributionChart 
                    segmentId={segmentId}
                    articles={safeArticles}
                    bookId={selectedBookId}
                    onRelevanceFilter={(relevanceLevel) => {
                      setSelectedRelevance(relevanceLevel);
                      // If a relevance is selected, find first matching article
                      if (relevanceLevel) {
                        const article = getFilteredArticles()[0];
                        if (article) handleArticleSelect(article.id);
                      }
                    }}
                    selectedRelevance={selectedRelevance}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
