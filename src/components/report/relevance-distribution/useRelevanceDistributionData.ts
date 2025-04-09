
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
    if (!articles || !Array.isArray(articles)) {
      console.warn('useRelevanceDistributionData: Invalid articles array', articles);
      return;
    }
    
    // Define book metadata
    const booksMetadata = [
      { id: 'I', name: 'Livro I', description: 'CBS' },
      { id: 'II', name: 'Livro II', description: 'IBS' },
      { id: 'III', name: 'Livro III', description: 'IS' }
    ];
    
    // Initialize book counts with zeros
    const bookCounts: Record<string, {
      irrelevante: number;
      poucoRelevante: number;
      moderadamenteRelevante: number;
      muitoRelevante: number;
      total: number;
    }> = {
      'I': { irrelevante: 0, poucoRelevante: 0, moderadamenteRelevante: 0, muitoRelevante: 0, total: 0 },
      'II': { irrelevante: 0, poucoRelevante: 0, moderadamenteRelevante: 0, muitoRelevante: 0, total: 0 },
      'III': { irrelevante: 0, poucoRelevante: 0, moderadamenteRelevante: 0, muitoRelevante: 0, total: 0 },
    };
    
    console.log(`Processing ${articles.length} articles for relevance distribution`);
    
    // Process each article to count by book and relevance
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
      
      if (!bookCounts[bookId]) {
        console.warn(`Unknown book ID: ${bookId}`);
        return;
      }
      
      // Determine relevance based on article number
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      
      // Calculate relevance category using consistent logic
      let relevanceCategory;
      if (articleNum % 10 < 2) {
        relevanceCategory = 'irrelevante'; // 20% of articles
      } else if (articleNum % 10 < 4) {
        relevanceCategory = 'poucoRelevante'; // 20% of articles
      } else if (articleNum % 10 < 9) {
        relevanceCategory = 'moderadamenteRelevante'; // 50% of articles
      } else {
        relevanceCategory = 'muitoRelevante'; // 10% of articles
      }
      
      // Increment counters
      bookCounts[bookId][relevanceCategory]++;
      bookCounts[bookId].total++;
    });
    
    console.log('Book distribution data:', bookCounts);
    
    // Create final data format
    const finalBookData: RelevanceBookData[] = booksMetadata.map(book => ({
      id: book.id,
      name: book.name,
      description: book.description,
      irrelevante: bookCounts[book.id].irrelevante,
      poucoRelevante: bookCounts[book.id].poucoRelevante,
      moderadamenteRelevante: bookCounts[book.id].moderadamenteRelevante,
      muitoRelevante: bookCounts[book.id].muitoRelevante,
      total: bookCounts[book.id].total
    }));
    
    setBookData(finalBookData);
  }, [articles, segmentId]);
  
  return { bookData };
};
