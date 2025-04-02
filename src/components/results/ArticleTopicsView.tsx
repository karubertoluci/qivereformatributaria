
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from '../ArticleCard';
import { Article } from '@/data/articles';
import { Topic, HighlightType } from './types';

interface ArticleTopicsViewProps {
  filteredArticles: Article[];
  articlesByTopic: Record<string, Article[]>;
  topics: Topic[];
  segmentId: string;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  onSelectArticle: (id: string | null) => void;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleTopicsView: React.FC<ArticleTopicsViewProps> = ({
  filteredArticles,
  articlesByTopic,
  topics,
  segmentId,
  expandedArticleId,
  setExpandedArticleId,
  onSelectArticle,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {}
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Todos os Artigos</TabsTrigger>
        {topics.map(topic => (
          <TabsTrigger key={topic.id} value={topic.id}>
            {topic.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all">
        <div className="space-y-6">
          {filteredArticles.map(article => (
            <div key={article.id} id={`article-${article.id}`}>
              <ArticleCard 
                article={article} 
                segmentId={segmentId} 
                expanded={expandedArticleId === article.id} 
                onToggleExpand={() => {
                  setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
                  if (expandedArticleId !== article.id) {
                    onSelectArticle(article.id);
                  } else {
                    onSelectArticle(null);
                  }
                }}
                highlights={highlights}
                onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
                onRemoveHighlight={onRemoveHighlight}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      
      {topics.map(topic => (
        <TabsContent key={topic.id} value={topic.id}>
          <div className="mb-4">
            <h3 className="text-lg font-medium">{topic.name}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
          
          <div className="space-y-6">
            {articlesByTopic[topic.id]?.length > 0 ? (
              articlesByTopic[topic.id].map(article => (
                <div key={article.id} id={`article-${article.id}`}>
                  <ArticleCard 
                    article={article} 
                    segmentId={segmentId} 
                    expanded={expandedArticleId === article.id} 
                    onToggleExpand={() => {
                      setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
                      if (expandedArticleId !== article.id) {
                        onSelectArticle(article.id);
                      } else {
                        onSelectArticle(null);
                      }
                    }}
                    highlights={highlights}
                    onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
                    onRemoveHighlight={onRemoveHighlight}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhum artigo encontrado nesta categoria.
              </p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ArticleTopicsView;
