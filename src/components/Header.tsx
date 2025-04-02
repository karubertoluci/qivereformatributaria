
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
    <header className="border-b py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <img 
            alt="Qive Reforma Tributária" 
            className="h-8" 
            src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
          />
          
          <div className="text-center mx-auto max-w-md sm:max-w-lg">
            <h1 className="text-lg font-bold truncate">Qive Reforma Tributária</h1>
            <p className="text-xs text-muted-foreground">Análise de impactos da reforma tributária</p>
          </div>
          
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
