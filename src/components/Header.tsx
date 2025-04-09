
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useFormDialogContext } from './home/FormDialogContext';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const {
    openFormDialog
  } = useFormDialogContext();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return <header className="bg-white border-b font-lexend">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between bg-white">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" alt="Qive Reforma Tributária" className="h-8 md:h-12" />
        </Link>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Navigation Links in center - Desktop only */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase">
            relatório por setor
            {location.pathname === '/'}
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
          
        {/* CTA Button - Desktop */}
        <Button variant="default" size="sm" className="hidden md:flex bg-orange-500 hover:bg-orange-600 text-white font-normal text-xs rounded px-4 py-1" onClick={openFormDialog}>
          Como a Qive pode te ajudar com a Reforma Tributária
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase py-2" onClick={() => setMobileMenuOpen(false)}>
                relatório por setor
              </Link>
              <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase py-2" onClick={() => setMobileMenuOpen(false)}>
                webinars
              </a>
              <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase py-2" onClick={() => setMobileMenuOpen(false)}>
                planilha
              </a>
              <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors font-medium lowercase py-2" onClick={() => setMobileMenuOpen(false)}>
                calculadora
              </a>
              
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white font-normal text-sm rounded mt-2 w-full py-2" onClick={() => {
            openFormDialog();
            setMobileMenuOpen(false);
          }}>
                Falar com a Qive sobre a Reforma
              </Button>
            </nav>
          </div>
        </div>}
    </header>;
};

export default Header;
