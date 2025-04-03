
export type Topic = {
  id: string;
  name: string;
  title?: string;
  description: string;
  articleCount?: number;
  importance?: number;
  order?: number;
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
