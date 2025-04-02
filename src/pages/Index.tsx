
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Results from '@/components/Results';
import { BusinessSegment } from '@/data/segments';
import HomePage from '@/components/home/HomePage';
import { FormDialogProvider } from '@/components/home/FormDialogContext';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  const [cnae, setCnae] = useState<string>('');
  
  const handleDirectSegmentSelect = (segment: BusinessSegment | null) => {
    if (segment) {
      setSelectedSegment(segment);
    }
  };

  const handleSubmitCnae = (cnae: string) => {
    setCnae(cnae);
    // Find a segment that matches the CNAE or use a default one
    // This logic would be handled within the SearchForm component now
  };

  const handleBackToHome = () => {
    setSelectedSegment(null);
  };

  return (
    <FormDialogProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {!selectedSegment ? (
            <HomePage 
              onCnaeSubmit={handleSubmitCnae}
              onSelectSegment={handleDirectSegmentSelect}
            />
          ) : (
            <Results segment={selectedSegment} onBackToSegments={handleBackToHome} />
          )}
        </main>
        
        <Footer />
      </div>
    </FormDialogProvider>
  );
};

export default Index;
