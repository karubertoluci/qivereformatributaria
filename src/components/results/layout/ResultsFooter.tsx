
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useFormDialogContext } from '@/components/home/FormDialogContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResultsFooterProps {
  logoSrc?: string;
  disclaimerText?: string;
}

const ResultsFooter: React.FC<ResultsFooterProps> = ({ 
  logoSrc = "/lovable-uploads/a6337190-c94c-4bbd-a525-b41d6b7a4f4c.png",
  disclaimerText = "Este relatório não substitui a orientação profissional. Consulte um advogado para questões legais específicas."
}) => {
  const navigate = useNavigate();
  const { openFormDialog } = useFormDialogContext();
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
  
  return (
    <div className="pt-8 border-t border-gray-600 bg-black text-white">
      <div className="flex flex-col items-center">
        <img 
          src={logoSrc} 
          alt="Qive Logo" 
          className="h-10 w-auto mb-4" 
        />
        
        <Separator className="bg-gray-600 w-1/2 my-6" />
        
        <p className="text-gray-400 text-center">Relatório gerado pela Qive Reforma Tributária 2025</p>
        <p className="mt-2 text-gray-400 text-center">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4 px-4">
          <button 
            onClick={handleBackToHome}
            className="text-[#FF4719] hover:text-[#e5340a] transition-colors text-sm font-medium order-2 sm:order-1"
          >
            Voltar para a página inicial
          </button>
          
          <button 
            onClick={openFormDialog}
            className="bg-[#FF4719] hover:bg-[#e5340a] text-white px-4 py-2 rounded text-sm transition-colors order-1 sm:order-2"
          >
            Fale com Especialista
          </button>
        </div>
        
        <p className="mt-6 text-xs text-gray-400 text-center max-w-md px-4">
          {disclaimerText}
        </p>
      </div>
    </div>
  );
};

export default ResultsFooter;
