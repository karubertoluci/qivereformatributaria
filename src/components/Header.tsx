
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
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
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-orange-500 transition-colors relative py-2">
            relatório por setor
            {location.pathname === '/' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            )}
          </Link>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2">
            webinars
          </a>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2">
            planilha
          </a>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors py-2">
            calculadora
          </a>
        </nav>
        
        {/* CTA Button */}
        <Button 
          variant="default"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
          onClick={openFormDialog}
        >
          Como a Qive pode te ajudar com a Reforma Tributária
        </Button>
      </div>
    </header>
  );
};

export default Header;
