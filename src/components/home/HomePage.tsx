
import React from 'react';
import Hero from './hero/Hero';
import SearchForm from './search-form';
import HowItWorks from './HowItWorks';
import SectorsImpact from './SectorsImpact';
import ExpertQuotes from './ExpertQuotes';
import AboutQive from './AboutQive';
import TalkToExpert from './TalkToExpert';
import SectorTags from './SectorTags';
import { BusinessSegment } from '@/data/segments';

interface HomePageProps {
  onCnaeSubmit: (cnae: string) => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onCnaeSubmit,
  onSelectSegment
}) => {
  // Quando um usuário preenche o formulário com dados da empresa,
  // armazenamos no localStorage para usar na página de resultados
  React.useEffect(() => {
    // Limpar dados anteriores quando a página carrega
    localStorage.removeItem('companyData');
    // Também removemos dados de artigos do segmento para garantir que serão buscados novamente
    localStorage.removeItem('segmentArticles');
  }, []);

  const handleFormSubmission = (cnae: string, segment?: BusinessSegment) => {
    // Salvar os dados do formulário no localStorage antes de navegar
    const formData = JSON.parse(localStorage.getItem('formData') || '{}');
    if (formData) {
      localStorage.setItem('companyData', JSON.stringify(formData));
    }

    if (segment) {
      onSelectSegment(segment);
    } else {
      onCnaeSubmit(cnae);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      {/* First floor: Headline + Subtitle */}
      <Hero />
      
      {/* Search form in focus */}
      <SearchForm />
      
      {/* Second floor: Explanation about the reform */}
      <HowItWorks />
      
      {/* Third floor: Sectors impacted by the reform */}
      <SectorsImpact />
      
      {/* Fifth floor: What the experts say */}
      <ExpertQuotes />
      
      {/* Sixth floor: Why we created Qive */}
      <AboutQive />
      
      {/* New floor: Talk to an expert */}
      <TalkToExpert iconSrc="/lovable-uploads/ac430354-112a-4ea8-a199-de19527f88ca.png" />
      
      {/* New floor: Sector tags */}
      <SectorTags />
    </div>
  );
};

export default HomePage;
