
import React from 'react';
import { FileText, Search, LightbulbIcon, BookOpen, Globe, Share2, Zap, Shield, BarChart4 } from 'lucide-react';

const AboutQive = () => {
  return <section className="bg-gradient-to-b from-gray-50 to-orange-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Por que Criamos a Qive Reforma Tributária</h2>
        
        <div className="flex justify-center mb-10">
          <div className="w-24 h-1 bg-[#FF4719] rounded"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Vídeo (ocupando toda a altura do grid na coluna esquerda) */}
            <div className="rounded-lg overflow-hidden w-full h-full shadow-lg border border-orange-100">
              <div className="aspect-video w-full h-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Re_x1_l87lE" 
                  title="Apresentação da Qive Reforma Tributária" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Conteúdo da direita - Texto principal e diferenciais */}
            <div className="flex flex-col">
              {/* Nossos diferenciais com ícones diferentes */}
              <div className="bg-orange-50 p-6 rounded-lg flex-grow">
                <h4 className="font-bold text-xl mb-4 flex items-center">
                  <LightbulbIcon className="h-5 w-5 text-[#FF4719] mr-2" /> 
                  Nossos diferenciais:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <Search className="h-4 w-4 text-[#FF4719]" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Análise especializada</strong> por setor de atuação e CNAE específico
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <BarChart4 className="h-4 w-4 text-[#FF4719]" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Priorizamos conteúdo</strong> que realmente importa para o seu negócio
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <Globe className="h-4 w-4 text-[#FF4719]" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Linguagem acessível</strong> para facilitar o entendimento de termos técnicos
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <Zap className="h-4 w-4 text-[#FF4719]" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Relatórios personalizados</strong> que você pode compartilhar com sua equipe
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Caixa de lembrete na parte inferior */}
          <div className="bg-gradient-to-r from-[#FF4719] to-[#FF5A30] rounded-lg p-6 flex items-start text-white shadow-md">
            <div className="bg-white rounded-full p-3 mr-4 flex-shrink-0">
              <Shield className="h-5 w-5 text-[#FF4719]" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">E lembre-se...</h4>
              <p className="text-white">
                Nossa plataforma está em constante atualização para acompanhar as últimas 
                mudanças na legislação e oferecer o conteúdo mais relevante para o seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default AboutQive;
