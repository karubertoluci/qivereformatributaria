
import React, { useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import { toast } from 'sonner';
import { useCompanyData } from '@/hooks/results/useCompanyData';
import { AnimatePresence } from 'framer-motion';

export interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const { formData, refreshCompanyData, hasCompanyData } = useCompanyData();
  
  // Check for CNPJ changes when component mounts
  useEffect(() => {
    console.log('Results mounted - updating company data');
    refreshCompanyData();
  }, [refreshCompanyData]);
  
  useEffect(() => {
    console.log('Company data in Results:', formData);
    if (!hasCompanyData) {
      toast.warning('Dados da empresa não disponíveis. Algumas informações podem estar incompletas.');
    }
  }, [formData, hasCompanyData]);
  
  return (
    <AnimatePresence mode="wait">
      <ResultsContainer 
        segment={segment} 
        onBackToSegments={onBackToSegments} 
      />
    </AnimatePresence>
  );
};

export default Results;
