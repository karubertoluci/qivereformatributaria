
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';

interface BookData {
  id: string;
  name: string;
  total: number;
  muitoRelevante: number;
  moderadamenteRelevante: number;
  poucoRelevante: number;
  irrelevante: number;
}

export const useRelevanceDistributionData = (articles: Article[], segmentId: string) => {
  const [bookData, setBookData] = useState<BookData[]>([]);
  
  useEffect(() => {
    console.log(`Calculating data for ${articles.length} articles, segmentId: ${segmentId}`);
    
    // Initialize book counts
    const books = [
      { id: 'I', name: 'Livro I', color: '#3b82f6' },
      { id: 'II', name: 'Livro II', color: '#f59e0b' },
      { id: 'III', name: 'Livro III', color: '#8b5cf6' }
    ];
    
    const data: BookData[] = books.map(book => ({
      id: book.id,
      name: book.name,
      total: 0,
      muitoRelevante: 0,
      moderadamenteRelevante: 0,
      poucoRelevante: 0,
      irrelevante: 0
    }));
    
    // Process each article to categorize by book and relevance
    articles.forEach(article => {
      // Determine which book this article belongs to
      let bookId = article.metadata?.bookId;
      
      if (!bookId) {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                           parseInt(article.id.replace(/\D/g, ''));
        
        if (articleNum <= 200) bookId = 'I';
        else if (articleNum <= 350) bookId = 'II';
        else bookId = 'III';
      }
      
      // Find book in data array
      const bookIndex = data.findIndex(b => b.id === bookId);
      if (bookIndex === -1) return;
      
      // Increment total count
      data[bookIndex].total += 1;
      
      // Determine relevance level from metadata or calculate based on article ID
      let relevanceLevel: string;
      
      if (article.metadata?.relevancia) {
        relevanceLevel = article.metadata.relevancia;
      } else {
        // Determine based on article number - consistent with other components
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
        
        if (articleNum % 10 < 2) {
          relevanceLevel = 'irrelevante'; // 20% of articles
        } else if (articleNum % 10 < 4) {
          relevanceLevel = 'poucoRelevante'; // 20% of articles
        } else if (articleNum % 10 < 9) {
          relevanceLevel = 'moderadamenteRelevante'; // 50% of articles
        } else {
          relevanceLevel = 'muitoRelevante'; // 10% of articles
        }
      }
      
      // Increment the corresponding relevance counter
      if (relevanceLevel.includes('Muito') || relevanceLevel === 'muitoRelevante') {
        data[bookIndex].muitoRelevante += 1;
      } else if (relevanceLevel.includes('Moderadamente') || relevanceLevel === 'moderadamenteRelevante') {
        data[bookIndex].moderadamenteRelevante += 1;
      } else if (relevanceLevel.includes('Pouco') || relevanceLevel === 'poucoRelevante') {
        data[bookIndex].poucoRelevante += 1;
      } else {
        data[bookIndex].irrelevante += 1;
      }
    });
    
    console.log('Generated book data:', data);
    setBookData(data);
  }, [articles, segmentId]);
  
  return { bookData };
};
