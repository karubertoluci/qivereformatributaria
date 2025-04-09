
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { useIsMobile } from '@/hooks/use-mobile';
import ChartExpandToggle from '../components/ChartExpandToggle';
import BookDistributionChart from '@/components/report/BookDistributionChart';
import FavorabilityRelevanceChart from '@/components/report/FavorabilityRelevanceChart';
import ImpactDistributionChart from '@/components/report/ImpactDistributionChart';
import RelevanceDistributionChart from '@/components/report/RelevanceDistributionChart';

interface ChartSectionProps {
  filteredArticles: Article[];
  segmentId: string;
  setExpandedArticleId: (id: string | null) => void;
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
                      
                      if (bookId === 'I') return articleNum <= 180;
                      if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
                      if (bookId === 'III') return articleNum > 300 && articleNum <= 450;
                      return articleNum > 450;
                    });
                    if (article) setExpandedArticleId(article.id);
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
                        const article = safeArticles.find(a => 
                          a && a.metadata && a.metadata.bookId === bookId
                        );
                        if (article) setExpandedArticleId(article.id);
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
