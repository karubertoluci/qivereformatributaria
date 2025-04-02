import React, { useState } from 'react';
import { toast } from 'sonner';
import { businessSegments, BusinessSegment } from '@/data/segments';
import SearchFormButton from './SearchFormButton';
import FormDialog, { FormValues } from './FormDialog';
import LoadingDialog from './LoadingDialog';
import { cnaeToSegmentMap } from './utils';
import { Dialog } from '@/components/ui/dialog';
import { useFormDialogContext } from '../FormDialogContext';
import { fetchCNPJData } from '@/services/brasilApi';
interface SearchFormProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}
interface CompanyData {
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
const SearchForm: React.FC<SearchFormProps> = ({
  onCnaeSubmit,
  onBrowseBySegment,
  onSelectSegment
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [companyData, setCompanyData] = useState<CompanyData | undefined>(undefined);
  const {
    isFormDialogOpen,
    closeFormDialog
  } = useFormDialogContext();
  const fetchCompanyData = async (cnpj: string) => {
    try {
      const data = await fetchCNPJData(cnpj);
      return {
        cnpj: data.cnpj,
        razaoSocial: data.razao_social,
        nomeFantasia: data.nome_fantasia,
        endereco: `${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}`,
        cnaePrincipal: {
          codigo: data.cnae_fiscal.toString(),
          descricao: data.cnae_fiscal_descricao
        },
        cnaeSecundarios: data.cnaes_secundarios,
        situacaoCadastral: data.situacao_cadastral,
        naturezaJuridica: data.natureza_juridica
      };
    } catch (error) {
      console.error('Erro ao buscar dados do CNPJ:', error);
      return undefined;
    }
  };
  const simulateReportGeneration = async (data: FormValues) => {
    setShowLoadingDialog(true);
    setLoadingProgress(0);
    let cnaeCode = '';
    let companyInfo: CompanyData | undefined = undefined;
    const interval = setInterval(async () => {
      setLoadingProgress(prev => {
        const newProgress = prev + 10;

        // Quando chegar a 20%, tenta buscar os dados da empresa
        if (prev === 10 && newProgress === 20) {
          fetchCompanyData(data.cnpj).then(result => {
            if (result) {
              setCompanyData(result);
              setCompanyName(result.razaoSocial || '');
              companyInfo = result;

              // Extrai o CNAE principal para usar na seleção do segmento
              if (result.cnaePrincipal) {
                cnaeCode = result.cnaePrincipal.codigo.substring(0, 2);
              }
            }
          });
        }
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingDialog(false);

            // Salva os dados da empresa obtidos da API
            const formDataWithCompanyInfo = {
              ...data,
              ...companyInfo
            };
            localStorage.setItem('formData', JSON.stringify(formDataWithCompanyInfo));

            // Tenta identificar o segmento pelo CNAE
            if (cnaeCode) {
              const segmentId = cnaeToSegmentMap[cnaeCode];
              if (segmentId) {
                const segment = businessSegments.find(seg => seg.id === segmentId);
                if (segment) {
                  toast.success(`Relatório para ${companyInfo?.razaoSocial || data.nome} gerado com sucesso!`);
                  onSelectSegment(segment);
                  return newProgress;
                }
              }
            }

            // Se não encontrou segmento específico, usa o CNAE informado
            onCnaeSubmit(cnaeCode || data.cnpj.substring(0, 2));
            toast.success(`Relatório para ${companyInfo?.razaoSocial || data.nome} gerado com sucesso!`);
          }, 500);
        }
        return newProgress;
      });
    }, 600); // Intervalo maior para dar tempo de buscar os dados da API
  };
  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setCompanyName(data.nome);

    // Salva os dados do formulário
    localStorage.setItem('formData', JSON.stringify(data));
    setTimeout(() => {
      setIsLoading(false);
      simulateReportGeneration(data);
      console.log("Dados capturados:", data);
      closeFormDialog();
    }, 1000);
  };
  return <div className="bg-orange-50 rounded-lg shadow-lg p-8 mb-8 border border-orange-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Relatório Personalizado da Reforma Tributária</h2>
        <p className="text-orange-600 text-center text-lg mb-8">
          Gere agora um relatório da Reforma Tributária de forma simplificada e compreenda o que pode impactar sua empresa.
        </p>
        
        <div className="flex flex-col items-center">
          <SearchFormButton />
          
          <p className="text-sm text-gray-500 mt-2">Relatório gratuito e sem compromisso</p>
          
          <div className="mt-6 text-center">
            
          </div>
        </div>
        
        <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
          <FormDialog onSubmit={handleSubmit} isLoading={isLoading} />
        </Dialog>
        
        <LoadingDialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog} progress={loadingProgress} companyName={companyName} companyData={companyData} />
      </div>
    </div>;
};
export default SearchForm;