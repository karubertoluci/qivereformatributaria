import React from 'react';
import { FileText, Shield, LightbulbIcon, BookOpen } from 'lucide-react';
const AboutQive = () => {
  return <section className="bg-gray-50 py-[56px]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">Por que Criamos a Qive Reforma Tributária</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-lg mb-4 leading-relaxed">
                Navegamos pela reforma tributária para que você não precise fazê-lo sozinho. 
                Sabemos que os 544 artigos distribuídos na Lei Complementar 214/2025 
                podem ser um desafio interpretativo para empresários e gestores financeiros.
              </p>
              <p className="text-lg leading-relaxed">
                A Qive desenvolveu esta solução para traduzir a complexidade da reforma em 
                insights práticos e acionáveis para o seu negócio, poupando seu tempo e 
                preparando sua empresa para as mudanças que virão.
              </p>
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
              <BookOpen className="h-6 w-6 text-white" />
            </div>
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
    </section>;
};
export default AboutQive;