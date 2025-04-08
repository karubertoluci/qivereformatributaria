
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart4, FileText, Highlighter } from 'lucide-react';

interface ResultsTabLayoutProps {
  children: React.ReactNode;
  highlights: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResultsTabLayout: React.FC<ResultsTabLayoutProps> = ({
  children,
  highlights,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="bg-white">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="border-b border-gray-200 flex justify-center">
          <TabsList className="bg-white justify-center p-0 h-12 rounded-none border-b-0 max-w-md mx-auto">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white mx-0 px-6"
            >
              <BarChart4 className="h-4 w-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="articles" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white mx-0 px-6"
            >
              <FileText className="h-4 w-4" />
              <span>Artigos e Impactos</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="highlights" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white mx-0 px-6"
            >
              <Highlighter className="h-4 w-4" />
              <span>Meus Destaques</span>
              {highlights.length > 0 && (
                <Badge variant="outline" className="ml-1 h-5 px-1.5">
                  {highlights.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-white pt-4 pb-8">
          {children}
        </div>
      </Tabs>
    </div>
  );
};

export default ResultsTabLayout;
