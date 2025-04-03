
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Highlighter, MessageSquare, Bookmark, BookmarkX } from 'lucide-react';
import ArticleCard from '../ArticleCard';
import { HighlightType } from './types';
import { toast } from 'sonner';

interface ArticleTableViewProps {
  articles: Article[];
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  isTableView?: boolean;
  segment: BusinessSegment;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: string, articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
  savedArticles?: string[];
  onToggleSaveArticle?: (articleId: string) => void;
  onOpenArticleModal?: (article: Article) => void;
}

const ArticleTableView: React.FC<ArticleTableViewProps> = ({
  articles,
  expandedArticleId,
  setExpandedArticleId,
  isTableView = false,
  segment,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  savedArticles = [],
  onToggleSaveArticle = () => {},
  onOpenArticleModal = () => {}
}) => {
  const handleToggleExpand = (articleId: string) => {
    setExpandedArticleId(articleId === expandedArticleId ? null : articleId);
  };

  const handleToggleSave = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    onToggleSaveArticle(articleId);
    
    const isArticleSaved = savedArticles.includes(articleId);
    toast.success(isArticleSaved 
      ? "Artigo removido dos favoritos"
      : "Artigo adicionado aos favoritos"
    );
  };

  const renderImpactBadge = (article: Article) => {
    const impacts = article.impacts.filter(impact => 
      impact.segments.includes(segment.id)
    );
    
    if (impacts.length === 0) return <span>-</span>;
    
    const hasPositive = impacts.some(impact => impact.type === 'positive');
    const hasNegative = impacts.some(impact => impact.type === 'negative');
    
    if (hasPositive && hasNegative) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Misto</Badge>;
    } else if (hasPositive) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Positivo</Badge>;
    } else if (hasNegative) {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Negativo</Badge>;
    } else {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Neutro</Badge>;
    }
  };

  const getArticleHighlights = (articleId: string) => {
    return highlights.filter(h => h.articleId === articleId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Artigo</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="w-[150px]">Impacto</TableHead>
            <TableHead className="w-[120px]">Marcações</TableHead>
            <TableHead className="w-[130px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map(article => {
            const articleHighlights = getArticleHighlights(article.id);
            const isExpanded = article.id === expandedArticleId;
            const isArticleSaved = savedArticles.includes(article.id);
            
            return (
              <React.Fragment key={article.id}>
                <TableRow 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onOpenArticleModal(article)}
                >
                  <TableCell className="font-medium">{article.number}</TableCell>
                  <TableCell>
                    <div className="line-clamp-1">{article.title}</div>
                  </TableCell>
                  <TableCell>{renderImpactBadge(article)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {articleHighlights.length > 0 && (
                        <div className="flex items-center">
                          <Highlighter className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{articleHighlights.length}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={isArticleSaved ? "text-primary" : ""}
                        onClick={(e) => handleToggleSave(e, article.id)}
                      >
                        {isArticleSaved ? 
                          <BookmarkX className="h-4 w-4" /> : 
                          <Bookmark className="h-4 w-4" />
                        }
                      </Button>
                      {isTableView && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleExpand(article.id);
                          }}
                        >
                          {isExpanded ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {isTableView && isExpanded && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <div className="p-4 bg-muted/30">
                        <ArticleCard 
                          article={article}
                          segmentId={segment.id}
                          expanded={true}
                          onToggleExpand={() => {}}
                          highlights={articleHighlights}
                          onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
                          onRemoveHighlight={onRemoveHighlight}
                          onOpenModal={() => onOpenArticleModal(article)}
                          savedArticles={savedArticles}
                          onToggleSaveArticle={onToggleSaveArticle}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleTableView;
