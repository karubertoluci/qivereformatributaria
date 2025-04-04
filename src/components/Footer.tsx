
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    // Limpar dados armazenados
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('cnae');
    localStorage.removeItem('formData');
    // Navegar para a página inicial
    navigate('/');
    // Recarregar a página para garantir que tudo seja resetado
    window.location.reload();
  };
  
  return (
    <footer className="border-t border-gray-200 mt-12 bg-zinc-950 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/a6337190-c94c-4bbd-a525-b41d6b7a4f4c.png" 
              alt="Qive Logo" 
              className="h-12 w-auto" 
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            <div>
              <h4 className="text-white font-medium mb-3">Sobre a Qive</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Quem somos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Fale conosco</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Ferramentas</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Relatório</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Webinars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Calculadora</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Perguntas frequentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Suporte</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-800 my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Qive Reforma Tributária - Todos os direitos reservados</p>
          <button 
            onClick={handleBackToHome} 
            className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
          >
            Voltar para a página inicial
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
