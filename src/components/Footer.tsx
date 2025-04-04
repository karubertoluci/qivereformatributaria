
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

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
    <footer className="border-t border-gray-200 mt-12 bg-zinc-950 py-[36px] w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Copyright */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Qive</h3>
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
          
          {/* Coluna 4: Contato */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> contato@qive.com.br
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> (11) 9999-9999
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Instagram className="h-5 w-5" />
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
