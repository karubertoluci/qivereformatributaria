
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
  favorablePercent: number;
  neutralPercent: number;
  unfavorablePercent: number;
}

export interface RelevanceTotalData {
  relevanceLevel: string;
  favorable: number;
  neutral: number;
  unfavorable: number;
  total: number;
  favorablePercent: number;
  neutralPercent: number;
  unfavorablePercent: number;
}

export const useFavorabilityRelevanceData = (
  articles: Article[], 
  segmentId: string,
  relevanceFilter: string | null
) => {
  const [bookData, setBookData] = useState<FavorabilityRelevanceData[]>([]);
  const [relevanceTotals, setRelevanceTotals] = useState<RelevanceTotalData[]>([]);
  
  useEffect(() => {
    if (!articles || !Array.isArray(articles)) {
      console.warn('useFavorabilityRelevanceData: Invalid articles array', articles);
      return;
    }
    
    // Define relevance levels
    const relevanceLevels = ['Irrelevante', 'Pouco Relevante', 'Moderadamente Relevante', 'Muito Relevante'];
    
    // Initialize data structure for relevance totals
    const relevanceTotalsMap: Record<string, {
      favorable: number;
      neutral: number;
      unfavorable: number;
      total: number;
    }> = {};
    
    // Initialize all relevance levels, even if they have no data
    relevanceLevels.forEach(level => {
      relevanceTotalsMap[level] = {
        favorable: 0,
        neutral: 0,
        unfavorable: 0,
        total: 0
      };
    });
    
    // Count actual articles by relevance level and favorability
    articles.forEach(article => {
      // Determine relevance category based on article number
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      let relevanceLevel;
      
      if (articleNum % 10 < 2) {
        relevanceLevel = 'Irrelevante'; // 20% of articles
      } else if (articleNum % 10 < 4) {
        relevanceLevel = 'Pouco Relevante'; // 20% of articles
      } else if (articleNum % 10 < 9) {
        relevanceLevel = 'Moderadamente Relevante'; // 50% of articles
      } else {
        relevanceLevel = 'Muito Relevante'; // 10% of articles
      }
      
      // Determine favorability (using the same distribution as before for consistency)
      const random = Math.random() * 100;
      let favorability;
      
      if (random < 40) {
        favorability = 'favorable';
      } else if (random < 60) {
        favorability = 'neutral';
      } else {
        favorability = 'unfavorable';
      }
      
      // Increment counters
      relevanceTotalsMap[relevanceLevel][favorability]++;
      relevanceTotalsMap[relevanceLevel].total++;
    });
    
    // Calculate percentages and create final data format
    const finalRelevanceTotals: RelevanceTotalData[] = relevanceLevels.map(level => {
      const data = relevanceTotalsMap[level];
      const total = data.total || 1; // Avoid division by zero
      
      return {
        relevanceLevel: level,
        favorable: data.favorable,
        neutral: data.neutral,
        unfavorable: data.unfavorable,
        total: data.total,
        favorablePercent: Math.round((data.favorable / total) * 100),
        neutralPercent: Math.round((data.neutral / total) * 100),
        unfavorablePercent: Math.round((data.unfavorable / total) * 100)
      };
    });
    
    setRelevanceTotals(finalRelevanceTotals);
  }, [articles, segmentId, relevanceFilter]);
  
  return { bookData, relevanceTotals };
};
