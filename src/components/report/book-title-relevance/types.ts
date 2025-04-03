
import { Article } from '@/data/articles';

export interface BookTitleRelevanceChartProps {
  articles: Article[];
  bookId: string;
  segmentId: string;
  onSelectTitle?: (titleId: string) => void;
}

export interface TitleData {
  id: string;
  name: string;
  irrelevante: number;
  poucoRelevante: number;
  moderadamenteRelevante: number;
  muitoRelevante: number;
}

export interface RelevanceColorScheme {
  [key: string]: string;
  muitoRelevante: string;
  moderadamenteRelevante: string;
  poucoRelevante: string;
  irrelevante: string;
}

export interface TitleBarChartProps {
  data: TitleData[];
  colors: RelevanceColorScheme;
  onBarClick: (event: any) => void;
}

export interface RelevanceLegendProps {
  colors: RelevanceColorScheme;
}
