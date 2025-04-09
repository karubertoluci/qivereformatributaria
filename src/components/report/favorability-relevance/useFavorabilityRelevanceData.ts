
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
    
    // Define relevance levels in consistent format across components
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
      // Determine relevance category - first try from metadata
      let relevanceLevel;
      
      if (article.metadata?.relevancia) {
        // Map to our standard category names
        const rawRelevance = article.metadata.relevancia;
        if (rawRelevance.includes('Irrelevante')) relevanceLevel = 'Irrelevante';
        else if (rawRelevance.includes('Pouco')) relevanceLevel = 'Pouco Relevante';
        else if (rawRelevance.includes('Moderadamente')) relevanceLevel = 'Moderadamente Relevante';
        else if (rawRelevance.includes('Muito')) relevanceLevel = 'Muito Relevante';
        else relevanceLevel = 'Moderadamente Relevante'; // Default if unknown
      } else {
        // Determine relevance category based on article number
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
        
        // Use the same distribution logic as in article cards
        const randomRelevance = (articleNum % 100) / 100 * 100; // Create deterministic distribution
        
        if (randomRelevance < 40) {
          relevanceLevel = 'Irrelevante'; // 40% of articles
        } else if (randomRelevance < 50) {
          relevanceLevel = 'Pouco Relevante'; // 10% of articles
        } else if (randomRelevance < 90) {
          relevanceLevel = 'Moderadamente Relevante'; // 40% of articles
        } else {
          relevanceLevel = 'Muito Relevante'; // 10% of articles
        }
      }
      
      // Determine favorability - first try from metadata
      let favorability;
      
      if (article.metadata?.impacto) {
        const impacto = article.metadata.impacto;
        if (impacto.includes('Favorável')) favorability = 'favorable';
        else if (impacto.includes('Desfavorável')) favorability = 'unfavorable';
        else favorability = 'neutral';
      } else {
        // Determine favorability from impacts
        const hasPositive = article.impacts.some(impact => impact.type === 'positive');
        const hasNegative = article.impacts.some(impact => impact.type === 'negative');
        
        if (hasPositive && !hasNegative) favorability = 'favorable';
        else if (hasNegative) favorability = 'unfavorable';
        else favorability = 'neutral';
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
