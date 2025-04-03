
import { Article } from '@/data/articles';

export interface BookData {
  bookId: string;
  title: string;
  color: string;
  articles: number;
  positiveImpacts: number;
  negativeImpacts: number;
  neutralImpacts: number;
}

export interface BookDistributionChartProps {
  articles: Article[];
  onSelectBook?: (bookId: string | null) => void;
  selectedBook?: string | null;
}

export interface BookCardProps {
  book: BookData;
  isSelected: boolean;
  onSelect: (book: BookData) => void;
}

export interface ChartDisplayProps {
  data: BookData[];
  selectedBook: string | null;
  onBarClick: (entry: any) => void;
}

export const BOOK_META = [
  { id: 'I', title: 'CBS', color: '#3b82f6', description: 'Contribuição sobre Bens e Serviços' },
  { id: 'II', title: 'IBS', color: '#f59e0b', description: 'Imposto sobre Bens e Serviços' },
  { id: 'III', title: 'IS', color: '#8b5cf6', description: 'Imposto Seletivo' },
  { id: 'IV', title: 'Outras disposições', color: '#10b981', description: 'Disposições finais e transitórias' }
];
