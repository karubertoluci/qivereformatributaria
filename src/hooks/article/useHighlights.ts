
import { useState, useEffect } from 'react';
import { HighlightType } from '@/components/results/types';

export const useHighlights = () => {
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  
  // Load highlights from localStorage
  useEffect(() => {
    const savedHighlights = localStorage.getItem('highlights');
    if (savedHighlights) {
      try {
        setHighlights(JSON.parse(savedHighlights));
      } catch (e) {
        console.error('Failed to parse highlights from localStorage:', e);
      }
    }
  }, []);

  // Save highlights to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlights));
  }, [highlights]);

  const handleAddHighlight = (articleId: string, text: string, color: HighlightType['color'] = 'yellow') => {
    const newHighlight: HighlightType = {
      id: crypto.randomUUID(),
      text,
      color,
      articleId
    };
    setHighlights([...highlights, newHighlight]);
  };

  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };

  return {
    highlights,
    setHighlights,
    handleAddHighlight,
    handleRemoveHighlight
  };
};
