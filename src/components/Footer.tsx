
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Qive Reforma Tributária - Todos os direitos reservados</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Suporte</a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
