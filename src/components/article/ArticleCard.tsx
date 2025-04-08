
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen } from 'lucide-react';
import { Article } from '@/data/articles';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
    const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
    
    if (hasNegativeImpact) primaryImpactType = 'negative';
    else if (hasPositiveImpact) primaryImpactType = 'positive';
  }
  
  // Calculate the relevance for display
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  // Calcular a relevância média para o segmento
  const relevanceLevels = {
    'low': 1,
    'medium': 2,
    'high': 3,
    'critical': 4
  };
  
  const averageRelevance = segmentImpacts.reduce((sum, impact) => {
    return sum + (relevanceLevels[impact.severity as keyof typeof relevanceLevels] || 2);
  }, 0) / Math.max(1, segmentImpacts.length);
  
  let relevanceText = '';
  if (averageRelevance >= 3.5) relevanceText = 'Muito relevante';
  else if (averageRelevance >= 2.5) relevanceText = 'Moderadamente relevante';
  else if (averageRelevance >= 1.5) relevanceText = 'Pouco relevante';
  else relevanceText = 'Irrelevante';
  
  // Determinar o livro com base no número do artigo ou metadata
  const getBookInfo = () => {
    if (article.metadata?.bookId) {
      return `Livro ${article.metadata.bookId}`;
    }
    
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || 0;
    if (articleNum <= 180) return 'Livro I';
    if (articleNum <= 300) return 'Livro II';
    return 'Livro III';
  };
  
  return (
    <Card className={`mb-4 border-l-4 hover:shadow-md transition-all ${
      primaryImpactType === 'positive' ? 'border-l-green-500' : 
      primaryImpactType === 'negative' ? 'border-l-red-500' : 
      'border-l-gray-300'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {article.title}
          </CardTitle>
          
          <Badge 
            variant={
              primaryImpactType === 'positive' ? 'default' : 
              primaryImpactType === 'negative' ? 'destructive' : 
              'secondary'
            }
            className={
              primaryImpactType === 'positive' ? 'bg-green-500' : 
              primaryImpactType === 'negative' ? 'bg-red-500' : 
              ''
            }
          >
            {primaryImpactType === 'positive' ? 'Favorável' : 
             primaryImpactType === 'negative' ? 'Desfavorável' : 
             'Neutro'}
          </Badge>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          <span>{getBookInfo()}, Artigo {article.number}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm line-clamp-3 mb-2">
          {article.simplifiedText}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={`text-xs ${
            relevanceText === 'Muito relevante' ? 'bg-green-50 text-green-700 border-green-200' :
            relevanceText === 'Moderadamente relevante' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            relevanceText === 'Pouco relevante' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            {relevanceText}
          </Badge>
          
          {article.metadata?.title && (
            <Badge variant="outline" className="text-xs">
              Título: {article.metadata.title}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full">
              Ver detalhes do artigo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{article.title}</DialogTitle>
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
