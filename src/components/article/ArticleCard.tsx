
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
import ArticleContent from './';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, segmentId }) => {
  // Identificar o tipo principal de impacto para o card
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');
  
  // Calcular a relevância média para o segmento
  const relevanceLevels = {
    'low': 1,
    'medium': 2,
    'high': 3,
    'critical': 4
  };
  
  const averageRelevance = segmentImpacts.reduce((sum, impact) => {
    return sum + (relevanceLevels[impact.relevance as keyof typeof relevanceLevels] || 2);
  }, 0) / Math.max(1, segmentImpacts.length);
  
  let relevanceText = 'Relevância média';
  if (averageRelevance >= 3.5) relevanceText = 'Relevância crítica';
  else if (averageRelevance >= 2.5) relevanceText = 'Relevância alta';
  else if (averageRelevance >= 1.5) relevanceText = 'Relevância média';
  else relevanceText = 'Relevância baixa';
  
  // Determinar o livro com base no número do artigo ou metadata
  const getBookInfo = () => {
    if (article.metadata?.livro) {
      return `Livro ${article.metadata.livro}`;
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
          <Badge variant="outline" className="text-xs">
            {relevanceText}
          </Badge>
          
          {article.metadata?.titulo && (
            <Badge variant="outline" className="text-xs">
              Título: {article.metadata.titulo}
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
            <ArticleContent article={article} segmentId={segmentId} highlights={[]} onAddHighlight={() => {}} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
