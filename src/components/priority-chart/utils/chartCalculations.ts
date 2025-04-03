
import { Article } from '@/data/articles';

export interface ArticlePriorityData {
  id: string;
  number: string;
  title: string;
  relevance: number;
  urgency: number;
  isNegative: boolean;
  simplified: string;
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
    
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') {
        relevance += 15;
        urgency += impact.severity === 'high' ? 35 : 
                  impact.severity === 'medium' ? 20 : 10;
      }
      if (impact.type === 'negative') {
        isNegative = true;
        relevance += 20;
        urgency += impact.severity === 'high' ? 50 : 
                  impact.severity === 'medium' ? 30 : 15;
      }
    });
    
    // Cap scores to a max of 100
    relevance = Math.min(relevance, 100);
    urgency = Math.min(urgency, 100);
    
    result.push({
      id: article.id,
      number: article.number,
      title: article.title,
      relevance,
      urgency,
      isNegative,
      simplified: article.simplifiedText.substring(0, 120) + '...',
    });
  }
  
  // Sort by urgency and relevance
  return result.sort((a, b) => (b.relevance + b.urgency) - (a.relevance + a.urgency));
};
