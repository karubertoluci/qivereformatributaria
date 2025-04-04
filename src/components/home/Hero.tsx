
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, Info } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="py-2 px-4 flex items-center gap-2 text-sm border border-gray-200 shadow-sm bg-white/80">
            <Bot className="h-4 w-4" /> 
            Este conteúdo é gerado utilizando inteligência artificial
          </Badge>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            A Reforma Tributária <span className="text-orange-500">Simplificada</span> <br /> 
            para o seu Negócio
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-700">
            Entenda como a Lei Complementar 214/2025 afeta sua empresa e prepare-se para as mudanças que ocorrerão nos próximos anos.
          </p>
          
          <div className="inline-flex items-center text-gray-500 text-sm bg-white/80 px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <Info className="h-4 w-4 mr-2 text-orange-500" />
            Resultados personalizados com base no seu segmento de atuação
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
