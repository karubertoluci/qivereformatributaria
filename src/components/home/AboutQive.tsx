
import React from 'react';
import { Shield, LightbulbIcon } from 'lucide-react';

const AboutQive = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-4">Por que Criamos a Qive Reforma Tributária</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-stretch mb-8">
          {/* YouTube Video */}
          <div className="w-full md:w-3/5 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Re_x1_l87lE?list=PL5OqRfb0Uhmht6AbXSGx-qog1nOBlOISt" 
                title="Qive Reforma Tributária" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
          
          {/* Diferenciais */}
          <div className="w-full md:w-2/5 bg-white rounded-xl shadow-md p-6 flex flex-col">
            <div className="mb-4">
              <h4 className="font-bold text-xl mb-4 flex items-center text-orange-600">
                <LightbulbIcon className="h-5 w-5 text-orange-500 mr-2" /> 
                Nossos diferenciais:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-gray-700">
                    <strong>Análise especializada</strong> por setor de atuação e CNAE específico
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-gray-700">
                    <strong>Priorizamos conteúdo</strong> que realmente importa para o seu negócio
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-gray-700">
                    <strong>Linguagem acessível</strong> para facilitar o entendimento de termos técnicos
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-gray-700">
                    <strong>Relatórios personalizados</strong> que você pode compartilhar com sua equipe
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start">
              <img 
                src="/lovable-uploads/91206615-9a00-4cbb-85ad-ee19eba09f20.png" 
                alt="Qive Logo" 
                className="w-12 h-12 mr-4 flex-shrink-0" 
              />
              <div>
                <p className="text-gray-800 font-medium mb-2">
                  E lembre-se: quando o assunto é automatização de rotinas com documentos fiscais, 
                  a fonte da verdade é a Qive.
                </p>
                <p className="text-lg font-bold text-orange-700">
                  O elo do fiscal com o financeiro.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Prepare sua empresa para a maior mudança tributária das últimas décadas</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Sabemos que os 544 artigos distribuídos na Lei Complementar 214/2025 
            podem ser um desafio interpretativo para empresários e gestores financeiros.
            A Qive está aqui para guiar seu negócio nesta transição.
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors shadow-md">
            Gerar relatório personalizado
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutQive;
