
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clearArticleCache } from '@/utils/cacheUtils';

interface ResultsErrorProps {
  error: string;
  onRetry?: () => void;
}

const ResultsError: React.FC<ResultsErrorProps> = ({ error, onRetry }) => {
  // Verificar se o erro está relacionado ao localStorage
  const isStorageError = error.includes('Storage') || error.includes('quota') || error.includes('setItem');
  
  const handleClearCacheAndRetry = () => {
    // Se for um erro de armazenamento, limpar todo o cache antes de tentar novamente
    if (isStorageError) {
      clearArticleCache();
    }
    
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };
  
  return (
    <div className="container mx-auto p-8">
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar dados</AlertTitle>
        <AlertDescription>
          {isStorageError ? (
            <>
              Foi detectado um problema de armazenamento no navegador. 
              Isso pode acontecer quando há muitos dados armazenados localmente.
              <br /><br />
              Recomendamos limpar o cache e tentar novamente.
            </>
          ) : (
            error
          )}
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={handleClearCacheAndRetry} 
          variant="default"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {isStorageError ? "Limpar cache e tentar novamente" : "Tentar novamente"}
        </Button>
        
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsError;
