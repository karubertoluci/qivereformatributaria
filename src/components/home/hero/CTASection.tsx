
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';

const CTASection = () => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <div className="mt-20 bg-[#FF4719] text-white py-12 px-8 rounded-lg">
      <div className="md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left md:max-w-3xl mb-8 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            O maior risco não está na mudança de alíquotas e modelo de tributação,<br className="hidden md:block" />
            mas na gestão incorreta da informação.
          </h2>
          <p className="text-xl">
            Com o Qive, você tem uma fonte de dados para você se preparar.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <button 
            className="bg-white text-[#FF4719] hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-md"
            onClick={openFormDialog}
          >
            Falar com um especialista
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
