
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ApiStatusIndicatorProps {
  isError: boolean;
  errorMessage?: string;
}

const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ 
  isError,
  errorMessage = 'A Brasil API pode estar instável no momento. Tente novamente mais tarde ou use outro CNPJ para testar.'
}) => {
  if (!isError) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-100 rounded-full p-1">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm font-medium">Atenção: Brasil API instável</p>
          <p className="text-xs text-muted-foreground">{errorMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ApiStatusIndicator;
