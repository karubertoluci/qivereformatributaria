
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useFormDialogContext } from '../FormDialogContext';

interface SearchFormButtonProps {
  className?: string;
}

const SearchFormButton: React.FC<SearchFormButtonProps> = ({ className }) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <Button 
      className={`bg-orange-500 hover:bg-orange-600 transition-colors text-lg py-8 px-10 mb-4 shadow-md ${className || ''}`}
      size="lg"
      onClick={openFormDialog}
    >
      <FileText className="mr-2 h-6 w-6" />
      Gerar relatório personalizado para minha empresa
    </Button>
  );
};

export default SearchFormButton;
