
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ValidationStatusProps {
  isValidating: boolean;
  isValid: boolean | null;
}

const ValidationStatus: React.FC<ValidationStatusProps> = ({ isValidating, isValid }) => {
  if (isValidating) {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }
  
  if (isValid === true) {
    return (
      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
    );
  }
  
  if (isValid === false) {
    return (
      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
    );
  }
  
  return null;
};

export default ValidationStatus;
