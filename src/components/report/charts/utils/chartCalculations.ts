
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
  
  console.log(`Calculating relevance groups for ${filteredArticles.length} articles`);
  
  // Define relevance groups with consistent naming across the application
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
    
    // Get relevance from article metadata if available, otherwise calculate based on article number
    let relevanceCategory = article.metadata?.relevancia;
    
    if (!relevanceCategory) {
      // Determine relevance category based on article number - consistent with card display
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      const randomRelevance = (articleNum % 100) / 100 * 100; // Create deterministic distribution
      
      if (randomRelevance < 40) {
        relevanceCategory = 'Irrelevante'; // 40% of articles
      } else if (randomRelevance < 50) {
        relevanceCategory = 'Pouco relevante'; // 10% of articles
      } else if (randomRelevance < 90) {
        relevanceCategory = 'Moderadamente relevante'; // 40% of articles
      } else {
        relevanceCategory = 'Muito relevante'; // 10% of articles
      }
    }
    
    // Find the group index based on the relevance category
    const groupIndex = groups.findIndex(g => g.name === relevanceCategory);
    if (groupIndex === -1) {
      console.warn(`Unknown relevance category: ${relevanceCategory}`);
      return; // Skip this article
    }
    
    groups[groupIndex].total += 1;
    
    // Count favorability based on article impacts or metadata
    let impactType = article.metadata?.impacto;
    
    if (!impactType) {
      let hasPositive = false;
      let hasNegative = false;
      let hasNeutral = false;
      
      article.impacts.forEach(impact => {
        if (impact.type === 'positive') hasPositive = true;
        else if (impact.type === 'negative') hasNegative = true;
        else hasNeutral = true;
      });
      
      if (hasNegative) impactType = 'Desfavorável';
      else if (hasPositive) impactType = 'Favorável';
      else impactType = 'Neutro';
    }
    
    // Increment counters based on impact type
    if (impactType === 'Favorável') groups[groupIndex].positive += 1;
    else if (impactType === 'Desfavorável') groups[groupIndex].negative += 1;
    else groups[groupIndex].neutral += 1;
    
    // Check for critical impacts
    const hasCriticalImpact = article.impacts.some(impact => 
      impact.type === 'negative' && 
      (impact.severity === 'high' || (typeof impact.severity === 'number' && impact.severity >= 8))
    );
    
    if (hasCriticalImpact && groupIndex === 3) {
      groups[groupIndex].hasCritical = true;
    }
  });
  
  console.log('Calculated relevance groups:', groups);
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
  
  console.log(`Filtering ${articles.length} articles by relevance level: ${relevanceLevel}`);
  
  return articles.filter(article => {
    // First check if the article has metadata with relevancia
    if (article.metadata?.relevancia) {
      return article.metadata.relevancia === relevanceLevel;
    }
    
    // Fall back to the algorithm if no metadata
    const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
    const randomRelevance = (articleNum % 100) / 100 * 100; // Create deterministic distribution
    
    if (relevanceLevel === 'Irrelevante') {
      return randomRelevance < 40; // 40% of articles
    } else if (relevanceLevel === 'Pouco relevante' || relevanceLevel === 'Pouco Relevante') {
      return randomRelevance >= 40 && randomRelevance < 50; // 10% of articles
    } else if (relevanceLevel === 'Moderadamente relevante' || relevanceLevel === 'Moderadamente Relevante') {
      return randomRelevance >= 50 && randomRelevance < 90; // 40% of articles
    } else if (relevanceLevel === 'Muito relevante' || relevanceLevel === 'Muito Relevante') {
      return randomRelevance >= 90; // 10% of articles
    }
    
    return false;
  });
};

export const checkForCriticalImpacts = (relevanceGroups: RelevanceGroup[]): boolean => {
  // Check if any of the "Muito relevante" groups have critical impacts
  return relevanceGroups.some(group => 
    group.name === 'Muito relevante' && 
    group.hasCritical === true
  );
};
