
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
  
  for (const article of articles) {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) continue;
    
    // Calculate relevance score
    let relevance = 0;
    relevance += segmentImpacts.length * 10;
    
    let urgency = 0;
    let isNegative = false;
    let hasPositive = false;
    let hasNeutral = false;
    let hasNegative = false;
    
    segmentImpacts.forEach(impact => {
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
    
    // Determine primary impact type and label
    let impactType: 'positive' | 'negative' | 'neutral' = 'neutral';
    let impactLabel: 'Favorável' | 'Neutro' | 'Desfavorável' = 'Neutro';
    
    if (hasNegative) {
      impactType = 'negative';
      impactLabel = 'Desfavorável';
    } else if (hasPositive) {
      impactType = 'positive';
      impactLabel = 'Favorável';
    }
    
    // Determine relevance category based on score
    let relevanceCategory: 'Irrelevante' | 'Pouco relevante' | 'Moderadamente relevante' | 'Muito relevante';
    if (relevance >= 75) relevanceCategory = 'Muito relevante';
    else if (relevance >= 50) relevanceCategory = 'Moderadamente relevante';
    else if (relevance >= 25) relevanceCategory = 'Pouco relevante';
    else relevanceCategory = 'Irrelevante';
    
    result.push({
      id: article.id,
      number: article.number,
      title: article.title,
      relevance,
      urgency,
      isNegative,
      simplified: article.simplifiedText.substring(0, 120) + '...',
      relevanceCategory,
      impactType,
      impactLabel
    });
  }
  
  // Sort by urgency and relevance
  return result.sort((a, b) => (b.relevance + b.urgency) - (a.relevance + a.urgency));
};
