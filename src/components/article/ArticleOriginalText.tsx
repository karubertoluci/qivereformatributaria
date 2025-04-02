
import React from 'react';
import { FileText } from 'lucide-react';

interface ArticleOriginalTextProps {
  text: string;
}

const ArticleOriginalText: React.FC<ArticleOriginalTextProps> = ({ text }) => {
  return (
    <div>
      <h4 className="text-sm font-bold flex items-center mb-2">
        <FileText className="h-4 w-4 mr-1 text-blue-500" />
        Texto Original da Lei
      </h4>
      <div className="text-xs p-3 bg-muted rounded-md border border-muted">
        {text}
      </div>
    </div>
  );
};

export default ArticleOriginalText;
