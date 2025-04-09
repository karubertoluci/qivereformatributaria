
import { Article } from "@/data/articles";

export type FilterType = 'all' | 'positive' | 'negative' | 'neutral';
export type ViewMode = 'chart' | 'table';
export type HighlightColor = 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

export interface HighlightType {
  id: string;
  articleId: string;
  text: string;
  color: HighlightColor;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  count: number;
}

export interface ArticleStat {
  articleId: string;
  title: string;
  relevance: number;
  impact: number;
  favorability: 'positive' | 'negative' | 'neutral';
}

export interface ImpactData {
  name: string;
  favorable: number;
  unfavorable: number;
  neutral: number;
}

export interface BookData {
  id: string;
  name: string;
  articles: Article[];
  count: number;
  color: string;
}
