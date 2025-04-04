
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useFormDialogContext } from './home/FormDialogContext';

const Header = () => {
  const location = useLocation();
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <header className="bg-white border-b font-lexend">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
              alt="Qive Reforma Tributária" 
              className="h-10"
            />
          </Link>
          
          {/* Mobile menu button would go here */}
        </div>
        
        {/* Navigation Links and CTA Button in a row for desktop */}
        <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0">
          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0 md:mr-8">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-orange-500 transition-colors relative py-2 font-medium"
            >
              RELATÓRIO POR SETOR
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></span>
              )}
            </Link>
            <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2 font-medium">
              WEBINARS
            </a>
            <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2 font-medium">
              PLANILHA
            </a>
            <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2 font-medium">
              CALCULADORA
            </a>
          </nav>
          
          {/* CTA Button */}
          <Button 
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
            onClick={openFormDialog}
          >
            FALE COM A QIVE
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
