
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const ResultsFooter: React.FC = () => {
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
    <div className="pt-8 border-t">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/a6337190-c94c-4bbd-a525-b41d6b7a4f4c.png" 
          alt="Qive Logo" 
          className="h-10 w-auto mb-4" 
        />
        
        <Separator className="bg-gray-200 w-1/2 my-6" />
        
        <p className="text-muted-foreground text-center">Relatório gerado pela Qive Reforma Tributária 2025</p>
        <p className="mt-2 text-muted-foreground text-center">© {new Date().getFullYear()} Qive. Todos os direitos reservados.</p>
        
        <div className="mt-6">
          <button 
            onClick={handleBackToHome}
            className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
          >
            Voltar para a página inicial
          </button>
        </div>
        
        <p className="mt-6 text-xs text-gray-500 text-center max-w-md">
          Este relatório não substitui a orientação profissional. Consulte um advogado para questões legais específicas.
        </p>
      </div>
    </div>
  );
};

export default ResultsFooter;
