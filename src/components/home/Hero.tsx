
import React from 'react';
import { Card } from '@/components/ui/card';
import { Book, Search, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 flex-grow">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Seja bem-vindo à Reforma Tributária Simplificada
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
            Entenda os impactos da reforma tributária no seu negócio de forma clara e objetiva
          </p>
        </div>
        
        <Card className="bg-gray-50 border border-gray-200 p-6 mb-8 shadow-md">
          <p className="text-lg text-center text-gray-800">
            É importante você saber que o conteúdo aqui é feito utilizando inteligência artificial.
          </p>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <Search className="h-10 w-10 mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-center">Análise Personalizada</h3>
            <p className="text-sm text-center text-gray-600">Receba insights específicos para o seu segmento de atuação</p>
          </Card>
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <Book className="h-10 w-10 mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-center">Linguagem Clara</h3>
            <p className="text-sm text-center text-gray-600">Traduzimos o "juridiquês" para uma linguagem fácil de entender</p>
          </Card>
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <FileText className="h-10 w-10 mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-center">Impactos Detalhados</h3>
            <p className="text-sm text-center text-gray-600">Identifique oportunidades e desafios para o seu negócio</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
