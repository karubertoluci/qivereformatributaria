
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
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
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <img 
            alt="Qive Reforma Tributária" 
            className="h-10" 
            src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
