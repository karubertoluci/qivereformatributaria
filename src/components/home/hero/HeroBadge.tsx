
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';

const HeroBadge = () => {
  return (
    <div className="flex justify-center mb-6">
      <Badge variant="outline" className="py-2 px-4 flex items-center gap-2 text-sm border border-gray-200 shadow-sm bg-white/80">
        <Bot className="h-4 w-4" /> 
        Este conteúdo é gerado utilizando inteligência artificial
      </Badge>
    </div>
  );
};

export default HeroBadge;
