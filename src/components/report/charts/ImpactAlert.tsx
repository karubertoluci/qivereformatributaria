
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImpactAlertProps {
  message: string;
}

const ImpactAlert: React.FC<ImpactAlertProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default ImpactAlert;
