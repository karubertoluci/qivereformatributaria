
// Additional company data that will be fetched from the API
export interface CompanyData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  naturezaJuridica?: string;
}

// Re-export the form values type with company data
import { FormValuesBase } from '../schemas/formSchema';

// Complete form values including company data
export type FormValues = FormValuesBase & {
  companyData?: CompanyData;
};
