
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Book, Info, AlertTriangle, CheckCircle, Bookmark, Layers } from 'lucide-react';
import { Article } from '@/data/articles';
import { cn } from '@/lib/utils';

interface ArticleHeaderProps {
  article: Article;
  segmentId: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, segmentId }) => {
  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  // Apply the updated relevance distribution
  // 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
  const randomRelevance = Math.random() * 100;
  let importanceText: string;
  let colorClass: string;
  let importanceIcon: JSX.Element;
  
  if (randomRelevance < 40) {
    importanceText = 'Irrelevante';
    colorClass = 'bg-green-100 text-green-700';
    importanceIcon = <CheckCircle className="h-3 w-3" />;
  } else if (randomRelevance < 50) {
    importanceText = 'Pouco relevante';
    colorClass = 'bg-yellow-100 text-yellow-700';
    importanceIcon = <Info className="h-3 w-3" />;
  } else if (randomRelevance < 90) {
    importanceText = 'Moderadamente relevante';
    colorClass = 'bg-orange-100 text-orange-700';
    importanceIcon = <Info className="h-3 w-3" />;
  } else {
    importanceText = 'Muito relevante';
    colorClass = 'bg-red-100 text-red-700';
    importanceIcon = <AlertTriangle className="h-3 w-3" />;
  }

  // Determine which book the article belongs to based on article ID or number
  const getArticleBook = () => {
    // For demonstration purposes, determining book based on article ID or number logic
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                      parseInt(article.id.replace(/\D/g, ''));
    
    if (articleNum <= 180) {
      return { id: 'I', name: 'CBS', color: 'bg-blue-100 text-blue-700' };
    } else if (articleNum <= 300) {
      return { id: 'II', name: 'IBS', color: 'bg-amber-100 text-amber-700' };
    } else {
      return { id: 'III', name: 'IS', color: 'bg-purple-100 text-purple-700' };
    }
  };
  
  const { id: bookId, name: bookName, color: bookColor } = getArticleBook();
  
  // Get metadata (chapter, section, subsection)
  const chapter = article.metadata?.chapter || 'Capítulo 1';
  const section = article.metadata?.section || 'Seção I';
  const subsection = article.metadata?.subsection;
  
  // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
  const randomImpact = Math.random() * 100;
  let impactType: string;
  let impactColor: string;
  
  if (randomImpact < 40) {
    impactType = 'Favorável';
    impactColor = 'bg-green-100 text-green-700';
  } else if (randomImpact < 60) {
    impactType = 'Neutro';
    impactColor = 'bg-gray-100 text-gray-700';
  } else {
    impactType = 'Desfavorável';
    impactColor = 'bg-red-100 text-red-700';
  }
  
  return (
    <div className="flex flex-col space-y-2 mb-3">
      {/* Article Number and Title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span className="bg-primary/10 px-2 py-0.5 rounded text-primary">Artigo {article.number}</span>
          </CardTitle>
        </div>
      </div>
      
      {/* Metadata row: Book, Chapter, Section */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", bookColor)}>
          <Book className="h-3 w-3" />
          Livro {bookId}: {bookName}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
          <Bookmark className="h-3 w-3" />
          {chapter}
        </Badge>
        
        <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
          <Layers className="h-3 w-3" />
          {section}
        </Badge>
        
        {subsection && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {subsection}
          </Badge>
        )}
      </div>
      
      {/* Impact and Relevance row */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2", impactColor)}>
          {impactType}
        </Badge>
        
        <Badge variant="outline" className={cn("text-xs py-0.5 px-2 flex items-center gap-1", colorClass)}>
          {importanceIcon}
          {importanceText}
        </Badge>
      </div>
      
      <CardDescription className="text-lg font-medium text-foreground">
        {article.title}
      </CardDescription>
    </div>
  );
};

export default ArticleHeader;
