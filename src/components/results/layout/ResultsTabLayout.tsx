
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { File, List, Star } from 'lucide-react';

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
    <div className="bg-gray-50">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="border-b border-gray-200 flex justify-center bg-gray-50">
          <TabsList className="bg-transparent justify-center p-0 h-16 rounded-none border-b-0 max-w-xl mx-auto gap-2">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-gray-900 text-gray-500 mx-0 px-6"
            >
              <File className="h-4 w-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="articles" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-gray-900 text-gray-500 mx-0 px-6"
            >
              <List className="h-4 w-4" />
              <span>Artigos e Impactos</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="highlights" 
              className="flex items-center gap-2 rounded-none h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-gray-900 text-gray-500 mx-0 px-6"
            >
              <Star className="h-4 w-4" />
              <span>Meus Destaques</span>
              {highlights.length > 0 && (
                <Badge 
                  variant="outline" 
                  className="ml-1 h-5 px-1.5 bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700"
                >
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
