
import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartHeaderProps {
  bookId: string;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ bookId }) => {
  return (
    <div className="flex flex-row items-start justify-between">
      <div>
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Distribuição de Artigos por Título do Livro {bookId}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Análise detalhada da relevância dos artigos em cada título do livro
        </CardDescription>
      </div>
      
      <TooltipProvider>
        <UITooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Este gráfico mostra a distribuição de artigos por níveis de relevância em cada título do Livro {bookId}.</p>
          </TooltipContent>
        </UITooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChartHeader;
