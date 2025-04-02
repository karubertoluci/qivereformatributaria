
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './FormDialog';

// Import the field components
import CNPJField from './form-fields/CNPJField';
import PersonalFields from './form-fields/PersonalFields';
import ContactFields from './form-fields/ContactFields';
import AccountField from './form-fields/AccountField';
import SubmitButton from './form-fields/SubmitButton';

interface CompanyInfoFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      cargo: '',
      email: '',
      telefone: '',
      cnpj: '',
      possuiContaQive: false,
    },
  });

  // Handle form submit with any additional company data
  const handleSubmit = (data: FormValues) => {
    // Get additional company data from localStorage if available
    const companyDataStr = localStorage.getItem('companyData');
    
    if (companyDataStr) {
      const companyData = JSON.parse(companyDataStr);
      // Merge form data with additional company data
      onSubmit({
        ...data,
        companyData, // This won't be part of the form schema, but will be available in the onSubmit handler
      });
    } else {
      onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
        <CNPJField form={form} />
        <PersonalFields form={form} />
        <ContactFields form={form} />
        <AccountField form={form} />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
