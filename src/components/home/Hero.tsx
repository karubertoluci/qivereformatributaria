
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { useFormDialogContext } from './FormDialogContext';

const Hero = () => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <section className="bg-white pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="py-2 px-4 flex items-center gap-2 text-sm border border-gray-200 shadow-sm bg-white/80">
            <Bot className="h-4 w-4" /> 
            Este conteúdo é gerado utilizando inteligência artificial
          </Badge>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            A Reforma Tributária e o <br /> 
            impacto no seu negócio
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-700">
            Entenda como a Lei Complementar 214/2025 afeta sua empresa e 
            prepare-se para as mudanças no sistema tributário brasileiro com a Qive.
          </p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-8 border border-orange-100 max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">
              este conteúdo é gerado por inteligencia artificial
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Gere um relatório personalizado da<br />
              Reforma Tributária para sua empresa
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <img 
              src="/lovable-uploads/a1fa57b5-d751-45dc-ad02-a455994c6dbd.png" 
              alt="Relatório da Reforma Tributária" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="text-center">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium py-3 px-6 rounded-md shadow-md mb-3"
              onClick={openFormDialog}
            >
              Gerar relatório personalizado pra minha empresa
            </button>
            <p className="text-sm text-gray-500">Relatório gratuito e sem compromisso</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
