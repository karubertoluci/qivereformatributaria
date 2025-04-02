
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { FileText, Share2, Download } from 'lucide-react';
import { useFormDialogContext } from './home/FormDialogContext';

const Header = () => {
  const location = useLocation();
  const {
    openFormDialog
  } = useFormDialogContext();
  const isResultPage = location.pathname.includes('/results');
  
  return (
    <header className="flex justify-between items-center py-4 px-4 border-b font-lexend">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
          alt="Logo" 
          className="h-8" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        {!isResultPage ? (
          <Button 
            size="sm"
            className="flex items-center gap-1 h-8 px-3"
            onClick={openFormDialog}
          >
            <FileText className="h-3 w-3" />
            <span className="text-xs">Analisar Empresa</span>
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 h-8 px-2 sm:px-3"
            >
              <Share2 className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Compartilhar</span>
            </Button>
            
            <Button 
              size="sm"
              className="flex items-center gap-1 h-8 px-2 sm:px-3"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Baixar PDF</span>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
