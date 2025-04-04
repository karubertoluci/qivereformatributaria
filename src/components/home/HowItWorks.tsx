
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, FileText, Calendar, BookOpen, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">A Reforma Tributária em Resumo</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <p className="text-lg mb-6 leading-relaxed">
            A Reforma Tributária (Lei Complementar 214/2025) representa a maior mudança no sistema tributário 
            brasileiro das últimas décadas, trazendo impactos significativos para empresas de todos os setores.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <Card className="border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Principais Mudanças</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Criação da CBS (federal) substituindo PIS e COFINS</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Implementação do IBS (estadual/municipal) em substituição ao ICMS e ISS</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Adoção do sistema de crédito amplo e não cumulativo</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Princípio do destino para a tributação</span>
                </li>
              </ul>
            </Card>
            
            <Card className="border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">Cronograma de Implementação</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>2026:</strong> Início da implementação gradual</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>2026-2028:</strong> Teste do novo sistema com alíquotas reduzidas</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>2029-2033:</strong> Período de transição com redução gradual dos tributos antigos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>2033:</strong> Implementação completa do novo sistema</span>
                </li>
              </ul>
            </Card>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Por que sua empresa deve se preparar agora:</h3>
              <p className="text-gray-700">
                A complexidade e o alcance das mudanças exigem preparação antecipada. 
                Empresas que se adaptarem primeiro terão vantagem competitiva significativa, 
                enquanto as despreparadas enfrentarão desafios fiscais, operacionais e financeiros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
