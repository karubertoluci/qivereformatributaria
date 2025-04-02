
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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img 
          alt="Qive Reforma Tributária" 
          className="h-8" 
          src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
        />
        
        {/* CTA Button */}
        <Button
          onClick={openFormDialog}
          size="sm"
          variant="default"
          className="ml-auto"
        >
          Nova análise
        </Button>
      </div>
    </header>
  );
};

export default Header;
