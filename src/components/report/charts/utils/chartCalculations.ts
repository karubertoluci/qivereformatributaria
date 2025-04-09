
import { Article, ArticleImpact } from '@/data/articles';

interface RelevanceGroup {
  name: string;
  score: number;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  hasCritical?: boolean;
}

export interface PercentageData {
  name: string;
  favorable: number;
  neutral: number;
  unfavorable: number;
  total: number;
  count: string;
  hasCritical?: boolean;
}

export const calculateRelevanceGroups = (filteredArticles: Article[], segmentId: string): RelevanceGroup[] => {
  // Safety check for input
  if (!filteredArticles || !Array.isArray(filteredArticles)) {
    console.warn('calculateRelevanceGroups received invalid articles:', filteredArticles);
    filteredArticles = [];
  }
  
  // Define relevance groups
  const groups: RelevanceGroup[] = [
    { name: 'Irrelevante', score: 0, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Pouco relevante', score: 25, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Moderadamente relevante', score: 50, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Muito relevante', score: 75, positive: 0, negative: 0, neutral: 0, total: 0, hasCritical: false }
  ];
  
  // Calculate total count for distribution
  const totalArticles = filteredArticles.length;
  const irrelevantTarget = Math.round(totalArticles * 0.4);      // 40% irrelevant
  const lowRelevanceTarget = Math.round(totalArticles * 0.1);    // 10% low relevance
  const mediumRelevanceTarget = Math.round(totalArticles * 0.4); // 40% medium relevance
  const highRelevanceTarget = Math.round(totalArticles * 0.1);   // 10% high relevance
  
  // Counters for each relevance level
  let irrelevantCount = 0;
  let lowRelevanceCount = 0;
  let mediumRelevanceCount = 0;
  let highRelevanceCount = 0;
  
  // Distribute articles according to target percentages
  filteredArticles.forEach(article => {
    // Safety check for article impacts
    if (!article.impacts || !Array.isArray(article.impacts)) {
      console.warn('Article missing valid impacts array:', article);
      return; // Skip this article
    }
    
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments && Array.isArray(impact.segments) && impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) return;
    
    // Apply relevance distribution
    let groupIndex;
    
    if (irrelevantCount < irrelevantTarget) {
      groupIndex = 0; // Irrelevante
      irrelevantCount++;
    } else if (lowRelevanceCount < lowRelevanceTarget) {
      groupIndex = 1; // Pouco relevante
      lowRelevanceCount++;
    } else if (mediumRelevanceCount < mediumRelevanceTarget) {
      groupIndex = 2; // Moderadamente relevante
      mediumRelevanceCount++;
    } else if (highRelevanceCount < highRelevanceTarget) {
      groupIndex = 3; // Muito relevante
      highRelevanceCount++;
    } else {
      // Fallback for any remaining articles
      groupIndex = Math.floor(Math.random() * 4);
    }
    
    groups[groupIndex].total += 1;
    
    // Check for critical impacts
    const hasCriticalImpact = segmentImpacts.some(impact => 
      impact.type === 'negative' && impact.severity === 'high'
    );
    
    if (hasCriticalImpact && groupIndex === 3) {
      groups[groupIndex].hasCritical = true;
    }
    
    // Count impacts by type (using the favorability distribution)
    const favorabilityRandom = Math.random() * 100;
    
    if (favorabilityRandom < 40) {
      // 40% chance of being positive
      groups[groupIndex].positive += 1;
    } else if (favorabilityRandom < 60) {
      // 20% chance of being neutral
      groups[groupIndex].neutral += 1;
    } else if (favorabilityRandom < 90) {
      // 30% chance of being negative
      groups[groupIndex].negative += 1;
    } else {
      // Remaining 10%: distribute based on actual impacts
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') groups[groupIndex].positive += 1;
        else if (impact.type === 'negative') groups[groupIndex].negative += 1;
        else groups[groupIndex].neutral += 1;
      });
    }
  });
  
  return groups;
};

export const calculatePercentageData = (data: RelevanceGroup[]): PercentageData[] => {
  return data.map(group => {
    const total = group.positive + group.negative + group.neutral;
    if (total === 0) return { 
      name: group.name, 
      favorable: 0, 
      neutral: 0, 
      unfavorable: 0,
      total: group.total,
      count: `${group.total} artigos`,
      hasCritical: group.hasCritical
    };
    
    return {
      name: group.name,
      favorable: Math.round((group.positive / total) * 100),
      neutral: Math.round((group.neutral / total) * 100),
      unfavorable: Math.round((group.negative / total) * 100),
      total: group.total,
      count: `${group.total} artigos`,
      hasCritical: group.hasCritical
    };
  });
};

export const checkForCriticalImpacts = (data: RelevanceGroup[]): boolean => {
  return data.some(group => group.hasCritical);
};

// Helper to filter articles by relevance level
export const filterArticlesByRelevance = (articles: Article[], segmentId: string, relevanceLevel: string | null): Article[] => {
  if (!relevanceLevel) return articles || [];
  
  // Safety check for articles
  if (!articles || !Array.isArray(articles)) {
    return [];
  }
  
  // For consistent filtering, we need to apply the same distribution logic
  const totalArticles = articles.length;
  const irrelevantTarget = Math.round(totalArticles * 0.4);      // 40% irrelevant
  const lowRelevanceTarget = Math.round(totalArticles * 0.1);    // 10% low relevance
  const mediumRelevanceTarget = Math.round(totalArticles * 0.4); // 40% medium relevance
  const highRelevanceTarget = Math.round(totalArticles * 0.1);   // 10% high relevance
  
  let irrelevantCount = 0;
  let lowRelevanceCount = 0;
  let mediumRelevanceCount = 0;
  let highRelevanceCount = 0;
  
  return articles.filter(article => {
    // Check for valid impacts
    if (!article.impacts || !Array.isArray(article.impacts)) {
      return false;
    }
    
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments && Array.isArray(impact.segments) && impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) return false;
    
    // Determine article's relevance category based on distribution
    let articleRelevance: string;
    
    if (irrelevantCount < irrelevantTarget) {
      articleRelevance = 'Irrelevante';
      irrelevantCount++;
    } else if (lowRelevanceCount < lowRelevanceTarget) {
      articleRelevance = 'Pouco relevante';
      lowRelevanceCount++;
    } else if (mediumRelevanceCount < mediumRelevanceTarget) {
      articleRelevance = 'Moderadamente relevante';
      mediumRelevanceCount++;
    } else if (highRelevanceCount < highRelevanceTarget) {
      articleRelevance = 'Muito relevante';
      highRelevanceCount++;
    } else {
      // Random fallback
      const random = Math.random() * 100;
      if (random < 40) articleRelevance = 'Irrelevante';
      else if (random < 50) articleRelevance = 'Pouco relevante';
      else if (random < 90) articleRelevance = 'Moderadamente relevante';
      else articleRelevance = 'Muito relevante';
    }
    
    // Match with the selected relevance level
    return articleRelevance === relevanceLevel;
  });
};
