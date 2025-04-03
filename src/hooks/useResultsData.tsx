
import { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { getArticlesByTopic } from '@/components/results/ArticlesByTopic';
import { topics } from '@/components/results/ArticlesByTopic';
import { CommentType, HighlightType } from '@/components/results/types';

export const useResultsData = (segment: BusinessSegment) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'chart'>('list');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles'>('overview');
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  
  // Load highlights from localStorage on mount
  useEffect(() => {
    const savedHighlights = localStorage.getItem('highlights');
    if (savedHighlights) {
      try {
        setHighlights(JSON.parse(savedHighlights));
      } catch (e) {
        console.error('Failed to parse highlights from localStorage:', e);
      }
    }
    
    const savedArticlesData = localStorage.getItem('savedArticles');
    if (savedArticlesData) {
      try {
        setSavedArticles(JSON.parse(savedArticlesData));
      } catch (e) {
        console.error('Failed to parse saved articles from localStorage:', e);
      }
    }
  }, []);

  // Save highlights and saved articles to localStorage on change
  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlights));
  }, [highlights]);
  
  useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);
  
  // Get form data from localStorage
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const hasCompanyData = Object.keys(formData).length > 0;
  
  // Filter articles that affect the selected segment
  const relevantArticles = articles.filter(article => 
    article.impacts.some(impact => impact.segments.includes(segment.id))
  );
  
  // Apply search and impact type filters
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(
        impact => impact.type === filterType && impact.segments.includes(segment.id)
      );
    });
  
  // Organize articles by topic
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  // Count positive and negative impacts
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    
    // Scroll to the article if in list view
    if (viewMode === 'chart') {
      setViewMode('list');
      // Give time for the view to switch before scrolling
      setTimeout(() => {
        const element = document.getElementById(`article-${articleId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Handle adding a highlight
  const handleAddHighlight = (text: string, color: HighlightType['color'], articleId: string) => {
    const newHighlight: HighlightType = {
      id: crypto.randomUUID(),
      text,
      color,
      articleId
    };
    setHighlights([...highlights, newHighlight]);
  };

  // Handle removing a highlight
  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };
  
  // Handle toggle save article
  const handleToggleSaveArticle = (articleId: string) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  return {
    expandedArticleId,
    setExpandedArticleId,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    formData,
    hasCompanyData,
    relevantArticles,
    filteredArticles,
    articlesByTopic,
    positiveCount,
    negativeCount,
    handleArticleSelect,
    topics,
    // Highlight-related state and functions
    highlights,
    setHighlights,
    handleAddHighlight,
    handleRemoveHighlight,
    // Saved articles related state and functions
    savedArticles,
    setSavedArticles,
    handleToggleSaveArticle
  };
};

export type CompanyData = {
  nome?: string;
  cargo?: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  naturezaJuridica?: string;
};
