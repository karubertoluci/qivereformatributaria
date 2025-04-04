import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';
const ReportGenerator = () => {
  const {
    openFormDialog
  } = useFormDialogContext();
  return <div className="bg-orange-50 rounded-lg p-8 border border-orange-100 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        
        <h2 className="text-2xl md:text-3xl mb-3 font-normal">
          Gere um relatório personalizado da<br />
          Reforma Tributária para sua empresa
        </h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <img src="/lovable-uploads/a1fa57b5-d751-45dc-ad02-a455994c6dbd.png" alt="Relatório da Reforma Tributária" className="w-full h-auto" />
      </div>
      
      <div className="text-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium py-3 px-6 rounded-md shadow-md mb-3" onClick={openFormDialog}>
          Gerar relatório personalizado pra minha empresa
        </button>
        <p className="text-sm text-gray-500">Relatório gratuito e sem compromisso</p>
      </div>
    </div>;
};
export default ReportGenerator;