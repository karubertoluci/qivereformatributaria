
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormDialogContext } from './home/FormDialogContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const navigate = useNavigate();
  const { openFormDialog } = useFormDialogContext();
  const isMobile = useIsMobile();
  
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
    <footer className="bg-black py-10 text-white">
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
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Qive Reforma Tributária - Todos os direitos reservados
            </p>
          </div>
          
          {/* Coluna 2: Links Úteis */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/handoff" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
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
                <a href="#" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF4719] text-sm transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Fale com Especialista */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <div className="mb-4">
              <button 
                onClick={openFormDialog}
                className="bg-[#FF4719] hover:bg-[#e5340a] text-white px-6 py-3 rounded text-sm inline-block transition-colors"
              >
                Fale com Especialista
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.</p>
        </div>
        
        <div className="mt-4 text-center">
          <button onClick={handleBackToHome} className="text-[#FF4719] hover:text-[#e5340a] transition-colors text-sm font-medium">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
