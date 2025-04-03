
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
  // Define relevance groups
  const groups: RelevanceGroup[] = [
    { name: 'Irrelevante', score: 0, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Pouco relevante', score: 25, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Moderadamente relevante', score: 50, positive: 0, negative: 0, neutral: 0, total: 0 },
    { name: 'Muito relevante', score: 75, positive: 0, negative: 0, neutral: 0, total: 0, hasCritical: false }
  ];
  
  // Calculate relevance score for each article
  filteredArticles.forEach(article => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) return;
    
    // Calculate score
    let score = 0;
    score += segmentImpacts.length * 10;
    
    let hasCriticalImpact = false;
    
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') score += 15;
      if (impact.type === 'negative') {
        score += 20;
        // Check for critical impact (high severity)
        if (impact.severity === 'high') {
          hasCriticalImpact = true;
        }
      }
    });
    score = Math.min(score, 100);
    
    // Determine which group this article belongs to
    let groupIndex = 0;
    if (score >= 75) groupIndex = 3;
    else if (score >= 50) groupIndex = 2;
    else if (score >= 25) groupIndex = 1;
    
    groups[groupIndex].total += 1;
    
    // Mark group as critical if it contains at least one critical impact
    if (hasCriticalImpact && groupIndex === 3) {
      groups[groupIndex].hasCritical = true;
    }
    
    // Count impacts by type
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') groups[groupIndex].positive += 1;
      else if (impact.type === 'negative') groups[groupIndex].negative += 1;
      else groups[groupIndex].neutral += 1;
    });
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
  if (!relevanceLevel) return articles;
  
  return articles.filter(article => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) return false;
    
    // Calculate score
    let score = 0;
    score += segmentImpacts.length * 10;
    
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') score += 15;
      if (impact.type === 'negative') score += 20;
    });
    score = Math.min(score, 100);
    
    // Match with the selected relevance level
    if (relevanceLevel === 'Muito relevante' && score >= 75) return true;
    if (relevanceLevel === 'Moderadamente relevante' && score >= 50 && score < 75) return true;
    if (relevanceLevel === 'Pouco relevante' && score >= 25 && score < 50) return true;
    if (relevanceLevel === 'Irrelevante' && score < 25) return true;
    
    return false;
  });
};
