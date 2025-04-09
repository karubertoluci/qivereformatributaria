
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartHeaderProps {
  title: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  tooltipContent?: string;
  bookId?: string | null;
  useGradient?: boolean;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  title, 
  description, 
  icon, 
  tooltipContent,
  bookId,
  useGradient = false
}) => {
  return (
    <div className={`flex flex-row items-start justify-between ${useGradient ? 'bg-white p-4 rounded-t-lg' : ''}`}>
      <div>
        <CardTitle className="text-xl flex items-center gap-2">
          {icon && (
            <div className={icon ? "bg-rose-100 p-1.5 rounded-md" : ""}>
              {icon}
            </div>
          )}
          {title}
          {bookId && <span className="text-sm font-normal ml-1">(Livro {bookId})</span>}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
      </div>
      
      {tooltipContent && (
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{tooltipContent}</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ChartHeader;
