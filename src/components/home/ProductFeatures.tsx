
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Scale, FileSearch, PieChart, BarChart4, FileBarChart2 } from 'lucide-react';

const ProductFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">O que Oferecemos</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <p className="text-lg text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          Nossa ferramenta de análise personalizada destaca exatamente o que você precisa saber 
          sobre a Reforma Tributária com base no seu setor de atuação.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Relevância */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análise de Relevância</h3>
              <p className="text-gray-700 text-center">
                Identificamos quais artigos da reforma tributária têm maior impacto para o seu segmento, 
                com classificação de importância para priorizar sua leitura.
              </p>
            </CardContent>
          </Card>
          
          {/* Favorabilidade */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Scale className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análise de Impacto</h3>
              <p className="text-gray-700 text-center">
                Avaliamos se cada artigo é favorável, neutro ou desfavorável para seu negócio, 
                considerando carga tributária, burocracia e segurança jurídica.
              </p>
            </CardContent>
          </Card>
          
          {/* Relatórios */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FileSearch className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Relatório Personalizado</h3>
              <p className="text-gray-700 text-center">
                Receba um documento completo e personalizado com análise detalhada dos impactos
                da reforma para o seu CNAE específico e setor de atuação.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Visualização de dados */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <PieChart className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visualização de Dados</h3>
              <p className="text-gray-700 text-center">
                Gráficos e visualizações interativas que facilitam a compreensão dos principais
                pontos da reforma e seu impacto no seu negócio.
              </p>
            </CardContent>
          </Card>
          
          {/* Priorização */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BarChart4 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Priorização de Ações</h3>
              <p className="text-gray-700 text-center">
                Recomendações objetivas sobre quais aspectos da reforma exigem atenção imediata
                e quais podem ser abordados posteriormente.
              </p>
            </CardContent>
          </Card>
          
          {/* Comparativo */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FileBarChart2 className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Análise Comparativa</h3>
              <p className="text-gray-700 text-center">
                Comparação entre o sistema tributário atual e o novo modelo, com estimativas
                de impacto financeiro para o seu tipo de negócio.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
