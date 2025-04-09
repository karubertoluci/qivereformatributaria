
import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import FormDialog from './FormDialog';
import { FormValues } from './types/companyData';
import SearchFormLoading from './SearchFormLoading';
import { useFormDialogContext } from '../FormDialogContext';
import { BusinessSegment, businessSegments } from '@/data/segments';
import { toast } from 'sonner';

interface SearchFormDialogsProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const SearchFormDialogs: React.FC<SearchFormDialogsProps> = ({ 
  onSubmit, 
  isLoading, 
  setIsLoading,
  onSelectSegment
}) => {
  const { isFormDialogOpen, closeFormDialog } = useFormDialogContext();
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  
  const handleDialogSubmit = (data: FormValues) => {
    console.log("SearchFormDialogs: Form submitted, preparing to show loading");
    setFormData(data);
    closeFormDialog();
    
    // Small delay to ensure the form dialog has completely closed
    setTimeout(() => {
      setIsLoading(true);
      console.log("SearchFormDialogs: Starting loading");
      
      // Process the form
      onSubmit(data);
      
      // Try to find a matching segment based on CNAE
      if (data?.companyData?.cnaePrincipal?.descricao) {
        // Try to find a matching segment based on CNAE description
        let descLower = data.companyData.cnaePrincipal.descricao.toLowerCase();
        
        console.log("Pré-selecionando segmento para CNAE:", descLower);
        
        // Find a segment that may be related to the company's CNAE
        const foundSegment = businessSegments.find(segment => 
          descLower.includes(segment.name.toLowerCase())
        ) || businessSegments[0]; // Default to first segment if no match
        
        console.log("Segmento pré-selecionado:", foundSegment.name);
        setSelectedSegment(foundSegment);
      }
    }, 300);
  };
  
  const handleLoadingComplete = () => {
    console.log("SearchFormDialogs: Loading completed");
    setLoadingCompleted(true);
    setIsLoading(false);
    
    // Delay to ensure state updates have propagated
    setTimeout(() => {
      if (selectedSegment) {
        console.log("Selecionando segmento após carregamento:", selectedSegment.name);
        // Store it in localStorage for persistence
        localStorage.setItem('selectedSegment', JSON.stringify(selectedSegment));
        
        // Show success toast
        const companyName = formData?.companyData?.nomeFantasia || 
                         formData?.companyData?.nome_fantasia || 
                         formData?.companyData?.razaoSocial || 
                         formData?.companyData?.razao_social ||
                         "empresa";
        toast.success(`Relatório para ${companyName} está pronto!`);
        
        // Important: Call the onSelectSegment callback to trigger the segment selection
        onSelectSegment(selectedSegment);
      } else if (formData?.companyData?.cnaePrincipal?.descricao) {
        // Fallback if selectedSegment wasn't set
        let descLower = formData.companyData.cnaePrincipal.descricao.toLowerCase();
        const defaultSegment = businessSegments.find(segment => 
          descLower.includes(segment.name.toLowerCase())
        ) || businessSegments[0];
        
        console.log("Fallback: Selecionando segmento padrão:", defaultSegment.name);
        localStorage.setItem('selectedSegment', JSON.stringify(defaultSegment));
        toast.success("Relatório está pronto!");
        onSelectSegment(defaultSegment);
      } else {
        // Last resort fallback
        console.log("Último recurso: selecionando primeiro segmento");
        localStorage.setItem('selectedSegment', JSON.stringify(businessSegments[0]));
        toast.success("Relatório está pronto!");
        onSelectSegment(businessSegments[0]);
      }
    }, 500);
  };

  // Ensure we have a segment selection, even if loading completes unexpectedly
  useEffect(() => {
    if (loadingCompleted && !isLoading && formData && !selectedSegment) {
      console.log("Verificação de segurança para garantir seleção de segmento");
      const defaultSegment = businessSegments[0];
      setSelectedSegment(defaultSegment);
      setTimeout(() => {
        onSelectSegment(defaultSegment);
      }, 300);
    }
  }, [loadingCompleted, isLoading, formData, selectedSegment, onSelectSegment]);

  return (
    <>
      <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
        <FormDialog onSubmit={handleDialogSubmit} isLoading={isLoading} />
      </Dialog>
      
      <SearchFormLoading 
        isLoading={isLoading} 
        onLoadingChange={setIsLoading}
        onComplete={handleLoadingComplete}
        companyName={formData?.nome || ""}
        companyData={formData?.companyData}
      />
    </>
  );
};

export default SearchFormDialogs;
