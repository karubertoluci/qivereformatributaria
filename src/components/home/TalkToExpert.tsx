
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';
import { Button } from '../ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TalkToExpertProps {
  iconSrc?: string;
}

const TalkToExpert: React.FC<TalkToExpertProps> = ({
  iconSrc = "/lovable-uploads/5f4d33c6-7b3a-495b-8f95-2e636a6a8093.png" // Novo logo da QIVE
}) => {
  const { openFormDialog } = useFormDialogContext();
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-[#FF4719] py-10 md:py-14 text-white relative overflow-hidden">
      {/* Linhas decorativas no fundo */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black opacity-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Logo circular com bordas pretas */}
          <div className="bg-black rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center border-4 border-black shadow-lg">
            <img 
              src={iconSrc} 
              alt="Qive Logo" 
              className="w-[90%] h-[90%] object-contain"
            />
          </div>
          
          {/* Texto centralizado em dispositivos móveis, alinhado à esquerda em desktop */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold mb-1">
              Qive na Reforma: fale com um especialista
            </h2>
            <p className="text-base md:text-lg opacity-90">
              e saiba como podemos te ajudar
            </p>
          </div>
        </div>
        
        {/* Botão CTA com hover effect e sombra */}
        <Button 
          onClick={openFormDialog}
          className="bg-white hover:bg-gray-50 text-[#FF4719] font-medium px-6 py-4 md:px-8 md:py-6 rounded-md text-base md:text-lg shadow-md transition-all duration-300 hover:shadow-lg mt-4 md:mt-0 w-full md:w-auto"
        >
          Falar com um especialista
        </Button>
      </div>
    </section>
  );
};

export default TalkToExpert;
