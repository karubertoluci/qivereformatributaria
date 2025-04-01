
import React from 'react';
import Hero from './Hero';
import SearchForm from './SearchForm';
import HowItWorks from './HowItWorks';
import ProductFeatures from './ProductFeatures';
import AboutQive from './AboutQive';
import { BusinessSegment } from '@/data/segments';

interface HomePageProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCnaeSubmit, onBrowseBySegment, onSelectSegment }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      <Hero />
      <div className="container mx-auto max-w-4xl px-4">
        <SearchForm 
          onCnaeSubmit={onCnaeSubmit} 
          onBrowseBySegment={onBrowseBySegment} 
          onSelectSegment={onSelectSegment}
        />
      </div>
      <HowItWorks />
      <ProductFeatures />
      <AboutQive />
    </div>
  );
};

export default HomePage;
