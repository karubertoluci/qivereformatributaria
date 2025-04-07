
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import HomePage from '@/components/home/HomePage';
import Results from '@/components/Results';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  const [cnae, setCnae] = useState<string>('');
  
  // Load previous state from localStorage if it exists (for persistence between page refreshes)
  useEffect(() => {
    const storedSegment = localStorage.getItem('selectedSegment');
    if (storedSegment) {
      setSelectedSegment(JSON.parse(storedSegment));
    }
    
    const storedCnae = localStorage.getItem('cnae');
    if (storedCnae) {
      setCnae(storedCnae);
    }
  }, []);
  
  const handleDirectSegmentSelect = (segment: BusinessSegment | null) => {
    if (segment) {
      setSelectedSegment(segment);
      // Store in localStorage for persistence
      localStorage.setItem('selectedSegment', JSON.stringify(segment));
    }
  };

  const handleSubmitCnae = (cnae: string) => {
    setCnae(cnae);
    // Store in localStorage for persistence
    localStorage.setItem('cnae', cnae);
    // Find a segment that matches the CNAE or use a default one
    // This logic would be handled within the SearchForm component now
  };

  const handleBackToHome = () => {
    setSelectedSegment(null);
    // Clear localStorage when going back to home
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('cnae');
    // Note: We're not clearing formData here so it can be used if the user selects a segment again
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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
    </div>
  );
};

export default Index;
