
import React, { useState } from 'react';
import { toast } from 'sonner';
import { businessSegments, BusinessSegment } from '@/data/segments';
import SearchFormButton from './SearchFormButton';
import FormDialog, { FormValues } from './FormDialog';
import LoadingDialog from './LoadingDialog';
import { cnaeToSegmentMap } from './utils';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface SearchFormProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onCnaeSubmit, onBrowseBySegment, onSelectSegment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentRazaoSocial, setCurrentRazaoSocial] = useState('');

  const simulateReportGeneration = (data: FormValues) => {
    setShowLoadingDialog(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingDialog(false);
            const segmentId = cnaeToSegmentMap[data.cnae.substring(0, 2)];
            if (segmentId) {
              const segment = businessSegments.find(seg => seg.id === segmentId);
              if (segment) {
                toast.success(`Relatório para ${data.razaoSocial} gerado com sucesso!`);
                onSelectSegment(segment);
              }
            } else {
              onCnaeSubmit(data.cnae);
              toast.success(`Relatório para ${data.razaoSocial} gerado com sucesso!`);
            }
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleSubmit = (data: FormValues) => {
    setIsLoading(true);
    setCurrentRazaoSocial(data.razaoSocial);
    
    localStorage.setItem('formData', JSON.stringify(data));
    
    setTimeout(() => {
      setIsLoading(false);
      simulateReportGeneration(data);
      console.log("Dados capturados:", data);
      setIsFormDialogOpen(false);
    }, 1000);
  };

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg p-8 mb-8 border border-orange-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Relatório Personalizado da Reforma Tributária</h2>
        <p className="text-orange-600 text-center text-lg mb-8">
          Gere agora um relatório da Reforma Tributária de forma simplificada e compreenda o que pode impactar sua empresa.
        </p>
        
        <div className="flex flex-col items-center">
          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogTrigger asChild>
              <SearchFormButton />
            </DialogTrigger>
            
            <FormDialog 
              open={isFormDialogOpen}
              onOpenChange={setIsFormDialogOpen}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Dialog>
          
          <p className="text-sm text-gray-500 mt-2">Relatório gratuito e sem compromisso</p>
          
          <div className="mt-6 text-center">
            <button 
              onClick={onBrowseBySegment}
              className="text-orange-600 underline hover:text-orange-700 transition-colors text-sm cursor-pointer"
            >
              Prefiro navegar por segmento
            </button>
          </div>
        </div>
        
        <LoadingDialog 
          open={showLoadingDialog} 
          onOpenChange={setShowLoadingDialog}
          progress={loadingProgress}
          razaoSocial={currentRazaoSocial}
        />
      </div>
    </div>
  );
};

export default SearchForm;
