
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';
import { FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ReportGenerator = () => {
  const { openFormDialog } = useFormDialogContext();
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-orange-50 rounded-lg p-4 md:p-8 border border-gray-200 max-w-6xl mx-auto">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl mb-3 font-normal flex flex-col md:flex-row items-center justify-center gap-2">
          <FileText className="h-5 w-5 md:h-6 md:w-6 text-[#FF4719] mb-1 md:mb-0" />
          <span>Gere um relatório personalizado da Reforma Tributária para sua empresa</span>
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6 border border-gray-200">
        <img 
          src="/lovable-uploads/cfd0cf2f-fe15-4249-9be3-525d800b9ee5.png" 
          alt="Relatório da Reforma Tributária" 
          className="w-full h-auto" 
        />
      </div>
      
      <div className="text-center">
        <button 
          className="bg-[#FF4719] hover:bg-[#E53E15] text-white text-base md:text-lg font-medium py-2 md:py-3 px-4 md:px-6 rounded-md shadow-md mb-2 md:mb-3 w-full md:w-auto" 
          onClick={openFormDialog}
        >
          Gerar relatório personalizado
          {!isMobile && " pra minha empresa"}
        </button>
        <p className="text-xs md:text-sm text-gray-500">Relatório gratuito e sem compromisso</p>
      </div>
    </div>
  );
};

export default ReportGenerator;
