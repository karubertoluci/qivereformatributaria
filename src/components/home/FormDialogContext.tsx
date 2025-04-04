
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface FormDialogContextType {
  isFormDialogOpen: boolean;
  openFormDialog: () => void;
  closeFormDialog: () => void;
}

const FormDialogContext = createContext<FormDialogContextType | undefined>(undefined);

export const useFormDialogContext = () => {
  const context = useContext(FormDialogContext);
  if (context === undefined) {
    throw new Error('useFormDialogContext must be used within a FormDialogProvider');
  }
  return context;
};

interface FormDialogProviderProps {
  children: ReactNode;
}

export const FormDialogProvider: React.FC<FormDialogProviderProps> = ({ children }) => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const openFormDialog = () => setIsFormDialogOpen(true);
  const closeFormDialog = () => setIsFormDialogOpen(false);
  
  // Listen for custom event to open dialog from anywhere
  useEffect(() => {
    const handleOpenFormDialog = () => {
      openFormDialog();
    };
    
    document.addEventListener('openFormDialog', handleOpenFormDialog);
    
    return () => {
      document.removeEventListener('openFormDialog', handleOpenFormDialog);
    };
  }, []);

  return (
    <FormDialogContext.Provider value={{ isFormDialogOpen, openFormDialog, closeFormDialog }}>
      {children}
    </FormDialogContext.Provider>
  );
};
