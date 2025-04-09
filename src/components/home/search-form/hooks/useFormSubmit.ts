
import { useState } from 'react';
import { FormValues } from '../types/companyData';

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormValues, onSuccess?: () => void) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting form with data:', data);
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
