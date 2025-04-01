
import React from 'react';
import { Article } from '@/data/articles';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import ArticleCard from '../ArticleCard';

interface ArticleTableViewProps {
  filteredArticles: Article[];
  segmentId: string;
  expandedArticleId: string | null;
  setExpandedArticleId: (id: string | null) => void;
}

const ArticleTableView: React.FC<ArticleTableViewProps> = ({
  filteredArticles,
  segmentId,
  expandedArticleId,
  setExpandedArticleId
}) => {
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
          {filteredArticles.map((article) => {
            const segmentImpacts = article.impacts.filter(impact => 
              impact.segments.includes(segmentId)
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
            article={filteredArticles.find(a => a.id === expandedArticleId)!}
            segmentId={segmentId}
            expanded={true}
            onToggleExpand={() => setExpandedArticleId(null)}
          />
        </div>
      )}
    </>
  );
};

export default ArticleTableView;
