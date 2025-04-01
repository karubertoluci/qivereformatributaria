
import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Scale, Briefcase } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">O que oferecemos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Relevância */}
          <Card className="border border-gray-100 rounded-lg p-6 flex flex-col items-center h-full hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-center">Relevância</h3>
            
            <p className="text-gray-700 text-center mb-4">
              A IA analisa os artigos da Lei Complementar 214/2025 e avalia o quanto cada um impacta empresas de um CNAE específico. Em seguida, mostra uma explicação simples e direta sobre como o artigo afeta a atividade ou a tributação da empresa, junto com uma nota de 1 (irrelevante) a 5 (extremamente relevante), conforme o nível de impacto no negócio.
            </p>
            
            <div className="mt-auto bg-orange-50 p-4 rounded-md text-orange-700 text-sm w-full">
              Serve para te ajudar a saber quais artigos são mais "quentes" pro seu negócio, mas não dispensa a leitura completa do texto.
            </div>
          </Card>
          
          {/* Card 2: Favorabilidade */}
          <Card className="border border-gray-100 rounded-lg p-6 flex flex-col items-center h-full hover:shadow-md transition-shadow">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Scale className="h-8 w-8 text-blue-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-center">Favorabilidade</h3>
            
            <p className="text-gray-700 text-center mb-4">
              A IA analisa os artigos da Lei Complementar 214/2025 e identifica se o conteúdo é favorável, neutro ou desfavorável para empresas de um CNAE específico. Apresentamos uma explicação simples sobre como o artigo pode beneficiar, não afetar ou prejudicar a empresa.
            </p>
            
            <div className="mt-auto bg-blue-50 p-4 rounded-md text-blue-700 text-sm w-full">
              Consideramos aspectos como carga tributária, burocracia e segurança jurídica para uma análise completa.
            </div>
          </Card>
          
          {/* Card 3: CNAE */}
          <Card className="border border-gray-100 rounded-lg p-6 flex flex-col items-center h-full hover:shadow-md transition-shadow">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-green-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-center">CNAE</h3>
            
            <p className="text-gray-700 text-center mb-4">
              Abreviação de Classificação Nacional de Atividades Econômicas. É um código usado para identificar a atividade principal e as atividades secundárias de uma empresa no Brasil. Ele organiza as atividades econômicas de forma padronizada para fins fiscais, estatísticos e administrativos.
            </p>
            
            <div className="mt-auto bg-green-50 p-4 rounded-md text-green-700 text-sm w-full">
              Utilizamos a versão 2.3, a mais atualizada, disponível em: <a href="https://concla.ibge.gov.br" className="underline">concla.ibge.gov.br</a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
