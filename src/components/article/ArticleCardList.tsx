
import React, { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';
import { HighlightType } from '@/components/results/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface ArticleCardListProps {
  articles: Article[];
  segmentId: string;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 24; // Show 24 items per page (6 rows of 4 cards)

const ArticleCardList: React.FC<ArticleCardListProps> = ({ 
  articles = [], 
  segmentId,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {},
  isLoading = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Safety check
  if (!Array.isArray(articles)) {
    console.warn('ArticleCardList received non-array articles:', articles);
    articles = [];
  }

  // Calculate total pages
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
  
  // Get current articles
  const indexOfLastArticle = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  
  // Reset to first page when articles change
  useEffect(() => {
    setCurrentPage(1);
  }, [articles.length]);

  // Page change handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          currentArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              segmentId={segmentId}
              highlights={highlights}
              onAddHighlight={onAddHighlight}
              onRemoveHighlight={onRemoveHighlight}
            />
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando {indexOfFirstArticle + 1}-{Math.min(indexOfLastArticle, totalArticles)} de {totalArticles} artigos
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevPage} 
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCardList;
