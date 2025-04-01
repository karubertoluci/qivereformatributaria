
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Scale, Briefcase } from 'lucide-react';

const ProductFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Como funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Relevância */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Relevância</h3>
              <p className="text-gray-700 text-center">
                A IA analisa os artigos da Lei Complementar 214/2025 e avalia o quanto cada um impacta empresas 
                de um CNAE específico. Em seguida, mostra uma explicação simples e direta sobre como o artigo 
                afeta a atividade ou a tributação da empresa, junto com uma nota de 1 (irrelevante) 
                a 5 (extremamente relevante), conforme o nível de impacto no negócio.
              </p>
              <div className="mt-4 bg-orange-50 p-3 rounded-md text-sm">
                <p className="italic text-orange-700">
                  Serve para te ajudar a saber quais artigos são mais "quentes" pro seu negócio, mas não dispensa 
                  a leitura completa do texto.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Favorabilidade */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Scale className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Favorabilidade</h3>
              <p className="text-gray-700 text-center">
                A IA analisa os artigos da Lei Complementar 214/2025 e identifica se o conteúdo é favorável, 
                neutro ou desfavorável para empresas de um CNAE específico. Apresentamos uma explicação simples 
                sobre como o artigo pode beneficiar, não afetar ou prejudicar a empresa.
              </p>
              <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm">
                <p className="italic text-blue-700">
                  Consideramos aspectos como carga tributária, burocracia e segurança jurídica para uma análise completa.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* CNAE */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">CNAE</h3>
              <p className="text-gray-700 text-center">
                Abreviação de Classificação Nacional de Atividades Econômicas. É um código usado para identificar 
                a atividade principal e as atividades secundárias de uma empresa no Brasil. Ele organiza as atividades 
                econômicas de forma padronizada para fins fiscais, estatísticos e administrativos.
              </p>
              <div className="mt-4 bg-green-50 p-3 rounded-md text-sm">
                <p className="italic text-green-700">
                  Utilizamos a versão 2.3, a mais atualizada, disponível em: 
                  <a href="https://concla.ibge.gov.br/classificacoes/download-concla.html" 
                     className="underline ml-1" target="_blank" rel="noopener noreferrer">
                    concla.ibge.gov.br
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
