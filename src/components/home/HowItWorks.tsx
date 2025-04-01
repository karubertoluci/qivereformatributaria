
import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, FileText, LineChart } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Insira seu CNAE</h3>
            <p className="text-gray-600">Digite o código CNAE da sua empresa para análise personalizada</p>
          </Card>
          
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Analise os Artigos</h3>
            <p className="text-gray-600">Veja os artigos mais relevantes para o seu segmento de atuação</p>
          </Card>
          
          <Card className="bg-white border-gray-200 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <LineChart className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Tome Decisões</h3>
            <p className="text-gray-600">Planeje-se com base em análises claras e objetivas da reforma tributária</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
