
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ResultsErrorProps {
  error: string;
  onRetry?: () => void;
}

const ResultsError: React.FC<ResultsErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="container mx-auto p-8">
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar dados</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
      <div className="flex justify-center mt-6">
        <Button onClick={onRetry || (() => window.location.reload())} variant="outline">
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};

export default ResultsError;
