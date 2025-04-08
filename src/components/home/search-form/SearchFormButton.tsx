
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileBarChart } from 'lucide-react';
import { useFormDialogContext } from '../FormDialogContext';

const SearchFormButton: React.FC = () => {
  const { openFormDialog } = useFormDialogContext();

  const handleClick = () => {
    console.log("Botão de gerar relatório clicado");
    openFormDialog();
  };

  return (
    <Button 
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-lg text-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
      size="lg"
    >
      <FileBarChart className="h-5 w-5" />
      Gerar Relatório Personalizado
    </Button>
  );
};

export default SearchFormButton;
