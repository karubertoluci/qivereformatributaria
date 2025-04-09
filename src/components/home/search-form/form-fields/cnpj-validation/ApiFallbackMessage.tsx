
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ApiFallbackMessageProps {
  onContinue: () => void;
  onRetry: () => void;
}

const ApiFallbackMessage: React.FC<ApiFallbackMessageProps> = ({ onContinue, onRetry }) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Serviço Brasil API indisponível</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          Não foi possível conectar ao serviço de consulta de CNPJ. Isso pode ocorrer por:
        </p>
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>Instabilidade momentânea do serviço Brasil API</li>
          <li>Limite de requisições atingido</li>
          <li>Problemas de conexão com a internet</li>
        </ul>
        <p className="mb-4">
          Você pode tentar novamente mais tarde ou continuar preenchendo os dados manualmente.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
          <Button size="sm" onClick={onContinue}>
            Continuar manualmente
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiFallbackMessage;
