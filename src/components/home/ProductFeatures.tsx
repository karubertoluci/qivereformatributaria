
import React from 'react';
import { useFormDialogContext } from './FormDialogContext';
import { Button } from '@/components/ui/button';
import { TrendingUp, ListChecks, FileText } from 'lucide-react';

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
            <div className="text-orange-500 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Análise de relevância</h3>
            <p className="text-gray-700">
              Identifica quais artigos da reforma tributária têm maior impacto para o seu segmento, 
              com classificação para priorizar sua leitura.
            </p>
          </div>
          
          {/* Análise de Impacto */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-orange-500 mb-4">
              <ListChecks className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Análise de impacto</h3>
            <p className="text-gray-700">
              Avalia se o artigo é favorável, neutro ou desfavorável para seu negócio, 
              considerando carga tributária, burocracia e segurança jurídica.
            </p>
          </div>
          
          {/* Relatório Personalizado */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-orange-500 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Relatório personalizado</h3>
            <p className="text-gray-700">
              Gera um documento completo e personalizado com análise detalhada dos impactos 
              da reforma para o seu CNAE específico e setor de atuação.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={openFormDialog}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-5 text-white rounded-md font-medium"
          >
            Gerar relatório personalizado
          </Button>
          
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-5 rounded-md font-medium"
          >
            Falar com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
