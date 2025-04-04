
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ProductFeatures = () => {
  const { openFormDialog } = useFormDialogContext();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">O que oferecemos</h2>
        
        <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Nossa ferramenta de análise personalizada destaca exatamente o que você precisa 
          saber sobre a Reforma Tributária com base no seu setor de atuação.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Análise de Relevância */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-red-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 6H23V12" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H3.01" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H3.01" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H3.01" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3H3V10H10V3Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 3H14V10H21V3Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 14H14V21H21V14Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14H3V21H10V14Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Relatório personalizado</h3>
            <p className="text-gray-700">
              Gera um documento completo e personalizado com análise detalhada dos impactos 
              da reforma para o seu CNAE específico e setor de atuação.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={openFormDialog}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 text-white rounded-md font-medium"
          >
            Gerar relatório personalizado
          </Button>
          
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium"
          >
            Falar com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
