
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormDialogContext } from '../home/FormDialogContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Info, AlertCircle, Shield, Building2 } from 'lucide-react';

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
          
          {/* Coluna 3: IA e Análises */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Inteligência Artificial</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-[#FF4719] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Análises baseadas em IA com dados atualizados da Reforma Tributária 2025
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-[#FF4719] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Privacidade e confidencialidade dos dados da sua empresa garantidos
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-[#FF4719] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Análise personalizada para diversos segmentos de negócios
                </p>
              </div>
            </div>
          </div>
          
          {/* Coluna 4: Fale com Especialista */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <div className="mb-4">
              <button 
                onClick={openFormDialog}
                className="bg-[#FF4719] hover:bg-[#e5340a] text-white px-6 py-3 rounded text-sm inline-block transition-colors w-full sm:w-auto"
              >
                Fale com Especialista
              </button>
            </div>
            <div className="flex items-start gap-2 mt-4">
              <AlertCircle className="h-4 w-4 text-[#FF4719] mt-0.5 flex-shrink-0" />
              <p className="text-gray-400 text-xs">
                Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={handleBackToHome} className="text-[#FF4719] hover:text-[#e5340a] transition-colors text-sm font-medium">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
