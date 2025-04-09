
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
      // Skip articles without metadata
      if (!article.metadata) {
        console.log(`Article ${article.id} has no metadata, skipping`);
        return;
      }
      
      // Determine which book this article belongs to - first try using metadata
      let bookId = article.metadata.bookId || article.metadata.livro;
      
      if (!bookId) {
        // Using the updated distribution: 30% Book I, 40% Book II, 30% Book III
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        const randomValue = (articleNum % 100) / 100;  // Create deterministic distribution
        
        if (randomValue < 0.3) bookId = 'I';  // 30% in Book I
        else if (randomValue < 0.7) bookId = 'II'; // 40% in Book II
        else bookId = 'III'; // 30% in Book III
      }
      
      // Normalize book ID (remove "Livro " prefix if present)
      if (typeof bookId === 'string' && bookId.startsWith('Livro ')) {
        bookId = bookId.replace('Livro ', '');
      }
      
      if (!bookCounts[bookId as string]) {
        console.log(`Unknown book ID: ${bookId} for article ${article.id}, defaulting to Book I`);
        bookId = 'I'; // Default to Book I if unknown
      }
      
      // First check if article has relevance in metadata
      let relevanceCategory: string = '';
      if (article.metadata.relevancia) {
        // Map to our standard category names
        const rawRelevance = article.metadata.relevancia;
        if (rawRelevance.includes('Irrelevante')) {
          relevanceCategory = 'irrelevante';
        } else if (rawRelevance.includes('Pouco')) {
          relevanceCategory = 'poucoRelevante';
        } else if (rawRelevance.includes('Moderadamente')) {
          relevanceCategory = 'moderadamenteRelevante';
        } else if (rawRelevance.includes('Muito')) {
          relevanceCategory = 'muitoRelevante';
        } else {
          // Default if unknown
          relevanceCategory = 'moderadamenteRelevante';
        }
      } else {
        // Calculate relevance category using consistent logic with other components
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
        
        // Deterministic distribution based on article number
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
        if (relevanceCategory in bookCounts[bookId as string]) {
          bookCounts[bookId as string][relevanceCategory as keyof typeof bookCounts[typeof bookId]]++;
          bookCounts[bookId as string].total++;
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
