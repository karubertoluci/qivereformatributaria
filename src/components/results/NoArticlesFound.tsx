
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { BusinessSegment } from '@/data/segments';

interface NoArticlesFoundProps {
  segment: BusinessSegment;
  onBackToSegments?: () => void;
}

const NoArticlesFound: React.FC<NoArticlesFoundProps> = ({ 
  segment, 
  onBackToSegments 
}) => {
  return (
    <div className="container mx-auto p-8">
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Nenhum artigo encontrado</AlertTitle>
        <AlertDescription>
          Não foram encontrados artigos relacionados ao segmento: {segment.name}
        </AlertDescription>
      </Alert>
      <div className="flex justify-center mt-6">
        {onBackToSegments && (
          <Button onClick={onBackToSegments} variant="outline">
            Voltar para seleção de segmentos
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoArticlesFound;
