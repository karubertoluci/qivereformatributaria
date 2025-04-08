
import React from 'react';
import { useFormDialogContext } from '../FormDialogContext';
import { useIsMobile } from '@/hooks/use-mobile';

const CTASection = () => {
  const { openFormDialog } = useFormDialogContext();
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-12 md:mt-20 bg-[#FF4719] text-white py-8 md:py-12 px-4 md:px-8 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left md:max-w-2xl mb-6 md:mb-0 md:mr-8">
          <h2 className="text-xl md:text-3xl font-medium mb-4 leading-relaxed">
            O maior risco não está na mudança
            {isMobile ? ' ' : <br className="hidden md:block" />}
            de alíquotas e modelo de tributação,
            {isMobile ? ' ' : <br className="hidden md:block" />}
            mas na gestão incorreta
            {isMobile ? ' ' : <br className="hidden md:block" />}
            da informação.
          </h2>
          <p className="text-lg md:text-xl mt-4 md:mt-6">
            Com o Qive, você tem uma fonte de dados para você se preparar.
          </p>
        </div>
        <div className="flex justify-center md:justify-end md:self-center">
          <button 
            className="bg-white text-[#FF4719] hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-md w-full md:w-auto"
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
