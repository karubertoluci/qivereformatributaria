
import React from 'react';
import { Article } from '@/data/articles';
import ArticleCard from '../ArticleCard';
import { Badge } from '@/components/ui/badge';
import { Topic, HighlightType } from './types';

interface ArticleTopicsViewProps {
  articlesByTopic: Record<string, Article[]>;
  filteredArticles: Article[];
  topics: Topic[];
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  onSelectArticle: (id: string) => void;
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: string, articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
  savedArticles?: string[];
  onToggleSaveArticle?: (articleId: string) => void;
  isCompactView?: boolean;
  onOpenArticleModal?: (article: Article) => void;
}

const ArticleTopicsView: React.FC<ArticleTopicsViewProps> = ({
  articlesByTopic,
  filteredArticles,
  topics,
  expandedArticleId,
  setExpandedArticleId,
  onSelectArticle,
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  savedArticles = [],
  onToggleSaveArticle = () => {},
  isCompactView = false,
  onOpenArticleModal = () => {}
}) => {
  // If no articles are found for any topic
  if (filteredArticles.length === 0) {
    return (
      <div className="text-center p-12">
        <p className="text-lg text-muted-foreground">Nenhum artigo encontrado com os filtros atuais.</p>
      </div>
    );
  }

  // Organize topics by order
  const sortedTopics = [...topics].sort((a, b) => a.order - b.order);
  
  return (
    <div>
      {sortedTopics.map(topic => {
        const topicArticles = articlesByTopic[topic.id] || [];
        
        // Skip topics with no articles
        if (topicArticles.length === 0) return null;
        
        return (
          <div key={topic.id} className="mb-10 last:mb-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1 flex items-center">
                <Badge variant="outline" className="mr-2 bg-primary text-primary-foreground">
                  {topicArticles.length}
                </Badge>
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
            
            <div className={isCompactView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}>
              {topicArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  segmentId={segmentId}
                  expanded={article.id === expandedArticleId}
                  onToggleExpand={() => onSelectArticle(article.id)}
                  highlights={highlights.filter(h => h.articleId === article.id)}
                  onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
                  onRemoveHighlight={onRemoveHighlight}
                  isCompactView={isCompactView}
                  onOpenModal={() => onOpenArticleModal(article)}
                  savedArticles={savedArticles}
                  onToggleSaveArticle={onToggleSaveArticle}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleTopicsView;
