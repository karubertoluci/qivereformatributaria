
import React from 'react';
import { Article } from '@/data/articles';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import ArticleCard from '../ArticleCard';
import { HighlightType } from './types';
import { BusinessSegment } from '@/data/segments';

interface ArticleTableViewProps {
  articles: Article[];
  segment?: BusinessSegment;
  segmentId?: string;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  isTableView?: boolean;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleTableView: React.FC<ArticleTableViewProps> = ({
  articles,
  segment,
  segmentId,
  expandedArticleId,
  setExpandedArticleId,
  isTableView = true,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {}
}) => {
  // Use segmentId from props or from segment object if provided
  const actualSegmentId = segmentId || (segment ? segment.id : '');
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artigo</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Impacto</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => {
            const segmentImpacts = article.impacts.filter(impact => 
              impact.segments.includes(actualSegmentId)
            );
            const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
            const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
            
            return (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.number}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {hasPositiveImpact && (
                      <Badge variant="outline" className="bg-positive text-positive-foreground">
                        <ArrowUp className="h-3 w-3 mr-1" /> Positivo
                      </Badge>
                    )}
                    {hasNegativeImpact && (
                      <Badge variant="outline" className="bg-negative text-negative-foreground">
                        <ArrowDown className="h-3 w-3 mr-1" /> Negativo
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => setExpandedArticleId(expandedArticleId === article.id ? null : article.id)}
                  >
                    {expandedArticleId === article.id ? "Fechar" : "Ver mais"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {expandedArticleId && (
        <div className="mt-6 p-4 border rounded-lg">
          <ArticleCard 
            article={articles.find(a => a.id === expandedArticleId)!}
            segmentId={actualSegmentId}
            expanded={true}
            onToggleExpand={() => setExpandedArticleId(null)}
            highlights={highlights}
            onAddHighlight={onAddHighlight}
            onRemoveHighlight={onRemoveHighlight}
          />
        </div>
      )}
    </>
  );
};

export default ArticleTableView;
