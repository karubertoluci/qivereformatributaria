
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
  
  console.log("Estado do modal no SearchForm:", isFormDialogOpen);
  
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
      throw error;
    }
  };
  
  const simulateReportGeneration = async (data: FormValues) => {
    setShowLoadingDialog(true);
    setLoadingProgress(0);
    let cnaeCode = '';
    let companyInfo: CompanyData | undefined = undefined;
    setCompanyName(data.nome);
    
    const stages = [
      { progress: 5, delay: 500 }, // Inicio
      { progress: 20, delay: 1000 }, // Após buscar CNPJ
      { progress: 40, delay: 800 }, // Após identificar CNAE
      { progress: 60, delay: 1200 }, // Analisando impactos
      { progress: 95, delay: 1500 }, // Relatório pronto
      { progress: 100, delay: 2000 } // Delay adicional antes de redirecionar
    ];
    
    const processStage = async (index: number) => {
      if (index >= stages.length) {
        setTimeout(() => {
          setShowLoadingDialog(false);
          const formDataWithCompanyInfo = {
            ...data,
            ...companyInfo
          };
          localStorage.setItem('formData', JSON.stringify(formDataWithCompanyInfo));
          
          if (cnaeCode) {
            const segmentId = cnaeToSegmentMap[cnaeCode];
            if (segmentId) {
              const segment = businessSegments.find(seg => seg.id === segmentId);
              if (segment) {
                toast.success(`Relatório para ${companyInfo?.razaoSocial || data.nome} gerado com sucesso!`);
                onSelectSegment(segment);
                return;
              }
            }
          }
          
          const defaultSegment = businessSegments[0];
          toast.success(`Relatório para ${companyInfo?.razaoSocial || data.nome} gerado com sucesso!`);
          onSelectSegment(defaultSegment);
        }, 500);
        return;
      }
      
      const stage = stages[index];
      setLoadingProgress(stage.progress);
      
      if (index === 0) {
        try {
          companyInfo = await fetchCompanyData(data.cnpj);
          if (companyInfo) {
            setCompanyData(companyInfo);
            setCompanyName(companyInfo.razaoSocial || data.nome);
            if (companyInfo.cnaePrincipal) {
              cnaeCode = companyInfo.cnaePrincipal.codigo.substring(0, 2);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar dados do CNPJ:", error);
          toast.error("Não foi possível obter dados detalhados do CNPJ");
        }
      }
      
      setTimeout(() => {
        processStage(index + 1);
      }, stage.delay);
    };
    
    processStage(0);
  };
  
  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setCompanyName(data.nome);
    localStorage.setItem('formData', JSON.stringify(data));
    
    setTimeout(() => {
      setIsLoading(false);
      simulateReportGeneration(data);
      closeFormDialog();
    }, 500);
  };
  
  return (
    <>
      {/* Diálogo de formulário */}
      <Dialog open={isFormDialogOpen} onOpenChange={(open) => {
        if (!open) closeFormDialog();
      }}>
        <FormDialog onSubmit={handleSubmit} isLoading={isLoading} />
      </Dialog>
      
      {/* Diálogo de carregamento */}
      <Dialog open={showLoadingDialog} onOpenChange={(open) => {
        if (!open) setShowLoadingDialog(false);
      }}>
        <LoadingDialog 
          open={showLoadingDialog} 
          onOpenChange={setShowLoadingDialog} 
          progress={loadingProgress} 
          companyName={companyName} 
        />
      </Dialog>
    </>
  );
};

export default SearchForm;
