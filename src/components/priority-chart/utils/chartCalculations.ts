
import { Article } from '@/data/articles';

export interface ArticlePriorityData {
  id: string;
  number: string;
  title: string;
  relevance: number;
  urgency: number;
  isNegative: boolean;
  simplified: string;
  relevanceCategory: 'Irrelevante' | 'Pouco relevante' | 'Moderadamente relevante' | 'Muito relevante';
  impactType: 'positive' | 'negative' | 'neutral';
  impactLabel: 'Favorável' | 'Neutro' | 'Desfavorável';
}

// Function to score article relevance and distribute them graphically
export const getArticlePriorityData = (articles: Article[], segmentId: string): ArticlePriorityData[] => {
  const result: ArticlePriorityData[] = [];
  
  // Safety check for articles array
  if (!articles || !Array.isArray(articles)) {
    console.warn('getArticlePriorityData received invalid articles:', articles);
    return [];
  }
  
  for (const article of articles) {
    // Safety check for article and its impacts
    if (!article || !article.impacts || !Array.isArray(article.impacts)) {
      console.warn('Invalid article or missing impacts array:', article);
      continue;
    }
    
    const segmentImpacts = article.impacts.filter(impact => 
      impact && impact.segments && Array.isArray(impact.segments) && impact.segments.includes(segmentId)
    );
    
    // Get impact type from the article card styling
    // Apply favorability distribution: 40% favorable, 20% neutral, 30% unfavorable
    // The remaining 10% will use the natural distribution
    const random = Math.random() * 100;
    let impactType: 'positive' | 'negative' | 'neutral' = 'neutral';
    let impactLabel: 'Favorável' | 'Neutro' | 'Desfavorável' = 'Neutro';
    
    if (random < 40) {
      impactType = 'positive';
      impactLabel = 'Favorável';
    } else if (random < 60) {
      impactType = 'neutral';
      impactLabel = 'Neutro';
    } else if (random < 90) {
      impactType = 'negative';
      impactLabel = 'Desfavorável';
    } else {
      // For the remaining 10%, determine based on actual impacts
      const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
      const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
      
      if (hasNegativeImpact) {
        impactType = 'negative';
        impactLabel = 'Desfavorável';
      } else if (hasPositiveImpact) {
        impactType = 'positive';
        impactLabel = 'Favorável';
      } else {
        impactType = 'neutral';
        impactLabel = 'Neutro';
      }
    }
    
    // Apply relevance distribution: 
    // 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
    const relevanceRandom = Math.random() * 100;
    let relevanceCategory: 'Irrelevante' | 'Pouco relevante' | 'Moderadamente relevante' | 'Muito relevante';
    
    if (relevanceRandom < 40) {
      relevanceCategory = 'Irrelevante';
    } else if (relevanceRandom < 50) {
      relevanceCategory = 'Pouco relevante';
    } else if (relevanceRandom < 90) {
      relevanceCategory = 'Moderadamente relevante';
    } else {
      relevanceCategory = 'Muito relevante';
    }
    
    // Calculate relevance score based on relevance category
    let relevance = 0;
    if (relevanceCategory === 'Irrelevante') {
      relevance = Math.random() * 25;
    } else if (relevanceCategory === 'Pouco relevante') {
      relevance = 25 + Math.random() * 20;
    } else if (relevanceCategory === 'Moderadamente relevante') {
      relevance = 45 + Math.random() * 30;
    } else {
      relevance = 75 + Math.random() * 25;
    }
    
    // Calculate urgency based on impact type and relevance
    let urgency = 0;
    if (impactType === 'negative') {
      urgency = 50 + Math.random() * 50; // Higher urgency for negative impacts
    } else if (impactType === 'positive') {
      urgency = 30 + Math.random() * 50; // Medium urgency for positive impacts
    } else {
      urgency = Math.random() * 50; // Lower urgency for neutral impacts
    }
    
    // Add variance to scatter the points
    relevance = Math.max(0, Math.min(100, relevance + (Math.random() * 10 - 5)));
    urgency = Math.max(0, Math.min(100, urgency + (Math.random() * 10 - 5)));
    
    const simplifiedText = article.simplifiedText || 'Texto não disponível';
    
    result.push({
      id: article.id,
      number: article.number,
      title: article.title,
      relevance: Math.round(relevance),
      urgency: Math.round(urgency),
      isNegative: impactType === 'negative',
      simplified: simplifiedText.substring(0, 120) + '...',
      relevanceCategory,
      impactType,
      impactLabel
    });
  }
  
  return result;
};
