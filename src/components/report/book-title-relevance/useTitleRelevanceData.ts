
import { Article } from '@/data/articles';
import { TitleData } from './types';

interface UseTitleRelevanceDataProps {
  articles: Article[];
  bookId: string;
  segmentId: string;
}

export const useTitleRelevanceData = ({ articles, bookId, segmentId }: UseTitleRelevanceDataProps) => {
  // Filter articles by the specified book
  const filterArticlesByBook = () => {
    return articles.filter(article => {
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                        parseInt(article.id.replace(/\D/g, ''));
      
      if (bookId === 'I') return articleNum <= 180;
      if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
      if (bookId === 'III') return articleNum > 300 && articleNum <= 450;
      return articleNum > 450;
    });
  };
  
  const bookArticles = filterArticlesByBook();
  
  // Group articles by title and count by relevance level
  const getTitleData = () => {
    // This would normally come from article metadata, using mock data for now
    const titleMap = new Map<string, TitleData>();
    
    // Define mock titles for each book
    const mockTitles: Record<string, string[]> = {
      'I': ['NORMAS GERAIS', 'REG. REGIMES ESPECIAIS', 'REG. CASHBACK', 'REG. DIF. IBS', 'REG. ESP. IBS', 'REG. DIF. CBS', 'ADM. IBS', 'TRANS. IBS'],
      'II': ['DISP. PRELIMINARES', 'NORMAS GERAIS IMPOSTO SELETIVO', 'IMPOSTO SELETIVO SOBRE IMPORTAÇÕES', 'DISP. FINAIS'],
      'III': ['ZFM, ÁREAS LIVRE COMÉRCIO', 'GOV', 'DISP. TRANSITÓRIAS', 'DISP. FINAIS'],
      'IV': ['DISP. TRANSITÓRIAS', 'DISP. REGULAMENTARES', 'VIGÊNCIA', 'REVOGAÇÕES']
    };
    
    // Initialize title data
    mockTitles[bookId].forEach((title, index) => {
      titleMap.set(title, {
        id: `${bookId}.${index + 1}`,
        name: title,
        irrelevante: 0,
        poucoRelevante: 0,
        moderadamenteRelevante: 0,
        muitoRelevante: 0
      });
    });
    
    // Count articles by relevance level for each title
    bookArticles.forEach(article => {
      // For demonstration, distribute articles among titles
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      const titleIndex = articleNum % mockTitles[bookId].length;
      const title = mockTitles[bookId][titleIndex];
      
      // Calculate relevance score
      const segmentImpacts = article.impacts.filter(impact => impact.segments.includes(segmentId));
      if (segmentImpacts.length === 0) return;
      
      let score = 0;
      score += segmentImpacts.length * 10;
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') score += 15;
        if (impact.type === 'negative') score += 20;
      });
      score = Math.min(score, 100);
      
      // Update count based on relevance level
      const titleData = titleMap.get(title);
      if (titleData) {
        if (score >= 75) titleData.muitoRelevante += 1;
        else if (score >= 50) titleData.moderadamenteRelevante += 1;
        else if (score >= 25) titleData.poucoRelevante += 1;
        else titleData.irrelevante += 1;
      }
    });
    
    return Array.from(titleMap.values());
  };
  
  return { data: getTitleData() };
};
