
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { toast } from 'sonner';

interface ViewModeCardProps {
  showAllArticles: boolean;
  setShowAllArticles: (show: boolean) => void;
}

const ViewModeCard: React.FC<ViewModeCardProps> = ({ showAllArticles, setShowAllArticles }) => {
  const toggleViewMode = () => {
    setShowAllArticles(!showAllArticles);
    toast.info(showAllArticles 
      ? "Mostrando apenas artigos relevantes para seu segmento" 
      : "Mostrando todos os 544 artigos da reforma tributária");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md">Modo de Visualização</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground max-w-md">
          <p>Você pode visualizar apenas artigos relevantes para seu segmento, ou todos os 544 artigos da reforma tributária.</p>
        </div>
        
        <Button 
          variant={showAllArticles ? "default" : "outline"} 
          className="flex items-center gap-2 ml-auto"
          onClick={toggleViewMode}
        >
          <ListFilter className="h-4 w-4" />
          {showAllArticles ? "Mostrar Relevantes" : "Mostrar Todos"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ViewModeCard;
