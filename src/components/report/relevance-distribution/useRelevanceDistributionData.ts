
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';

export interface RelevanceBookData {
  id: string;
  name: string;
  irrelevante: number;
  poucoRelevante: number;
  moderadamenteRelevante: number;
  muitoRelevante: number;
  total: number;
  description: string;
}

export const useRelevanceDistributionData = (articles: Article[], segmentId: string) => {
  const [bookData, setBookData] = useState<RelevanceBookData[]>([]);
  
  useEffect(() => {
    // Define book metadata
    const booksMetadata = [
      { id: 'I', name: 'Livro I', description: 'CBS' },
      { id: 'II', name: 'Livro II', description: 'IBS' },
      { id: 'III', name: 'Livro III', description: 'IS' },
      { id: 'IV', name: 'Livro IV', description: 'Outras Disposições' }
    ];
    
    // Initialize data structure
    const initialBookData: RelevanceBookData[] = booksMetadata.map(book => ({
      id: book.id,
      name: book.name,
      description: book.description,
      irrelevante: 0,
      poucoRelevante: 0,
      moderadamenteRelevante: 0,
      muitoRelevante: 0,
      total: 0
    }));
    
    // Process articles
    articles.forEach(article => {
      // Get the book ID based on article number
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                         parseInt(article.id.replace(/\D/g, ''));
      
      let bookId: string;
      if (articleNum <= 180) bookId = 'I';
      else if (articleNum <= 300) bookId = 'II';
      else if (articleNum <= 450) bookId = 'III';
      else bookId = 'IV';
      
      // Get the book data object
      const bookDataObj = initialBookData.find(book => book.id === bookId);
      if (!bookDataObj) return;
      
      // Calculate relevance for this article
      const segmentImpacts = article.impacts.filter(impact => 
        impact.segments.includes(segmentId)
      );
      
      // Calculate the relevance score for the article
      let relevanceScore = 0;
      if (segmentImpacts.length > 0) {
        relevanceScore += segmentImpacts.length * 10;
        segmentImpacts.forEach(impact => {
          if (impact.type === 'positive') relevanceScore += 15;
          if (impact.type === 'negative') relevanceScore += 20;
        });
        relevanceScore = Math.min(relevanceScore, 100);
      }
      
      // Increment the appropriate relevance category
      bookDataObj.total += 1;
      if (relevanceScore >= 75) bookDataObj.muitoRelevante += 1;
      else if (relevanceScore >= 50) bookDataObj.moderadamenteRelevante += 1;
      else if (relevanceScore >= 25) bookDataObj.poucoRelevante += 1;
      else bookDataObj.irrelevante += 1;
    });
    
    setBookData(initialBookData);
  }, [articles, segmentId]);
  
  return { bookData };
};
