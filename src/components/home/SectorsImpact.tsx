
import React from 'react';
import { 
  Store, 
  Building2, 
  Briefcase, 
  BarChart4, 
  HeartPulse, 
  GraduationCap, 
  Banknote, 
  Truck 
} from 'lucide-react';
import { useFormDialogContext } from './FormDialogContext';

interface SectorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectorCard: React.FC<SectorCardProps> = ({ icon, title, description }) => {
  const { openFormDialog } = useFormDialogContext();
  
  return (
    <div className="flex flex-col items-center max-w-[150px] mx-2">
      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-center font-bold mb-2 text-sm">{title}</h3>
      <p className="text-xs text-center text-gray-700 mb-3">
        {description}
      </p>
      <button 
        onClick={openFormDialog}
        className="text-xs text-orange-600 hover:text-orange-700 font-medium"
      >
        Saiba mais →
      </button>
    </div>
  );
};

const SectorsImpact = () => {
  const sectors = [
    {
      icon: <Store className="h-6 w-6 text-orange-500" />,
      title: "Comércio e Varejo",
      description: "Impacto nas alíquotas e fim da cumulatividade dos tributos, com redução da carga tributária em produtos essenciais."
    },
    {
      icon: <Building2 className="h-6 w-6 text-orange-500" />,
      title: "Indústria",
      description: "Simplificação do sistema e recuperação de créditos em toda cadeia produtiva, eliminando a tributação em cascata."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-orange-500" />,
      title: "Prestação de Serviços",
      description: "Mudanças significativas com a substituição do ISS pelo IBS, com regras e transição especiais para o setor."
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-orange-500" />,
      title: "Tecnologia",
      description: "Maior segurança jurídica e possibilidade de aproveitamento de créditos de bens e serviços utilizados na operação."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-orange-500" />,
      title: "Saúde",
      description: "Tratamento diferenciado para medicamentos e serviços essenciais, com possível redução de custos ao consumidor final."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-orange-500" />,
      title: "Educação",
      description: "Regime específico com alíquotas diferenciadas e regras especiais para instituições de ensino."
    },
    {
      icon: <Banknote className="h-6 w-6 text-orange-500" />,
      title: "Serviços Financeiros",
      description: "Nova metodologia de tributação para operações financeiras, com impacto direto nos custos de transação bancária."
    },
    {
      icon: <Truck className="h-6 w-6 text-orange-500" />,
      title: "Transporte e Logística",
      description: "Mudanças na tributação interestadual e maior clareza para operações de transporte com o princípio do destino."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Setores impactos pela reforma</h2>
        
        <p className="text-lg text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          A Reforma Tributária traz mudanças específicas para diferentes setores da 
          economia. Conheça os principais impactos no seu segmento de atuação.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {sectors.map((sector, index) => (
            <SectorCard 
              key={index}
              icon={sector.icon}
              title={sector.title}
              description={sector.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsImpact;
