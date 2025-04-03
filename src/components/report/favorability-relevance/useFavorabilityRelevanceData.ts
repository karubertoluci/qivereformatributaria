
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';

export interface FavorabilityRelevanceData {
  name: string;
  bookId: string;
  relevanceLevel: string;
  favorable: number;
  neutral: number;
  unfavorable: number;
  total: number;
}

export const useFavorabilityRelevanceData = (
  articles: Article[], 
  segmentId: string,
  relevanceFilter: string | null
) => {
  const [bookData, setBookData] = useState<FavorabilityRelevanceData[]>([]);
  
  useEffect(() => {
    // Define book metadata
    const books = ['I', 'II', 'III', 'IV'];
    const relevanceLevels = ['Irrelevante', 'Pouco relevante', 'Moderadamente relevante', 'Muito relevante'];
    
    // Initialize data structure
    const initialData: FavorabilityRelevanceData[] = [];
    
    books.forEach(bookId => {
      relevanceLevels.forEach(level => {
        initialData.push({
          name: `Livro ${bookId} - ${level}`,
          bookId,
          relevanceLevel: level,
          favorable: 0,
          neutral: 0,
          unfavorable: 0,
          total: 0
        });
      });
    });
    
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
      
      // Calculate relevance for this article
      const segmentImpacts = article.impacts.filter(impact => 
        impact.segments.includes(segmentId)
      );
      
      if (segmentImpacts.length === 0) return;
      
      // Calculate the relevance score for the article
      let relevanceScore = 0;
      relevanceScore += segmentImpacts.length * 10;
      
      let positiveCount = 0;
      let negativeCount = 0;
      let neutralCount = 0;
      
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') {
          relevanceScore += 15;
          positiveCount += 1;
        } else if (impact.type === 'negative') {
          relevanceScore += 20;
          negativeCount += 1;
        } else {
          neutralCount += 1;
        }
      });
      
      relevanceScore = Math.min(relevanceScore, 100);
      
      // Determine relevance level
      let relevanceLevel: string;
      if (relevanceScore >= 75) relevanceLevel = 'Muito relevante';
      else if (relevanceScore >= 50) relevanceLevel = 'Moderadamente relevante';
      else if (relevanceScore >= 25) relevanceLevel = 'Pouco relevante';
      else relevanceLevel = 'Irrelevante';
      
      // Apply relevance filter if present
      if (relevanceFilter && relevanceLevel !== relevanceFilter) return;
      
      // Find the data object for this book and relevance level
      const dataObject = initialData.find(
        item => item.bookId === bookId && item.relevanceLevel === relevanceLevel
      );
      
      if (!dataObject) return;
      
      // Update the data
      dataObject.total += 1;
      dataObject.favorable += positiveCount;
      dataObject.neutral += neutralCount;
      dataObject.unfavorable += negativeCount;
    });
    
    // Calculate percentages and filter out empty data
    const finalData = initialData
      .filter(item => item.total > 0)
      .map(item => {
        const total = item.favorable + item.neutral + item.unfavorable;
        return {
          ...item,
          favorable: Math.round((item.favorable / total) * 100),
          neutral: Math.round((item.neutral / total) * 100),
          unfavorable: Math.round((item.unfavorable / total) * 100)
        };
      });
    
    setBookData(finalData);
  }, [articles, segmentId, relevanceFilter]);
  
  return { bookData };
};
