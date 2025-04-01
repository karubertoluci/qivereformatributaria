
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentSelector from '@/components/SegmentSelector';
import Results from '@/components/Results';
import { BusinessSegment } from '@/data/segments';
import HomePage from '@/components/home/HomePage';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  const [cnae, setCnae] = useState<string>('');
  const [showSegments, setShowSegments] = useState<boolean>(false);
  
  const handleSelectSegment = (segment: BusinessSegment) => {
    setSelectedSegment(segment);
  };

  const handleBackToSegments = () => {
    setSelectedSegment(null);
  };

  const handleSubmitCnae = (cnae: string) => {
    setCnae(cnae);
    setShowSegments(true);
  };

  const handleBrowseBySegment = () => {
    setShowSegments(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow">
        {!showSegments ? (
          <HomePage 
            onCnaeSubmit={handleSubmitCnae}
            onBrowseBySegment={handleBrowseBySegment}
          />
        ) : !selectedSegment ? (
          <SegmentSelector onSelectSegment={handleSelectSegment} />
        ) : (
          <Results segment={selectedSegment} onBackToSegments={handleBackToSegments} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
