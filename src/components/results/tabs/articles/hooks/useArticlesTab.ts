
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Article } from '@/data/articles';
import { BusinessSegment } from '@/data/segments';

export const useArticlesTab = (
  filteredArticles: Article[], 
  relevantArticles: Article[],
  segment: BusinessSegment
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(searchParams.get('book') || null);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState<string | null>(searchParams.get('title') || null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [chartBookFilter, setChartBookFilter] = useState<string | null>(null);
  const [chartRelevanceFilter, setChartRelevanceFilter] = useState<string | null>(null);

  // Make the sidebar filter and chart filter work together
  useEffect(() => {
    if (chartBookFilter && chartBookFilter !== selectedBookFilter) {
      setSelectedBookFilter(chartBookFilter);
    }
  }, [chartBookFilter, selectedBookFilter]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Filter articles based on selected filters
  const displayedArticles = useMemo(() => {
    let result = filteredArticles;

    if (selectedBookFilter) {
      result = result.filter(article => {
        if (article.metadata?.bookId) {
          return article.metadata.bookId === selectedBookFilter;
        }
        return article.metadata?.livro === selectedBookFilter;
      });
    }

    if (selectedTitleFilter) {
      result = result.filter(article => article.title === selectedTitleFilter);
    }

    return result;
  }, [filteredArticles, selectedBookFilter, selectedTitleFilter]);

  // Extract book and title lists
  const books = useMemo(() => {
    const allBooks = relevantArticles.map(article => article.metadata?.bookId || article.metadata?.livro).filter(Boolean);
    return Array.from(new Set(allBooks));
  }, [relevantArticles]);
  
  const titles = useMemo(() => {
    const allTitles = relevantArticles.map(article => article.title).filter(Boolean);
    return Array.from(new Set(allTitles));
  }, [relevantArticles]);

  // Get the displayed book and title names for ActiveFilters
  const bookName = selectedBookFilter ? `Livro ${selectedBookFilter}` : '';
  const titleName = selectedTitleFilter && titles.find(t => t === selectedTitleFilter) || '';

  // Calculate neutral count
  const neutralCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'neutral' && impact.segments.includes(segment.id))
  ).length;

  return {
    selectedBookFilter,
    setSelectedBookFilter,
    selectedTitleFilter,
    setSelectedTitleFilter,
    expanded,
    toggleExpanded,
    chartBookFilter,
    setChartBookFilter,
    chartRelevanceFilter,
    setChartRelevanceFilter,
    displayedArticles,
    books,
    titles,
    bookName,
    titleName,
    neutralCount
  };
};
