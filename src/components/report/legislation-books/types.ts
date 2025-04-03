
import { Article } from '@/data/articles';

export interface LegislationBooksProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  selectedBook?: string | null;
  onSelectBook?: (bookId: string | null) => void;
}

export interface Book {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface BookData {
  id: string;
  name: string;
  count: number;
  positive: number;
  negative: number;
  neutral: number;
  color: string;
  titles: {
    title: string;
    count: number;
  }[];
  description: string;
}

export interface LegislationChartProps {
  chartData: BookData[];
  selectedBook: string | null;
  handleBarClick: (data: any) => void;
}

export interface BookCardListProps {
  chartData: BookData[];
  selectedBook: string | null;
  onSelectBook: (bookId: string) => void;
}

export interface BookCardItemProps {
  book: BookData;
  isSelected: boolean;
  onSelect: () => void;
}
