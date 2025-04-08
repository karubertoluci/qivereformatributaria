
import { Article } from '@/data/articles';
import { getArticlesByTopic } from '@/components/results/ArticlesByTopic';
import { topics } from '@/components/results/ArticlesByTopic';

export const useArticleStatistics = (
  relevantArticles: Article[], 
  segmentId: string
) => {
  // Generate article statistics
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segmentId))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segmentId))
  ).length;
  
  // Group articles by topic
  const articlesByTopic = getArticlesByTopic(relevantArticles);

  return {
    positiveCount,
    negativeCount,
    articlesByTopic,
    topics
  };
};
