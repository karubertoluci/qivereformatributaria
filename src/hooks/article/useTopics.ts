
import { getArticlesByTopic, topics } from '@/components/results/ArticlesByTopic';
import { Article } from '@/data/articles';

export const useTopics = (filteredArticles: Article[]) => {
  const articlesByTopic = getArticlesByTopic(filteredArticles);
  
  return {
    articlesByTopic,
    topics
  };
};
