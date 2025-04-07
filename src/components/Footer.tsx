
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
  
  return (
    <footer className="border-t border-gray-800 mt-12 bg-black py-[36px] w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Copyright */}
          <div className="flex flex-col">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/2ac8d537-e09f-4306-8031-760de63c5583.png" 
                alt="Qive Logo" 
                className="h-12" 
              />
            </div>
            <p className="text-sm text-slate-50">
              &copy; {new Date().getFullYear()} Qive Reforma Tributária - Todos os direitos reservados
            </p>
          </div>
          
          {/* Coluna 2: Links Úteis */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-primary text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-primary text-sm">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/handoff" className="text-gray-300 hover:text-primary text-sm">
                  Handoff
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Políticas */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Fale com Especialista */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <div className="mb-4">
              <a 
                href="#" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm inline-block transition-colors"
              >
                Fale com Especialista
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          <p className="text-slate-50">Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.</p>
        </div>
        
        <div className="mt-4 text-center">
          <button onClick={handleBackToHome} className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
