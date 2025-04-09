
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
    
    if (segmentImpacts.length === 0) continue;
    
    // Calculate relevance score based on natural factors
    let relevance = 0;
    relevance += segmentImpacts.length * 10;
    
    let urgency = 0;
    let isNegative = false;
    let hasPositive = false;
    let hasNeutral = false;
    let hasNegative = false;
    
    segmentImpacts.forEach(impact => {
      if (!impact) return;
      
      if (impact.type === 'positive') {
        hasPositive = true;
        relevance += 15;
        urgency += impact.severity === 'high' ? 35 : 
                  impact.severity === 'medium' ? 20 : 10;
      }
      if (impact.type === 'negative') {
        hasNegative = true;
        isNegative = true;
        relevance += 20;
        urgency += impact.severity === 'high' ? 50 : 
                  impact.severity === 'medium' ? 30 : 15;
      }
      if (impact.type === 'neutral') {
        hasNeutral = true;
        relevance += 8;
        urgency += impact.severity === 'high' ? 20 : 
                  impact.severity === 'medium' ? 12 : 6;
      }
    });
    
    // Cap scores to a max of 100
    relevance = Math.min(relevance, 100);
    urgency = Math.min(urgency, 100);
    
    // Apply the new distribution for relevance category: 
    // 40% Irrelevante, 10% Pouco relevante, 40% Moderadamente relevante, 10% Muito relevante
    const random = Math.random() * 100;
    let relevanceCategory: 'Irrelevante' | 'Pouco relevante' | 'Moderadamente relevante' | 'Muito relevante';
    
    if (random < 40) {
      // 40% chance of being Irrelevante
      relevanceCategory = 'Irrelevante';
    } else if (random < 50) {
      // 10% chance of being Pouco relevante
      relevanceCategory = 'Pouco relevante';
    } else if (random < 90) {
      // 40% chance of being Moderadamente relevante
      relevanceCategory = 'Moderadamente relevante';
    } else {
      // 10% chance of being Muito relevante
      relevanceCategory = 'Muito relevante';
    }
    
    // Determine primary impact type and label based on the favorability distribution
    let impactType: 'positive' | 'negative' | 'neutral';
    let impactLabel: 'Favorável' | 'Neutro' | 'Desfavorável';
    
    const favorabilityRandom = Math.random() * 100;
    
    if (favorabilityRandom < 40) {
      // 40% chance of being positive
      impactType = 'positive';
      impactLabel = 'Favorável';
    } else if (favorabilityRandom < 60) {
      // 20% chance of being neutral
      impactType = 'neutral';  
      impactLabel = 'Neutro';
    } else if (favorabilityRandom < 90) {
      // 30% chance of being negative
      impactType = 'negative';
      impactLabel = 'Desfavorável';
    } else {
      // Remaining 10%: use the natural distribution based on impacts
      if (hasNegative) {
        impactType = 'negative';
        impactLabel = 'Desfavorável';
      } else if (hasPositive) {
        impactType = 'positive';
        impactLabel = 'Favorável';
      } else {
        impactType = 'neutral';
        impactLabel = 'Neutro';
      }
    }
    
    const simplifiedText = article.simplifiedText || 'Texto não disponível';
    
    result.push({
      id: article.id,
      number: article.number,
      title: article.title,
      relevance,
      urgency,
      isNegative,
      simplified: simplifiedText.substring(0, 120) + '...',
      relevanceCategory,
      impactType,
      impactLabel
    });
  }
  
  // Sort by urgency and relevance
  return result.sort((a, b) => (b.relevance + b.urgency) - (a.relevance + a.urgency));
};
