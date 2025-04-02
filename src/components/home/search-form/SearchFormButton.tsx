
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { FileText } from 'lucide-react';

const SearchFormButton: React.FC = () => {
  return (
    <DialogTrigger asChild>
      <Button 
        className="bg-orange-500 hover:bg-orange-600 transition-colors text-lg py-8 px-10 mb-4 shadow-md"
        size="lg"
      >
        <FileText className="mr-2 h-6 w-6" />
        Gerar relatório personalizado para minha empresa
      </Button>
    </DialogTrigger>
  );
};

export default SearchFormButton;
