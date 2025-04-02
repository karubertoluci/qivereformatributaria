import React from 'react';
import { Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const Hero = () => {
  return <section className="bg-white pt-16 pb-6 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="py-2 px-4 flex items-center gap-2 text-sm border border-gray-200 shadow-sm bg-gray-100">
            <Bot className="h-4 w-4" /> 
            Este conteúdo é gerado utilizando inteligência artificial
          </Badge>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 leading-tight">
            A Reforma Tributária e o Impacto no Seu Negócio
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-700">
            Entenda como a Lei Complementar 214/2025 afeta sua empresa e prepare-se para as mudanças no sistema tributário brasileiro.
          </p>
        </div>
      </div>
    </section>;
};
export default Hero;