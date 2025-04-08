
export type Topic = {
  id: string;
  name: string;
  description: string;
  articleCount?: number;
  importance?: number;
};

export type CommentType = {
  id: string;
  text: string;
  timestamp: string;
  articleId: string;
};

export type HighlightType = {
  id: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  articleId: string;
};

export type ViewMode = 'list' | 'table' | 'chart';
export type FilterType = 'all' | 'positive' | 'negative' | 'neutral';
