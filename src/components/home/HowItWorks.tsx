
import React from 'react';
import { Card } from '@/components/ui/card';

const HowItWorks = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">1</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Insira seu CNAE</h3>
            <p className="text-gray-300">Informe o código CNAE da sua empresa para análise personalizada</p>
          </Card>
          <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">2</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Analise os Resultados</h3>
            <p className="text-gray-300">Veja os artigos relevantes e seus impactos específicos</p>
          </Card>
          <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">3</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Tome Decisões Informadas</h3>
            <p className="text-gray-300">Planeje-se com base em informações claras e objetivas</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
