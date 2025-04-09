import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useFormDialogContext } from '@/components/home/FormDialogContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Info, AlertCircle, Download, Share2, Clock, Shield } from 'lucide-react';
interface ResultsFooterProps {
  logoSrc?: string;
}
const ResultsFooter: React.FC<ResultsFooterProps> = ({
  logoSrc = "/lovable-uploads/a6337190-c94c-4bbd-a525-b41d6b7a4f4c.png"
}) => {
  const navigate = useNavigate();
  const {
    openFormDialog
  } = useFormDialogContext();
  const isMobile = useIsMobile();
  const handleBackToHome = () => {
    // Clear stored data
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('cnae');
    localStorage.removeItem('formData');
    // Navigate to home page
    navigate('/');
    // Reload page to ensure everything is reset
    window.location.reload();
  };
  return <footer className="bg-black text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <img src={logoSrc} alt="Qive Logo" className="h-12 w-auto mb-4" />
          
          <Separator className="bg-gray-700 w-full my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
            {/* Disclaimer section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-[#FF4719]" />
                <h3 className="text-base font-semibold">Aviso importante</h3>
              </div>
              <p className="text-sm text-gray-400">
                Este relatório é baseado na análise da legislação proposta e não substitui a orientação profissional. 
                Consulte um especialista para questões legais específicas relacionadas ao seu negócio.
              </p>
            </div>
            
            {/* IA usage section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-[#FF4719]" />
                <h3 className="text-base font-semibold">Inteligência Artificial</h3>
              </div>
              <p className="text-sm text-gray-400">
                Este relatório foi gerado com o auxílio de Inteligência Artificial, analisando os impactos 
                da Reforma Tributária 2025 para o seu segmento específico. Os dados são atualizados regularmente para 
                refletir as mudanças legislativas.
              </p>
            </div>
            
            {/* Data accuracy section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-[#FF4719]" />
                <h3 className="text-base font-semibold">Precisão dos dados</h3>
              </div>
              <p className="text-sm text-gray-400">
                As informações apresentadas refletem o texto aprovado da PEC 45/2023 e projeções baseadas na 
                Reforma Tributária até {new Date().toLocaleDateString('pt-BR')}. Confira nossa plataforma 
                regularmente para obter as informações mais recentes.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button onClick={openFormDialog} className="bg-[#FF4719] hover:bg-[#e5340a] text-white px-6 py-3 rounded text-sm font-medium transition-colors">
              Fale com Especialista
            </button>
            
            
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>Atualizado em: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <Download className="h-4 w-4 mr-2 text-gray-500" />
              <span>Baixe o relatório para consulta offline</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <Share2 className="h-4 w-4 mr-2 text-gray-500" />
              <span>Compartilhe com sua equipe</span>
            </div>
          </div>
        </div>
        
        
      </div>
    </footer>;
};
export default ResultsFooter;