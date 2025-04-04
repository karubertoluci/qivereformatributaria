
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';

interface TalkToExpertProps {
  iconSrc?: string;
}

const TalkToExpert: React.FC<TalkToExpertProps> = ({
  iconSrc = "/lovable-uploads/0c928790-a8e1-4ae3-8539-e6917b68d73c.png" // Updated to use the Q icon
}) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <section className="bg-[#FF4719] py-12 text-white">
      <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center mb-6 md:mb-0 justify-center md:justify-start">
          <div className="w-24 h-24 mr-6 flex-shrink-0">
            <img 
              src={iconSrc} 
              alt="Qive Icon" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-medium">
              Qive na Reforma: fale com um especialista
            </h2>
            <p className="text-lg md:text-xl mt-2 font-normal">
              e saiba como podemos te ajudar
            </p>
          </div>
        </div>
        <button 
          onClick={openFormDialog}
          className="bg-white text-[#FF4719] hover:bg-orange-50 transition-colors px-6 py-3 rounded-md font-medium shadow-md w-full md:w-auto"
        >
          Falar com um especialista
        </button>
      </div>
    </section>
  );
};

export default TalkToExpert;
