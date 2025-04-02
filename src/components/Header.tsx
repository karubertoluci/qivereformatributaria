
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useFormDialogContext } from './home/FormDialogContext';

const Header = () => {
  const location = useLocation();
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <a href="/">
            <img 
              src="/lovable-uploads/3a0e3d3c-ea95-4482-8c76-047d5459213e.png" 
              alt="Qive Reforma Tributária" 
              className="h-12 mr-2 cursor-pointer"
            />
          </a>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button 
            variant="outline" 
            className="bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Conheça a Qive
          </Button>
          
          <Button 
            variant="default" 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={openFormDialog}
          >
            <FileText size={16} className="mr-2" />
            Gere um relatório personalizado
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
