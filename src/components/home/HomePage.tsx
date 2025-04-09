import React, { useEffect } from 'react';
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
  // Effect to prepare for a fresh session
  useEffect(() => {
    // We'll keep formData in localStorage to preserve company information
    // Just ensure we're not keeping stale article data
    localStorage.removeItem('segmentArticles');
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      {/* First floor: Headline + Subtitle */}
      <Hero />
      
      {/* Search form in focus */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 w-full -mt-12 relative z-10">
        <SearchForm onSelectSegment={onSelectSegment} />
      </div>
      
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
