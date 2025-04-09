
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen } from 'lucide-react';
import { Article } from '@/data/articles';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ArticleContent from './ArticleContent';
import { HighlightType } from '@/components/results/types';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  highlights?: HighlightType[];
  onAddHighlight?: (text: string, color: HighlightType['color']) => void;
  onRemoveHighlight?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  segmentId,
  highlights = [],
  onAddHighlight = () => {},
  onRemoveHighlight = () => {}
}) => {
  if (!article) {
    console.warn('ArticleCard received undefined article');
    return null;
  }

  // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
  // The remaining 10% will use the natural distribution
  const random = Math.random() * 100;
  let primaryImpactType: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (random < 40) {
    primaryImpactType = 'positive';
  } else if (random < 60) {
    primaryImpactType = 'neutral';
  } else if (random < 90) {
    primaryImpactType = 'negative';
  } else {
    // For the remaining 10%, determine based on actual impacts
    const segmentImpacts = article.impacts?.filter(impact => impact.segments && impact.segments.includes(segmentId)) || [];
    const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
    const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
    if (hasNegativeImpact) primaryImpactType = 'negative';
    else if (hasPositiveImpact) primaryImpactType = 'positive';
  }

  // Apply relevance distribution: 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
  const relevanceRandom = Math.random() * 100;
  let relevanceText = '';
  let relevanceColor = '';
  if (relevanceRandom < 40) {
    relevanceText = 'Irrelevante';
    relevanceColor = 'bg-gray-50 text-gray-700 border-gray-200';
  } else if (relevanceRandom < 50) {
    relevanceText = 'Pouco relevante';
    relevanceColor = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (relevanceRandom < 90) {
    relevanceText = 'Moderadamente relevante';
    relevanceColor = 'bg-amber-50 text-amber-700 border-amber-200';
  } else {
    relevanceText = 'Muito relevante';
    relevanceColor = 'bg-green-50 text-green-700 border-green-200';
  }

  // Simplify book display
  const getSimplifiedBook = () => {
    if (article.metadata?.bookId) {
      return `Livro ${article.metadata.bookId}`;
    }
    if (article.metadata?.livro) {
      return `Livro ${article.metadata.livro}`;
    }
    const articleNum = parseInt((article.number || '').replace(/\D/g, '')) || 0;
    if (articleNum <= 180) return 'Livro I';
    if (articleNum <= 300) return 'Livro II';
    if (articleNum <= 450) return 'Livro III';
    return 'Livro IV';
  };

  return (
    <Card className={`mb-4 border-l-4 hover:shadow-md transition-all ${
      primaryImpactType === 'positive' ? 'border-l-green-500' : 
      primaryImpactType === 'negative' ? 'border-l-red-500' : 
      'border-l-gray-300'
    }`}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start">
          {/* Simplified Article Number */}
          <div className="text-base font-medium flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Art. {article.number || 'N/A'}
          </div>
          
          {/* Badge group (favorability and relevance) */}
          <div className="flex gap-1.5">
            <Badge variant={primaryImpactType === 'positive' ? 'default' : primaryImpactType === 'negative' ? 'destructive' : 'secondary'} 
              className={primaryImpactType === 'positive' ? 'bg-green-500 text-xs py-0.5' : 
                        primaryImpactType === 'negative' ? 'bg-red-500 text-xs py-0.5' : 
                        'text-xs py-0.5'}>
              {primaryImpactType === 'positive' ? 'Favorável' : 
               primaryImpactType === 'negative' ? 'Desfavorável' : 
               'Neutro'}
            </Badge>
            
            <Badge variant="outline" className={`text-xs py-0.5 ${relevanceColor}`}>
              {relevanceText}
            </Badge>
          </div>
        </div>
        
        {/* Book and Title (Subtitle section) */}
        <div className="mt-1.5 flex flex-col text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{getSimplifiedBook()}</span>
          </div>
          
          {article.metadata?.titulo && (
            <p className="line-clamp-2 mt-0.5 text-left">
              {article.metadata.titulo}
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        {/* Main Article Text - Most important content */}
        <p className="line-clamp-3 text-sm text-gray-800 mb-2 text-left">
          {article.simplifiedText || 'Sem texto disponível'}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/10">
              Ver detalhes do artigo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Art. {article.number || 'N/A'}</DialogTitle>
            </DialogHeader>
            <ArticleContent 
              article={article} 
              segmentId={segmentId} 
              highlights={highlights} 
              onAddHighlight={onAddHighlight} 
              onRemoveHighlight={onRemoveHighlight} 
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
