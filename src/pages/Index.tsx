
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentSelector from '@/components/SegmentSelector';
import Results from '@/components/Results';
import { BusinessSegment } from '@/data/segments';
import { Book, Search, FileText, CheckSquare } from 'lucide-react';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);

  const handleSelectSegment = (segment: BusinessSegment) => {
    setSelectedSegment(segment);
  };

  const handleBackToSegments = () => {
    setSelectedSegment(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {!selectedSegment ? (
          <>
            <section className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-16">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Reforma Tributária Simplificada
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                  Entenda os impactos da reforma tributária no seu negócio de forma clara e objetiva
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-12">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg w-full max-w-xs">
                    <Search className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Análise Personalizada</h3>
                    <p className="text-sm">Receba insights específicos para o seu segmento de atuação</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg w-full max-w-xs">
                    <Book className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Linguagem Clara</h3>
                    <p className="text-sm">Traduzimos o "juridiquês" para uma linguagem fácil de entender</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg w-full max-w-xs">
                    <FileText className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Impactos Detalhados</h3>
                    <p className="text-sm">Identifique oportunidades e desafios para o seu negócio</p>
                  </div>
                </div>
              </div>
            </section>
            
            <SegmentSelector onSelectSegment={handleSelectSegment} />
            
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Selecione seu Segmento</h3>
                    <p className="text-gray-600">Escolha o segmento que melhor representa o seu negócio</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analise os Resultados</h3>
                    <p className="text-gray-600">Veja os artigos relevantes e seus impactos específicos</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Tome Decisões Informadas</h3>
                    <p className="text-gray-600">Planeje-se com base em informações claras e objetivas</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <Results segment={selectedSegment} onBackToSegments={handleBackToSegments} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
