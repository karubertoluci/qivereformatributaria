
import React from 'react';
import Hero from './Hero';
import SearchForm from './SearchForm';
import HowItWorks from './HowItWorks';

interface HomePageProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCnaeSubmit, onBrowseBySegment }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      <Hero />
      <div className="container mx-auto max-w-4xl px-4">
        <SearchForm onCnaeSubmit={onCnaeSubmit} onBrowseBySegment={onBrowseBySegment} />
      </div>
      <HowItWorks />
    </div>
  );
};

export default HomePage;
