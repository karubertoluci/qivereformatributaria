
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, AlertTriangle } from 'lucide-react';

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
            Descubra como a Reforma Tributária impacta o seu negócio
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-700">
            A Lei Complementar 214/2025 traz mudanças significativas para empresas brasileiras.
            <span className="font-semibold block mt-2">Você está preparado?</span>
          </p>
          
          <div className="bg-red-50 p-4 rounded-lg max-w-2xl mx-auto mb-6 border-l-4 border-red-500">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-700">Mudanças que podem impactar seu faturamento:</h3>
                <ul className="text-left text-red-600 mt-2 space-y-1">
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Novos cálculos de IBS e CBS
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Alterações na tributação de produtos e serviços
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Mudanças nas obrigações fiscais acessórias
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Regimes específicos para cada setor
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <p className="font-bold text-lg text-orange-600">
            Não espere para entender as mudanças! Gere agora seu relatório personalizado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
