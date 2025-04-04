
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';

const CTASection = () => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <div className="mt-20 bg-[#FF4719] text-white py-12 px-8 rounded-lg">
      <div className="md:flex md:items-start md:justify-between">
        <div className="text-center md:text-left md:max-w-2xl mb-8 md:mb-0 md:mr-8">
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-relaxed">
            O maior risco não está na mudança<br className="hidden md:block" />
            de alíquotas e modelo de tributação,<br className="hidden md:block" />
            mas na gestão incorreta<br className="hidden md:block" />
            da informação.
          </h2>
          <p className="text-xl mt-6">
            Com o Qive, você tem uma fonte de dados para você se preparar.
          </p>
        </div>
        <div className="flex justify-center md:justify-end md:self-center">
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
