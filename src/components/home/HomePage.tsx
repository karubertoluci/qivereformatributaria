
import React from 'react';
import Hero from './Hero';
import SearchForm from './search-form';
import HowItWorks from './HowItWorks';
import SectorsImpact from './SectorsImpact';
import ProductFeatures from './ProductFeatures';
import ExpertQuotes from './ExpertQuotes';
import AboutQive from './AboutQive';
import { BusinessSegment } from '@/data/segments';

interface HomePageProps {
  onCnaeSubmit: (cnae: string) => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCnaeSubmit, onSelectSegment }) => {
  // Quando um usuário preenche o formulário com dados da empresa,
  // armazenamos isso no localStorage para usar na página de resultados
  React.useEffect(() => {
    // Limpar os dados anteriores quando a página é carregada
    localStorage.removeItem('companyData');
  }, []);
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      {/* Primeiro andar: Manchete + Subtítulo */}
      <Hero />
      
      {/* Formulário de busca em destaque */}
      <div className="container mx-auto max-w-4xl px-4 -mt-8 relative z-10 mb-10">
        <SearchForm 
          onCnaeSubmit={(cnae) => {
            // Salvamos o CNAE e outros dados do formulário no localStorage
            const formData = JSON.parse(localStorage.getItem('formData') || '{}');
            if (formData) {
              localStorage.setItem('companyData', JSON.stringify(formData));
            }
            onCnaeSubmit(cnae);
          }} 
          onSelectSegment={(segment) => {
            // Salvamos os dados do formulário no localStorage antes de navegar
            const formData = JSON.parse(localStorage.getItem('formData') || '{}');
            if (formData) {
              localStorage.setItem('companyData', JSON.stringify(formData));
            }
            onSelectSegment(segment);
          }}
        />
      </div>
      
      {/* Segundo andar: Explicação sobre a reforma */}
      <HowItWorks />
      
      {/* Terceiro andar: Setores impactados pela reforma */}
      <SectorsImpact />
      
      {/* Quarto andar: O que oferecemos */}
      <ProductFeatures />
      
      {/* Quinto andar: O que os especialistas dizem */}
      <ExpertQuotes />
      
      {/* Sexto andar: Por que criamos a Qive */}
      <AboutQive />
    </div>
  );
};

export default HomePage;
