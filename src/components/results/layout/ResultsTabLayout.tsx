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

// Se necessário, adicione classes bg-white para garantir o fundo branco consistente
const ResultsTabLayout: React.FC<ResultsTabLayoutProps> = ({
  children,
  highlights,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="bg-white">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none justify-start h-12 p-0">
          <TabsTrigger 
            value="overview" 
            className="flex-1 max-w-[200px] data-[state=active]:bg-white rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-full"
          >
            <span className="flex items-center justify-center gap-2">
              <BarChart4 className="h-4 w-4" />
              Visão Geral
            </span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="articles" 
            className="flex-1 max-w-[200px] data-[state=active]:bg-white rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-full"
          >
            <span className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              Artigos e Impactos
            </span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="highlights" 
            className="flex-1 max-w-[200px] data-[state=active]:bg-white rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-full"
          >
            <div className="flex items-center justify-center gap-2">
              <Highlighter className="h-4 w-4" />
              Meus Destaques
              {highlights.length > 0 && (
                <Badge variant="outline" className="ml-1 h-5 px-1.5">
                  {highlights.length}
                </Badge>
              )}
            </div>
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white pt-4 pb-8">
          {children}
        </div>
      </Tabs>
    </div>
  );
};

export default ResultsTabLayout;
