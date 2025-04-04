
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';
import { FileText } from 'lucide-react';

const ReportGenerator = () => {
  const {
    openFormDialog
  } = useFormDialogContext();
  
  return (
    <div className="bg-orange-50 rounded-lg p-8 border border-orange-100 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl mb-3 font-normal flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-[#FF4719]" />
          Gere um relatório personalizado da Reforma Tributária para sua empresa
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <img 
          src="/lovable-uploads/1220e0fd-25e2-40ac-bb6b-2925befaaa1b.png" 
          alt="Relatório da Reforma Tributária" 
          className="w-full h-auto" 
        />
      </div>
      
      <div className="text-center">
        <button className="bg-[#FF4719] hover:bg-[#E53E15] text-white text-lg font-medium py-3 px-6 rounded-md shadow-md mb-3" onClick={openFormDialog}>
          Gerar relatório personalizado pra minha empresa
        </button>
        <p className="text-sm text-gray-500">Relatório gratuito e sem compromisso</p>
      </div>
    </div>
  );
};

export default ReportGenerator;
