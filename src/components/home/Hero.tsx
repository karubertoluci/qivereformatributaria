
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, FileBarChart, List, PieChart } from 'lucide-react';
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
        
        {/* O que oferecemos section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4">O que oferecemos</h2>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Nossa ferramenta de análise personalizada destaca exatamente o que você precisa 
            saber sobre a Reforma Tributária com base no seu setor de atuação.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Análise de Relevância */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-red-500 mb-4">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análise de relevância</h3>
              <p className="text-gray-700">
                Identifica quais artigos da reforma tributária têm maior impacto para o seu segmento, 
                com classificação para priorizar sua leitura.
              </p>
            </div>
            
            {/* Análise de Impacto */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-red-500 mb-4">
                <List className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análise de impacto</h3>
              <p className="text-gray-700">
                Avalia se o artigo é favorável, neutro ou desfavorável para seu negócio, 
                considerando carga tributária, burocracia e segurança jurídica.
              </p>
            </div>
            
            {/* Relatório Personalizado */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-red-500 mb-4">
                <FileBarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Relatório personalizado</h3>
              <p className="text-gray-700">
                Gera um documento completo e personalizado com análise detalhada dos impactos 
                da reforma para o seu CNAE específico e setor de atuação.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mensagem em laranja CTA */}
        <div className="mt-20 bg-orange-500 text-white py-12 px-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            O maior risco não está na mudança de alíquotas e modelo de tributação,<br />
            mas na gestão incorreta da informação.
          </h2>
          <p className="text-xl mb-8">
            Com o Qive, você tem uma fonte de dados para você se preparar.
          </p>
          <button 
            className="bg-white text-orange-500 hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-md"
            onClick={openFormDialog}
          >
            Falar com um especialista
          </button>
        </div>
        
        {/* A Reforma Tributária em resumo */}
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
      </div>
    </section>
  );
};

export default Hero;
