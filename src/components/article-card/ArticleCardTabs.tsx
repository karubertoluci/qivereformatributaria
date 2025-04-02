
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, MessageSquare, Highlighter } from 'lucide-react';
import { CommentType, HighlightType } from '@/components/results/types';
import ArticleContent from '../article/ArticleContent';
import ArticleHighlights from '../article/ArticleHighlights';
import CommentSection from '../results/CommentSection';
import ArticleUsefulness from '../article/ArticleUsefulness';
import { Article } from '@/data/articles';

interface ArticleCardTabsProps {
  article: Article;
  segmentId: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  comments: CommentType[];
  highlights: HighlightType[];
  onAddComment: (text: string) => void;
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight: (id: string) => void;
}

const ArticleCardTabs: React.FC<ArticleCardTabsProps> = ({
  article,
  segmentId,
  activeTab,
  setActiveTab,
  comments,
  highlights,
  onAddComment,
  onAddHighlight,
  onRemoveHighlight
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full">
        <TabsTrigger value="content" className="flex-1">
          <Lightbulb className="h-4 w-4 mr-2" /> Conteúdo
        </TabsTrigger>
        <TabsTrigger value="comments" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" /> 
          Comentários {comments.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">{comments.length}</span>}
        </TabsTrigger>
        <TabsTrigger value="highlights" className="flex-1">
          <Highlighter className="h-4 w-4 mr-2" /> 
          Destaques {highlights.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">{highlights.length}</span>}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="mt-4">
        <ArticleContent 
          article={article}
          segmentId={segmentId}
          highlights={highlights}
          onAddHighlight={onAddHighlight}
        />
        <ArticleUsefulness articleId={article.id} />
      </TabsContent>

      <TabsContent value="comments" className="mt-4">
        <CommentSection
          articleId={article.id}
          comments={comments}
          onAddComment={onAddComment}
        />
      </TabsContent>

      <TabsContent value="highlights" className="mt-4">
        <ArticleHighlights 
          highlights={highlights}
          onRemoveHighlight={onRemoveHighlight}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ArticleCardTabs;
