
import { Article } from '@/data/articles';
import { BOOK_DEFINITIONS, BOOK_TITLES } from './constants';

export const getArticleBook = (article: Article): string => {
  // If article has metadata.bookId, use that directly
  if (article.metadata?.bookId) {
    return article.metadata.bookId;
  }
  
  // Otherwise determine based on article number
  const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
  const randomValue = (id % 100) / 100;  // Deterministic distribution
  
  if (randomValue < 0.3) return 'I';      // 30% in Book I
  if (randomValue < 0.7) return 'II';     // 40% in Book II
  return 'III';                           // 30% in Book III
};

export const prepareChartData = (articles: Article[]) => {
  const bookCounts: Record<string, {
    total: number, 
    positive: number, 
    negative: number, 
    neutral: number,
    titles: Record<string, number>
  }> = {};
  
  // Initialize book structure
  BOOK_DEFINITIONS.forEach(book => {
    bookCounts[book.id] = { 
      total: 0, 
      positive: 0, 
      negative: 0, 
      neutral: 0,
      titles: {}
    };
    // Initialize titles
    BOOK_TITLES[book.id as keyof typeof BOOK_TITLES]?.forEach(title => {
      bookCounts[book.id].titles[title] = 0;
    });
  });
  
  // Count articles and categorize by book, impact type, and title
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    const bookData = bookCounts[bookId];
    if (bookData) {
      bookData.total += 1;
      
      // Assign to a title (for demo purposes)
      const id = parseInt(article.id.replace(/\D/g, ''));
      const titleIndex = id % (BOOK_TITLES[bookId as keyof typeof BOOK_TITLES]?.length || 1);
      const title = BOOK_TITLES[bookId as keyof typeof BOOK_TITLES]?.[titleIndex] || 'Outros';
      bookData.titles[title] = (bookData.titles[title] || 0) + 1;
      
      // Count by impact type
      article.impacts.forEach(impact => {
        if (impact.type === 'positive') bookData.positive++;
        else if (impact.type === 'negative') bookData.negative++;
        else bookData.neutral++;
      });
    }
  });

  // Create chart data with exact counts and title breakdowns
  const chartData = BOOK_DEFINITIONS.map(book => {
    const bookData = bookCounts[book.id] || { total: 0, positive: 0, negative: 0, neutral: 0, titles: {} };
    const titleData = Object.entries(bookData.titles).map(([title, count]) => ({
      title,
      count
    }));
    
    return {
      id: book.id,
      name: book.name,
      count: bookData.total,
      positive: bookData.positive,
      negative: bookData.negative,
      neutral: bookData.neutral,
      color: book.color,
      titles: titleData,
      description: book.description
    };
  }).sort((a, b) => b.count - a.count);

  return chartData;
};
