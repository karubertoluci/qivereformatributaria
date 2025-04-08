
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, FileText, Highlighter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResultsTabLayoutProps {
  children: React.ReactNode;
  highlights: any[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ResultsTabLayout: React.FC<ResultsTabLayoutProps> = ({ 
  children, 
  highlights,
  activeTab = "overview",
  onTabChange
}) => {
  const isMobile = useIsMobile();

  return (
    <Tabs 
      defaultValue={activeTab} 
      className="w-full"
      onValueChange={onTabChange}
    >
      <TabsList className="mb-6 py-0 my-0 flex justify-center w-full overflow-x-auto">
        <TabsTrigger value="overview" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
          <FileText className="h-3 w-3 md:h-4 md:w-4" /> 
          {isMobile ? "Visão Geral" : "Visão Geral"}
        </TabsTrigger>
        <TabsTrigger value="articles" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
          <Book className="h-3 w-3 md:h-4 md:w-4" /> 
          {isMobile ? "Artigos" : "Artigos e Impactos"}
        </TabsTrigger>
        <TabsTrigger value="highlights" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
          <Highlighter className="h-3 w-3 md:h-4 md:w-4" /> 
          {isMobile ? `Destaques (${highlights.length})` : `Meus Destaques (${highlights.length})`}
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default ResultsTabLayout;
