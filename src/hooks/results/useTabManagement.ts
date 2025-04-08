
import { useState } from 'react';

export const useTabManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'highlights'>('overview');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    
    // No need to change view mode since it's already 'chart'
    setTimeout(() => {
      const element = document.getElementById(`article-${articleId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return {
    activeTab,
    setActiveTab,
    expandedArticleId,
    setExpandedArticleId,
    handleArticleSelect
  };
};
