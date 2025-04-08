
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileBarChart } from 'lucide-react';
import { useFormDialogContext } from '../FormDialogContext';

interface SearchFormButtonProps {
  className?: string;
  text?: string;
}

const SearchFormButton: React.FC<SearchFormButtonProps> = ({ 
  className,
  text = "Gerar relatório personalizado para minha empresa" 
}) => {
  const { openFormDialog } = useFormDialogContext();
  
  const handleOpenDialog = () => {
    console.log("Botão SearchFormButton clicado");
    openFormDialog();
  };
  
  return (
    <Button 
      className={`bg-[#FF4719] hover:bg-[#E53E15] transition-colors text-lg py-6 px-8 rounded-md font-medium shadow-md ${className || ''}`}
      onClick={handleOpenDialog}
    >
      <FileBarChart className="mr-2 h-6 w-6" />
      {text}
    </Button>
  );
};

export default SearchFormButton;
