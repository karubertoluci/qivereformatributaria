
import React, { useEffect } from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import { toast } from 'sonner';
import { useCompanyData } from '@/hooks/results/useCompanyData';

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
    <div className="flex flex-col min-h-screen print:bg-white">
      <ResultsContainer 
        segment={segment} 
        onBackToSegments={onBackToSegments} 
      />
    </div>
  );
};

export default Results;
