
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';

interface TalkToExpertProps {
  iconSrc?: string;
}

const TalkToExpert: React.FC<TalkToExpertProps> = ({
  iconSrc = "/lovable-uploads/c088a371-50e0-44aa-9616-68bada9e6e45.png" // Logo redondo da QIVE
}) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <section className="bg-[#FF4719] py-12 text-white">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-8 md:mb-0">
          <div className="bg-black rounded-full w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center mr-6">
            <img 
              src={iconSrc} 
              alt="Qive Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Qive na Reforma: fale com um especialista
            </h2>
            <p className="text-lg opacity-90">
              e saiba como podemos te ajudar
            </p>
          </div>
        </div>
        <button 
          onClick={openFormDialog}
          className="bg-white text-[#FF4719] hover:bg-orange-50 transition-colors px-8 py-3 rounded-lg font-medium text-lg shadow-md self-stretch md:self-auto"
        >
          Falar com um especialista
        </button>
      </div>
    </section>
  );
};

export default TalkToExpert;
