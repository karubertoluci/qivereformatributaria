
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';

const TalkToExpert = () => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <section className="bg-orange-500 py-12 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Qive na Reforma: fale com um especialista
        </h2>
        <p className="text-lg md:text-xl mb-6">
          e saiba como podemos te ajudar
        </p>
        <button 
          onClick={openFormDialog}
          className="bg-white text-orange-600 hover:bg-orange-50 transition-colors px-6 py-2 rounded-md font-medium"
        >
          Falar com um especialista
        </button>
      </div>
    </section>
  );
};

export default TalkToExpert;
