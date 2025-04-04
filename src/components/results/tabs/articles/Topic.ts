
export interface Topic {
  id: string;
  name: string;
  description?: string;
  articleCount?: number;
  importance?: number;
}

export default Topic;
