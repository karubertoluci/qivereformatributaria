
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { useIsMobile } from '@/hooks/use-mobile';
import ChartExpandToggle from '../components/ChartExpandToggle';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';
import ArticlesPriorityChart from '@/components/ArticlesPriorityChart';

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

  // Filter articles by both book and relevance
  const getFilteredArticles = () => {
    let result = safeArticles;
    
    // Apply book filter
    if (selectedBookId) {
      result = result.filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (selectedBookId === 'I') return articleNum <= 200;
        if (selectedBookId === 'II') return articleNum > 200 && articleNum <= 350;
        return articleNum > 350;
      });
    }
    
    // Apply relevance filter
    if (selectedRelevance) {
      // This would need a proper implementation based on how relevance is determined
      const total = result.length;
      const sortedArticles = [...result].sort((a, b) => a.id.localeCompare(b.id));
      
      if (selectedRelevance === 'Irrelevante') {
        result = sortedArticles.slice(0, Math.ceil(total * 0.2)); // 20%
      } else if (selectedRelevance === 'Pouco relevante') {
        result = sortedArticles.slice(Math.ceil(total * 0.2), Math.ceil(total * 0.4)); // 20%
      } else if (selectedRelevance === 'Moderadamente relevante') {
        result = sortedArticles.slice(Math.ceil(total * 0.4), Math.ceil(total * 0.9)); // 50%
      } else if (selectedRelevance === 'Muito relevante') {
        result = sortedArticles.slice(Math.ceil(total * 0.9)); // 10%
      }
    }
    
    return result;
  };
  
  const displayedArticles = getFilteredArticles();
  
  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    setExpandedArticleId(articleId);
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Visualizações dos artigos</h3>
        <ChartExpandToggle 
          expanded={expanded} 
          toggleExpanded={toggleExpanded} 
        />
      </div>

      <div className={`overflow-x-auto transition-all duration-300 ${expanded ? 'max-h-[2000px]' : 'max-h-[1200px]'}`}>
        <div className={isMobile ? "min-w-[500px]" : ""}>
          <div className="space-y-6">
            {/* Priority Chart - Always show this first */}
            <div className="mb-6">
              <ArticlesPriorityChart 
                articles={displayedArticles}
                segmentId={segmentId}
                onSelectArticle={handleArticleSelect}
                bookId={selectedBookId}
                relevanceFilter={selectedRelevance}
                selectedArticleId={selectedArticleId}
              />
            </div>
            
            {/* 1. Distribuição de Artigos por Livro (Gráfico de Barras Empilhadas) */}
            <div className="mb-6">
              <RelevanceDistributionChart 
                articles={safeArticles}
                segmentId={segmentId}
                onSelectBook={(bookId) => {
                  setSelectedBookId(bookId);
                  if (bookId) {
                    // Find the first article of this book and select it
                    const article = safeArticles.find(a => {
                      if (!a || !a.metadata) return false;
                      
                      const articleNum = parseInt(a.number.replace(/\D/g, '')) || 
                                        parseInt(a.id.replace(/\D/g, ''));
                      
                      if (bookId === 'I') return articleNum <= 200;
                      if (bookId === 'II') return articleNum > 200 && articleNum <= 350;
                      return articleNum > 350;
                    });
                    if (article) handleArticleSelect(article.id);
                  }
                }}
                selectedBook={selectedBookId}
              />
            </div>
            
            {/* 2. Favorability Relevance Chart */}
            <div className="mb-6">
              <FavorabilityRelevanceChart 
                articles={safeArticles}
                segmentId={segmentId}
                bookId={selectedBookId}
              />
            </div>
            
            {/* Only show additional charts when expanded */}
            {expanded && (
              <>
                {/* Book Distribution Chart */}
                <div className="mb-6">
                  <BookDistributionChart 
                    articles={safeArticles}
                    onSelectBook={(bookId) => {
                      setSelectedBookId(bookId);
                      if (bookId) {
                        // Find the first article of this book and select it
                        const article = safeArticles.find(a => {
                          const articleNum = parseInt(a.number.replace(/\D/g, '')) || 
                                          parseInt(a.id.replace(/\D/g, ''));
                          
                          if (bookId === 'I') return articleNum <= 200;
                          if (bookId === 'II') return articleNum > 200 && articleNum <= 350;
                          return articleNum > 350;
                        });
                        if (article) handleArticleSelect(article.id);
                      }
                    }}
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
