
import React from 'react';
import { FileText, Link as LinkIcon, Shield, Clock, LightbulbIcon, BookOpen } from 'lucide-react';

const AboutQive = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">Por que Criamos a Qive Reforma Tributária</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <p className="text-lg mb-6 leading-relaxed">
            Sabemos que navegar pelos 544 artigos distribuídos nos três livros da Lei Complementar 214/2025 
            pode ser desafiador — especialmente quando o tempo é curto e o impacto para o seu negócio é direto.
          </p>
          
          <p className="text-lg mb-6 leading-relaxed">
            Pensando nisso, a Qive desenvolveu uma solução que vai além da tecnologia fiscal: uma análise estratégica 
            e personalizada dos artigos da Reforma Tributária.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="flex items-start">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <LightbulbIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Nosso objetivo</h3>
                <p className="text-gray-700">
                  Oferecer um panorama claro da relevância de cada artigo para o seu segmento, 
                  ajudando você a priorizar os trechos da lei que merecem mais atenção pro seu caso específico.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Para cada artigo</h3>
                <p className="text-gray-700">
                  Você encontrará três seções: Análise de Relevância, Análise de Favorabilidade 
                  e o Texto Original, permitindo uma leitura contextualizada e orientada para decisões práticas.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-6 leading-relaxed">
            Assim como a Qive é a ponte que conecta seus documentos fiscais desde os órgãos reguladores até o seu ERP 
            com eficiência e confiabilidade, era fundamental estendermos nossa parceria para facilitar sua compreensão 
            da reforma tributária.
          </p>
          
          <p className="text-lg mb-8 leading-relaxed">
            Essa ferramenta foi criada para que você tenha mais segurança e clareza na interpretação da lei — 
            sem substituir a leitura completa, mas otimizando sua jornada.
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3 mr-4 flex-shrink-0">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <p className="text-gray-800 font-medium">
              E lembre-se: quando o assunto é automatização de rotinas com documentos fiscais, 
              a fonte da verdade é a Qive. <span className="font-bold">O elo do fiscal com o financeiro.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQive;
