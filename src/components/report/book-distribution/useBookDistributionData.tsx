import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { BookData, BOOK_META } from './types';

export const useBookDistributionData = (articles: Article[]) => {
  const [data, setData] = useState<BookData[]>([]);
  
  useEffect(() => {
    // Group articles by book and count them
    const bookMap = new Map<string, BookData>();
    
    // Initialize each book with zero counts
    BOOK_META.forEach(book => {
      bookMap.set(book.id, {
        bookId: book.id,
        title: book.title,
        color: book.color,
        articles: 0,
        positiveImpacts: 0,
        negativeImpacts: 0,
        neutralImpacts: 0
      });
    });
    
    // Count articles and impacts by book
    articles.forEach(article => {
      // If article has metadata.bookId, use that directly
      let bookId = article.metadata?.bookId;
      
      // Otherwise determine which book this article belongs to based on article number
      if (!bookId) {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (articleNum <= 150) bookId = 'I';
        else if (articleNum <= 250) bookId = 'II';
        else if (articleNum <= 350) bookId = 'III';
        else bookId = 'IV';
      }
      
      // Update article count
      const bookData = bookMap.get(bookId);
      if (bookData) {
        bookData.articles += 1;
        
        // Count impacts by type
        article.impacts.forEach(impact => {
          if (impact.type === 'positive') bookData.positiveImpacts++;
          else if (impact.type === 'negative') bookData.negativeImpacts++;
          else bookData.neutralImpacts++;
        });
      }
    });
    
    // Convert map to array
    setData(Array.from(bookMap.values()));
  }, [articles]);
  
  return data;
};
