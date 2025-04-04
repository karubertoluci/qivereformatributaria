
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileBarChart, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <div className="pt-4">
      <Button 
        type="submit" 
        className="bg-[#FF4719] hover:bg-[#E53E15] transition-colors w-full py-6"
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </span>
        ) : (
          <span className="flex items-center">
            <FileBarChart className="mr-2 h-5 w-5" />
            Gerar meu relatório personalizado
          </span>
        )}
      </Button>
      <p className="text-xs text-center text-gray-500 mt-2">
        Ao clicar em "Gerar meu relatório personalizado", você concorda com nossa política de privacidade 
        e permite que entremos em contato para apresentar soluções.
      </p>
    </div>
  );
};

export default SubmitButton;
