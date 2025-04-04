import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  return <footer className="border-t border-gray-200 mt-12 bg-zinc-950 my-0 py-[36px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-950">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-50">&copy; {new Date().getFullYear()} Qive Reforma Tributária - Todos os direitos reservados</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm bg-zinc-950">Suporte</a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <p className="text-slate-50">Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.</p>
        </div>
        <div className="mt-4 text-center">
          <button onClick={handleBackToHome} className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </footer>;
};
export default Footer;