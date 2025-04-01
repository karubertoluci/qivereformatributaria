
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white pt-12 pb-6 md:pt-16 md:pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="py-2 px-4 flex items-center gap-2 text-sm bg-white border border-gray-200 shadow-sm">
            <Bot className="h-4 w-4" /> 
            É importante você saber que o conteúdo aqui é feito utilizando inteligência artificial.
          </Badge>
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Seja bem-vindo à Reforma Tributária Simplificada
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-gray-700">
            Entenda os impactos da reforma tributária no seu negócio de forma clara e objetiva
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
