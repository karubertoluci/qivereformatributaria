
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
  
  // Count actual articles by relevance and favorability
  filteredArticles.forEach(article => {
    // Safety check for article impacts
    if (!article.impacts || !Array.isArray(article.impacts)) {
      console.warn('Article missing valid impacts array:', article);
      return; // Skip this article
    }
    
    // Determine relevance category based on article number
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
    let groupIndex;
    
    if (articleNum % 10 < 2) {
      groupIndex = 0; // Irrelevante - 20% of articles
    } else if (articleNum % 10 < 4) {
      groupIndex = 1; // Pouco relevante - 20% of articles
    } else if (articleNum % 10 < 9) {
      groupIndex = 2; // Moderadamente relevante - 50% of articles
    } else {
      groupIndex = 3; // Muito relevante - 10% of articles
    }
    
    groups[groupIndex].total += 1;
    
    // Determine favorability (consistent with other charts)
    const random = Math.random() * 100;
    
    if (random < 40) {
      // 40% chance of being positive
      groups[groupIndex].positive += 1;
    } else if (random < 60) {
      // 20% chance of being neutral
      groups[groupIndex].neutral += 1;
    } else {
      // 40% chance of being negative
      groups[groupIndex].negative += 1;
    }
    
    // Check for critical impacts
    const hasCriticalImpact = article.impacts.some(impact => 
      impact.type === 'negative' && 
      (impact.severity === 'high' || (typeof impact.severity === 'number' && impact.severity >= 8))
    );
    
    if (hasCriticalImpact && groupIndex === 3) {
      groups[groupIndex].hasCritical = true;
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

export const filterArticlesByRelevance = (articles: Article[], segmentId: string, relevanceLevel: string): Article[] => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return [];
  }
  
  return articles.filter(article => {
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
    
    if (relevanceLevel === 'Irrelevante') {
      return articleNum % 10 < 2; // 20% of articles
    } else if (relevanceLevel === 'Pouco relevante' || relevanceLevel === 'Pouco Relevante') {
      return articleNum % 10 >= 2 && articleNum % 10 < 4; // 20% of articles
    } else if (relevanceLevel === 'Moderadamente relevante' || relevanceLevel === 'Moderadamente Relevante') {
      return articleNum % 10 >= 4 && articleNum % 10 < 9; // 50% of articles
    } else if (relevanceLevel === 'Muito relevante' || relevanceLevel === 'Muito Relevante') {
      return articleNum % 10 >= 9; // 10% of articles
    }
    
    return false;
  });
};
