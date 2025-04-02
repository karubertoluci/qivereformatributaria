
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './FormDialog';

// Import the field components
import CompanyFields from './form-fields/CompanyFields';
import PersonalFields from './form-fields/PersonalFields';
import ContactFields from './form-fields/ContactFields';
import SubmitButton from './form-fields/SubmitButton';

interface CompanyInfoFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      cnae: '',
      razaoSocial: '',
      nome: '',
      cargo: '',
      email: '',
      telefone: '',
      desafios: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <CompanyFields form={form} />
        <PersonalFields form={form} />
        <ContactFields form={form} />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
