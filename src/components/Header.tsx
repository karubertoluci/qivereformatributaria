
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
    <header className="bg-white border-b font-lexend">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img 
          alt="Qive Reforma Tributária" 
          className="h-8" 
          src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
        />
        
        <Button 
          onClick={openFormDialog}
          size="sm"
          className="flex items-center gap-1 h-8 px-2 sm:px-3"
        >
          <FileText className="h-3 w-3" />
          <span className="hidden sm:inline text-xs">Nova análise</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
