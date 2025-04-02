
import React from 'react';
import { Info } from 'lucide-react';

interface ArticleOriginalTextProps {
  text: string;
}

const ArticleOriginalText: React.FC<ArticleOriginalTextProps> = ({ text }) => {
  return (
    <div>
      <h4 className="text-sm font-bold flex items-center mb-2">
        <Info className="h-4 w-4 mr-1 text-blue-500" />
        Texto Original
      </h4>
      <div className="text-xs p-3 bg-muted rounded-md">
        {text}
      </div>
    </div>
  );
};

export default ArticleOriginalText;
