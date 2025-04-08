
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import ResultsContainer from './results/ResultsContainer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { forceArticleRefresh } from '@/utils/cacheUtils';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react';

export interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const navigate = useNavigate();
  
  // Obter nome da empresa do localStorage se disponível
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const companyName = formData?.razaoSocial || formData?.nomeFantasia || formData?.nome;

  const handleRefresh = () => {
    forceArticleRefresh(segment.id);
    toast.info("Atualizando dados dos artigos...");
    // Recarregar a página para forçar a busca de novos dados
    window.location.reload();
  };

  return (
    <div className="print:bg-white">
      <div className="container mx-auto py-4 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" /> 
          Atualizar Artigos
        </Button>
      </div>
      <ResultsContainer segment={segment} onBackToSegments={onBackToSegments} />
    </div>
  );
};

export default Results;
