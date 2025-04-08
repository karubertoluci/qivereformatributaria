
import React from 'react';
import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';

interface ArticleCardListProps {
  articles: Article[];
  segmentId: string;
}

const ArticleCardList: React.FC<ArticleCardListProps> = ({ articles, segmentId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          segmentId={segmentId} 
        />
      ))}
    </div>
  );
};

export default ArticleCardList;
