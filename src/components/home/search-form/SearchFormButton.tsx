
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileBarChart } from 'lucide-react';
import { useFormDialogContext } from '../FormDialogContext';

interface SearchFormButtonProps {
  className?: string;
}

const SearchFormButton: React.FC<SearchFormButtonProps> = ({ className }) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <Button 
      className={`bg-orange-500 hover:bg-orange-600 transition-colors text-lg py-6 px-8 rounded-md font-medium shadow-md ${className || ''}`}
      onClick={openFormDialog}
    >
      <FileBarChart className="mr-2 h-6 w-6" />
      Gerar relatório personalizado para minha empresa
    </Button>
  );
};

export default SearchFormButton;
