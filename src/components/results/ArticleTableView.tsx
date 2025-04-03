
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import ArticleCard from '../ArticleCard';
import { HighlightType } from './types';

interface ArticleTableViewProps {
  articles: Article[];
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
  isTableView?: boolean;
  segment: BusinessSegment;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleTableView: React.FC<ArticleTableViewProps> = ({
  articles,
  expandedArticleId,
  setExpandedArticleId,
  isTableView = true,
  segment,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {}
}) => {
  if (isTableView) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artigo</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.number}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  {article.impacts.filter(impact => impact.segments.includes(segment.id)).length}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => setExpandedArticleId(article.id)}
                    className="text-primary hover:text-primary-dark underline text-sm"
                  >
                    Ver Detalhes
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} id={`article-${article.id}`}>
          <ArticleCard 
            article={article}
            segmentId={segment.id}
            expanded={expandedArticleId === article.id}
            onToggleExpand={() => {
              setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
            }}
            highlights={highlights}
            onAddHighlight={(text, color) => onAddHighlight(text, color, article.id)}
            onRemoveHighlight={onRemoveHighlight}
          />
        </div>
      ))}
      
      {articles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum artigo encontrado com os filtros atuais.
        </div>
      )}
    </div>
  );
};

export default ArticleTableView;
