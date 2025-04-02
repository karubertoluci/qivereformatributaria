
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
    <header className="bg-white border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/3a0e3d3c-ea95-4482-8c76-047d5459213e.png" alt="Qive Reforma Tributária" className="h-10" />
          {!isResultPage && <h1 className="text-xl font-bold hidden md:block">Qive Reforma Tributária</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          {isResultPage ? (
            <>
              <Button variant="outline" className="flex items-center gap-1" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
              
              <Button className="flex items-center gap-1" size="sm">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Baixar PDF</span>
              </Button>
            </>
          ) : (
            <Button onClick={openFormDialog}>
              Análise Personalizada
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
