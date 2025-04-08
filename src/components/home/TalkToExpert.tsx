
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';

interface TalkToExpertProps {
  iconSrc?: string;
}

const TalkToExpert: React.FC<TalkToExpertProps> = ({
  iconSrc = "/lovable-uploads/c088a371-50e0-44aa-9616-68bada9e6e45.png" // Atualizado para usar o logo redondo da QIVE
}) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <section className="bg-[#FF4719] py-16 text-white">
      <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center mb-8 md:mb-0 justify-center md:justify-start">
          <div className="w-28 h-28 mr-8 flex-shrink-0 bg-black rounded-full flex items-center justify-center p-0.5">
            <img 
              src={iconSrc} 
              alt="Qive Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Qive na Reforma: fale com um especialista
            </h2>
            <p className="text-lg md:text-xl font-normal opacity-90">
              e saiba como podemos te ajudar
            </p>
          </div>
        </div>
        <button 
          onClick={openFormDialog}
          className="bg-white text-[#FF4719] hover:bg-orange-50 transition-colors px-8 py-4 rounded-lg font-medium shadow-md w-full md:w-auto text-lg"
        >
          Falar com um especialista
        </button>
      </div>
    </section>
  );
};

export default TalkToExpert;
