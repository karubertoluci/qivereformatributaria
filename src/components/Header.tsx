
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Share2, Download, FileBarChart } from 'lucide-react';
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
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
            alt="Qive Reforma Tributária" 
            className="h-10"
          />
        </Link>
        
        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <a 
            href="https://qive.digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-orange-500 transition-colors hidden sm:block"
          >
            Conheça a Qive
          </a>
          
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={openFormDialog}
          >
            <FileBarChart className="mr-2 h-4 w-4" />
            Gerar relatório personalizado
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
