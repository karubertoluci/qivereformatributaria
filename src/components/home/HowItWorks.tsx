
import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, FileText, LineChart } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="pb-8 pt-2 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-gray-200 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Search className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">Insira seu CNAE</h3>
            <p className="text-gray-600 text-sm">Digite o código CNAE da sua empresa</p>
          </Card>
          
          <Card className="bg-white border-gray-200 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">Analise os Artigos</h3>
            <p className="text-gray-600 text-sm">Veja os artigos mais relevantes para você</p>
          </Card>
          
          <Card className="bg-white border-gray-200 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <LineChart className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">Tome Decisões</h3>
            <p className="text-gray-600 text-sm">Planeje-se com base em análises claras</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
