
import React from 'react';
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
  const [formData, setFormData] = React.useState<FormValues | null>(null);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  
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
    }, 300);
  };
  
  const handleLoadingComplete = () => {
    setLoadingCompleted(true);
    setIsLoading(false);
    console.log("SearchFormDialogs: Loading completed");
    
    // Redirect to results section by selecting the segment
    if (formData?.companyData?.cnaePrincipal?.descricao) {
      // Try to find a matching segment based on CNAE description
      // Find a segment that may be related to the company's CNAE
      // This is a simplified approach - in a real app, you might have a more sophisticated mapping
      const descLower = formData.companyData.cnaePrincipal.descricao.toLowerCase();
      const foundSegment = businessSegments.find(segment => 
        descLower.includes(segment.name.toLowerCase())
      ) || businessSegments[0]; // Default to first segment if no match
      
      console.log("Selecting segment after loading:", foundSegment);
      toast.success(`Relatório para ${formData.companyData?.nomeFantasia || formData.companyData?.razaoSocial || "empresa"} está pronto!`);
      
      // Important: Call the onSelectSegment callback to trigger the segment selection
      setTimeout(() => {
        onSelectSegment(foundSegment);
      }, 500);
    } else {
      // If no CNAE description is available, default to the first segment
      toast.success("Relatório está pronto!");
      setTimeout(() => {
        onSelectSegment(businessSegments[0]);
      }, 500);
    }
  };

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
