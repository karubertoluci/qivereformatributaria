
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useFormDialogContext } from '../home/FormDialogContext';

const Header = () => {
  const location = useLocation();
  const { openFormDialog } = useFormDialogContext();
  
  // Se estiver na rota de resultados, não mostrar o header comum
  const isResultsPage = location.pathname.includes('/results/');
  
  if (isResultsPage) {
    return null; // Não renderiza o header comum nas páginas de resultado
  }
  
  return (
    <header className="bg-white border-b font-lexend">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" 
            alt="Qive Reforma Tributária" 
            className="h-12"
          />
        </Link>
        
        {/* Navigation Links in center - Desktop only */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase"
          >
            relatório por setor
            {location.pathname === '/' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            )}
          </Link>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase">
            webinars
          </a>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase">
            planilha
          </a>
          <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase">
            calculadora
          </a>
        </nav>
          
        {/* CTA Button */}
        <Button 
          variant="default"
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white font-normal text-xs rounded px-4 py-1"
          onClick={openFormDialog}
        >
          Como a Qive pode te ajudar com a Reforma Tributária
        </Button>
      </div>
    </header>
  );
};

export default Header;
