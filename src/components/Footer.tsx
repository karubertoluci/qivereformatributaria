
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ExternalLink, 
  Home, 
  FileText, 
  Shield, 
  HelpCircle 
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/29d71766-d4cd-4254-84b9-bdd2bd18333f.png" 
              alt="Qive Logo" 
              className="h-12 mb-4"
            />
            <p className="text-sm text-slate-400">
              &copy; {currentYear} Qive Reforma Tributária<br />
              Todos os direitos reservados
            </p>
          </div>
          
          {/* Coluna 2: Links Úteis */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Página Inicial
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Sobre a Reforma
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Políticas */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Suporte */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-500 text-sm flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contato
                </a>
              </li>
              <li>
                <button 
                  onClick={handleBackToHome} 
                  className="text-orange-500 hover:text-orange-400 text-sm flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Voltar para a página inicial
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-slate-400">
            Este aplicativo não substitui a orientação profissional. Consulte um advogado para questões legais específicas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
