
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
      
      // Apply the relevance distribution: 
      // 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
      const random = Math.random() * 100;
      
      // Increment the appropriate relevance category based on distribution
      bookDataObj.total += 1;
      
      if (random < 40) {
        bookDataObj.irrelevante += 1;
      } else if (random < 50) {
        bookDataObj.poucoRelevante += 1;
      } else if (random < 90) {
        bookDataObj.moderadamenteRelevante += 1;
      } else {
        bookDataObj.muitoRelevante += 1;
      }
    });
    
    setBookData(initialBookData);
  }, [articles, segmentId]);
  
  return { bookData };
};
