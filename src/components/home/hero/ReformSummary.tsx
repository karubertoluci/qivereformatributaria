
import React from 'react';

const ReformSummary = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">A Reforma Tributária em resumo</h2>
      
      <p className="text-lg text-center text-gray-700 mb-12 max-w-4xl mx-auto">
        A Reforma Tributária (Lei Complementar 214/2025) representa a maior mudança no 
        sistema tributário brasileiro das últimas décadas, trazendo impactos significativos para 
        empresas de todos os setores.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Principais Mudanças */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Principais Mudanças</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700">Criação da CBS (federal) substituindo PIS e COFINS</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700">Implementação do IBS (estadual/municipal) em substituição ao ICMS e ISS</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700">Adoção do sistema de crédito amplo e não cumulativo</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700">Princípio do destino para a tributação</span>
            </li>
          </ul>
        </div>
        
        {/* Cronograma de Implementação */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Cronograma de Implementação</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700"><strong>2026:</strong> Início da implementação gradual</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700"><strong>2026-2028:</strong> Teste do novo sistema com alíquotas reduzidas</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700"><strong>2029-2033:</strong> Período de transição com redução gradual dos tributos antigos</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700"><strong>2033:</strong> Implementação completa do novo sistema</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Alerta de preparação */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-red-700">Por que sua empresa deve se preparar agora:</h3>
            <p className="text-gray-700 mt-2">
              A complexidade e o alcance das mudanças exigem preparação antecipada. Empresas que se adaptarem 
              primeiro terão vantagem competitiva significativa, enquanto as despreparadas enfrentarão desafios 
              fiscais, operacionais e financeiros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReformSummary;
