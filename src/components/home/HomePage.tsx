
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

const HomePage: React.FC<HomePageProps> = ({ onCnaeSubmit, onSelectSegment }) => {
  // When a user fills out the form with company data,
  // we store this in localStorage to use on the results page
  React.useEffect(() => {
    // Clear previous data when the page loads
    localStorage.removeItem('companyData');
  }, []);
  
  const handleFormSubmission = (cnae: string, segment?: BusinessSegment) => {
    // Save the form data in localStorage before navigating
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
      <div className="container mx-auto max-w-4xl px-4 -mt-8 relative z-10 mb-10">
        <SearchForm 
          onCnaeSubmit={(cnae) => handleFormSubmission(cnae)} 
          onSelectSegment={(segment) => handleFormSubmission('', segment)}
        />
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
      <TalkToExpert iconSrc="/lovable-uploads/5f4d33c6-7b3a-495b-8f95-2e636a6a8093.png" />
      
      {/* New floor: Sector tags */}
      <SectorTags />
    </div>
  );
};

export default HomePage;
