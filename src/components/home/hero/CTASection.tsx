
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';

const CTASection = () => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <div className="mt-20 bg-[#FF4719] text-white py-12 px-8 rounded-lg text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        O maior risco não está na mudança de alíquotas e modelo de tributação,<br />
        mas na gestão incorreta da informação.
      </h2>
      <p className="text-xl mb-8">
        Com o Qive, você tem uma fonte de dados para você se preparar.
      </p>
      <button 
        className="bg-white text-[#FF4719] hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-md"
        onClick={openFormDialog}
      >
        Falar com um especialista
      </button>
    </div>
  );
};

export default CTASection;
