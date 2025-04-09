
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
    
    // Determine impact type - first check metadata if available
    let impactType: 'positive' | 'negative' | 'neutral';
    let impactLabel: 'Favorável' | 'Neutro' | 'Desfavorável';
    
    if (article.metadata?.impacto) {
      if (article.metadata.impacto.includes('Favorável')) {
        impactType = 'positive';
        impactLabel = 'Favorável';
      } else if (article.metadata.impacto.includes('Desfavorável')) {
        impactType = 'negative';
        impactLabel = 'Desfavorável';
      } else {
        impactType = 'neutral';
        impactLabel = 'Neutro';
      }
    } else {
      // Check for negative impact first (as it takes precedence in cards)
      const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
      const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
      
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
    
    // Determine relevance category - first check metadata if available
    let relevanceCategory: 'Irrelevante' | 'Pouco relevante' | 'Moderadamente relevante' | 'Muito relevante';
    
    if (article.metadata?.relevancia) {
      if (article.metadata.relevancia.includes('Irrelevante')) {
        relevanceCategory = 'Irrelevante';
      } else if (article.metadata.relevancia.includes('Pouco')) {
        relevanceCategory = 'Pouco relevante';
      } else if (article.metadata.relevancia.includes('Moderadamente')) {
        relevanceCategory = 'Moderadamente relevante';
      } else if (article.metadata.relevancia.includes('Muito')) {
        relevanceCategory = 'Muito relevante';
      } else {
        relevanceCategory = 'Moderadamente relevante'; // Default if unknown
      }
    } else {
      // Determine based on article number - consistent with other components
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      
      if (articleNum % 10 < 2) {
        relevanceCategory = 'Irrelevante'; // 20% of articles
      } else if (articleNum % 10 < 4) {
        relevanceCategory = 'Pouco relevante'; // 20% of articles
      } else if (articleNum % 10 < 9) {
        relevanceCategory = 'Moderadamente relevante'; // 50% of articles
      } else {
        relevanceCategory = 'Muito relevante'; // 10% of articles
      }
    }
    
    // Calculate relevance score based on relevance category
    let relevance = 0;
    if (relevanceCategory === 'Irrelevante') {
      relevance = 10 + Math.random() * 15;
    } else if (relevanceCategory === 'Pouco relevante') {
      relevance = 25 + Math.random() * 20;
    } else if (relevanceCategory === 'Moderadamente relevante') {
      relevance = 45 + Math.random() * 30;
    } else {
      relevance = 75 + Math.random() * 25;
    }
    
    // Calculate urgency based on impact type
    let urgency = 0;
    if (impactType === 'negative') {
      urgency = 60 + Math.random() * 40; // Higher urgency for negative impacts
    } else if (impactType === 'positive') {
      urgency = 30 + Math.random() * 40; // Medium urgency for positive impacts
    } else {
      urgency = Math.random() * 40; // Lower urgency for neutral impacts
    }
    
    // Add some variance to scatter the points
    relevance = Math.max(0, Math.min(100, relevance));
    urgency = Math.max(0, Math.min(100, urgency));
    
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
