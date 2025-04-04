
import React from 'react';
import { Shield, LightbulbIcon } from 'lucide-react';

const AboutQive = () => {
  return (
    <section className="bg-gray-50 py-[56px]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">Por que Criamos a Qive Reforma Tributária</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <div className="flex flex-col md:flex-row items-start mb-8 gap-6">
            <div className="w-full md:w-1/2">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe 
                  src="https://www.youtube.com/embed/Re_x1_l87lE?list=PL5OqRfb0Uhmht6AbXSGx-qog1nOBlOISt" 
                  title="Qive Reforma Tributária"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-orange-50 p-6 rounded-lg">
              <h4 className="font-bold text-xl mb-4 flex items-center">
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
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 flex items-start">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3 mr-4 flex-shrink-0">
              <img src="/lovable-uploads/7bfc28df-a268-47ff-82e3-866bef7ded45.png" alt="Qive Logo" className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">E lembre-se...</h4>
              <p className="text-gray-700">
                Navegamos pela reforma tributária para que você não precise fazê-lo sozinho. 
                Sabemos que os 544 artigos distribuídos na Lei Complementar 214/2025 
                podem ser um desafio interpretativo para empresários e gestores financeiros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQive;
