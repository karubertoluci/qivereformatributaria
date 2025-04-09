
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
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      console.log('useRelevanceDistributionData: Empty or invalid articles array');
      setBookData([]);
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
    }> = {};
    
    // Initialize all books with zero counts
    booksMetadata.forEach(book => {
      bookCounts[book.id] = { 
        irrelevante: 0, 
        poucoRelevante: 0, 
        moderadamenteRelevante: 0, 
        muitoRelevante: 0, 
        total: 0 
      };
    });
    
    console.log(`Processing ${articles.length} articles for relevance distribution`);
    
    // Process each article to count by book and relevance
    articles.forEach(article => {
      // Determine which book this article belongs to
      let bookId: string;
      
      // First try metadata.bookId
      if (article.metadata?.bookId) {
        bookId = article.metadata.bookId;
      } 
      // Then try metadata.livro
      else if (article.metadata?.livro) {
        // Extract roman numeral from strings like "LIVRO I - DO IMPOSTO..."
        const match = article.metadata.livro.match(/LIVRO\s+([IVX]+)/i);
        if (match && match[1]) {
          bookId = match[1]; // Just the roman numeral
        } else {
          // Default if pattern doesn't match
          const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
          if (articleNum <= 200) bookId = 'I';
          else if (articleNum <= 350) bookId = 'II';
          else bookId = 'III';
        }
      } 
      // Finally fall back to article number logic
      else {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
        if (articleNum <= 200) bookId = 'I';
        else if (articleNum <= 350) bookId = 'II';
        else bookId = 'III';
      }
      
      // Normalize book ID 
      if (typeof bookId === 'string' && bookId.startsWith('Livro ')) {
        bookId = bookId.replace('Livro ', '');
      }
      
      if (!bookCounts[bookId]) {
        console.log(`Unknown book ID: ${bookId} for article ${article.id}, defaulting to Book I`);
        bookId = 'I'; // Default to Book I if unknown
      }
      
      // Calculate relevance category
      let relevanceCategory: string;
      
      // First check if article has relevance in metadata
      if (article.metadata?.relevancia) {
        relevanceCategory = article.metadata.relevancia.toLowerCase();
        
        // Map relevance categories to our keys
        if (relevanceCategory.includes('irrelevante')) {
          relevanceCategory = 'irrelevante';
        } else if (relevanceCategory.includes('pouco')) {
          relevanceCategory = 'poucoRelevante';
        } else if (relevanceCategory.includes('moderadamente')) {
          relevanceCategory = 'moderadamenteRelevante';
        } else if (relevanceCategory.includes('muito')) {
          relevanceCategory = 'muitoRelevante';
        } else {
          // Default if unknown
          relevanceCategory = 'moderadamenteRelevante';
        }
      } else {
        // Deterministic distribution based on article number
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
        
        if (articleNum % 10 < 2) {
          relevanceCategory = 'irrelevante'; // 20% of articles
        } else if (articleNum % 10 < 4) {
          relevanceCategory = 'poucoRelevante'; // 20% of articles
        } else if (articleNum % 10 < 9) {
          relevanceCategory = 'moderadamenteRelevante'; // 50% of articles
        } else {
          relevanceCategory = 'muitoRelevante'; // 10% of articles
        }
      }
      
      // Only count the article if it's valid for the segment
      if (article.impacts.some(impact => impact.segments.includes(segmentId))) {
        // Increment the appropriate counter based on relevance category
        if (relevanceCategory in bookCounts[bookId]) {
          // Corrigir o erro TypeScript usando tipo keyof e asserção de tipo
          const relevanceKey = relevanceCategory as keyof typeof bookCounts[typeof bookId];
          bookCounts[bookId][relevanceKey]++;
          bookCounts[bookId].total++;
        } else {
          console.log(`Unknown relevance category: ${relevanceCategory}`);
        }
      }
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
