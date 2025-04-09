
import React, { useState, useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import HomePage from '@/components/home/HomePage';
import Results from '@/components/Results';
import Header from '@/components/Header';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  const [cnae, setCnae] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if we have a previously selected segment in localStorage
  useEffect(() => {
    const storedSegment = localStorage.getItem('selectedSegment');
    if (storedSegment) {
      try {
        const parsedSegment = JSON.parse(storedSegment);
        setSelectedSegment(parsedSegment);
      } catch (error) {
        console.error('Error parsing stored segment:', error);
        localStorage.removeItem('selectedSegment');
      }
    }
  }, []);
  
  // Debug logs para acompanhar a mudança de estado
  useEffect(() => {
    console.log("Index: selectedSegment mudou para:", selectedSegment);
  }, [selectedSegment]);
  
  const handleDirectSegmentSelect = (segment: BusinessSegment | null) => {
    if (segment) {
      console.log("Segment selected:", segment.name);
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
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full max-w-full">
      {!selectedSegment && <Header />}
      <main className="flex-grow w-full max-w-full">
        {!selectedSegment ? (
          <HomePage 
            onCnaeSubmit={handleSubmitCnae}
            onSelectSegment={handleDirectSegmentSelect}
          />
        ) : (
          <AnimatePresence mode="wait">
            <Results 
              segment={selectedSegment} 
              onBackToSegments={handleBackToHome} 
            />
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default Index;
