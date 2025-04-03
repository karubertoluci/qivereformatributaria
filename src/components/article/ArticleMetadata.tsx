
import React from 'react';
import { Article } from '@/data/articles';
import { Badge } from '@/components/ui/badge';
import { Book, FileText, BookOpen, Layers, Bookmark } from 'lucide-react';

interface ArticleMetadataProps {
  article: Article;
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({ article }) => {
  // Get book from article id or metadata
  const getBookInfo = () => {
    const bookId = article.metadata?.bookId || getBookIdFromArticleId(article.id);
    const bookTitle = article.metadata?.bookTitle || getBookTitleFromId(bookId);
    
    return { 
      id: bookId,
      title: bookTitle,
      color: getBookColor(bookId)
    };
  };
  
  const getBookIdFromArticleId = (id: string) => {
    // Extract the book ID based on article number or other logic
    const num = parseInt(id.replace(/\D/g, ''));
    if (num <= 180) return 'I';
    if (num <= 300) return 'II';
    return 'III';
  };
  
  const getBookTitleFromId = (bookId: string) => {
    switch(bookId) {
      case 'I': return 'CBS';
      case 'II': return 'IBS';
      case 'III': return 'IS';
      default: return 'Geral';
    }
  };
  
  const getBookColor = (bookId: string) => {
    switch(bookId) {
      case 'I': return 'text-blue-700 bg-blue-100';
      case 'II': return 'text-amber-700 bg-amber-100';
      case 'III': return 'text-purple-700 bg-purple-100';
      default: return 'text-green-700 bg-green-100';
    }
  };
  
  const { id: bookId, title: bookTitle, color: bookColor } = getBookInfo();
  
  // Get the relevance level
  const getRelevanceLevel = () => {
    const score = article.metadata?.relevanceScore || 50;
    
    if (score >= 75) return { level: 'Muito relevante', color: 'text-red-700 bg-red-100' };
    if (score >= 50) return { level: 'Moderadamente relevante', color: 'text-orange-700 bg-orange-100' };
    if (score >= 25) return { level: 'Pouco relevante', color: 'text-yellow-700 bg-yellow-100' };
    return { level: 'Irrelevante', color: 'text-green-700 bg-green-100' };
  };
  
  const { level: relevanceLevel, color: relevanceColor } = getRelevanceLevel();
  
  // Get impact type color
  const getImpactColor = () => {
    const impactType = article.metadata?.impactType || 'neutral';
    
    switch(impactType) {
      case 'positive': return 'text-green-700 bg-green-100';
      case 'negative': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };
  
  const impactColor = getImpactColor();
  
  return (
    <div className="flex flex-col space-y-3 mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Book Badge */}
        <Badge variant="outline" className={`${bookColor} flex items-center gap-1`}>
          <Book className="h-3 w-3" />
          Livro {bookId}: {bookTitle}
        </Badge>
        
        {/* Title Badge - if available */}
        {article.metadata?.title && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            Título: {article.metadata.title}
          </Badge>
        )}
        
        {/* Chapter Badge - if available */}
        {article.metadata?.chapter && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <Bookmark className="h-3 w-3" />
            Capítulo: {article.metadata.chapter}
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        {/* Section Badge - if available */}
        {article.metadata?.section && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <Layers className="h-3 w-3" />
            Seção: {article.metadata.section}
          </Badge>
        )}
        
        {/* Subsection Badge - if available */}
        {article.metadata?.subsection && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Subseção: {article.metadata.subsection}
          </Badge>
        )}
        
        {/* Relevance Badge */}
        <Badge variant="outline" className={`${relevanceColor} flex items-center gap-1`}>
          Relevância: {relevanceLevel}
        </Badge>
        
        {/* Impact Badge */}
        <Badge variant="outline" className={`${impactColor} flex items-center gap-1`}>
          Impacto: {article.metadata?.impactType === 'positive' ? 'Favorável' : 
                    article.metadata?.impactType === 'negative' ? 'Desfavorável' : 'Neutro'}
        </Badge>
      </div>
    </div>
  );
};

export default ArticleMetadata;
