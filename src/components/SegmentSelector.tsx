
import React from 'react';
import { businessSegments, BusinessSegment } from '@/data/segments';
import { 
  Building, 
  Store, 
  Factory, 
  Briefcase, 
  Leaf, 
  BarChart, 
  Stethoscope, 
  GraduationCap, 
  Banknote, 
  Truck,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SegmentSelectorProps {
  onSelectSegment: (segment: BusinessSegment) => void;
  onBackToHome: () => void;
}

const segmentIcons: Record<string, React.ReactNode> = {
  "comercio_varejo": <Store className="h-6 w-6" />,
  "industria": <Factory className="h-6 w-6" />,
  "servicos": <Briefcase className="h-6 w-6" />,
  "agronegocio": <Leaf className="h-6 w-6" />,
  "construcao": <Building className="h-6 w-6" />,
  "tecnologia": <BarChart className="h-6 w-6" />,
  "saude": <Stethoscope className="h-6 w-6" />,
  "educacao": <GraduationCap className="h-6 w-6" />,
  "financeiro": <Banknote className="h-6 w-6" />,
  "transporte": <Truck className="h-6 w-6" />,
};

const SegmentSelector: React.FC<SegmentSelectorProps> = ({ onSelectSegment, onBackToHome }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-secondary"
          onClick={onBackToHome}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para página inicial
        </Button>
      </div>
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Selecione seu Segmento de Atuação</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Para analisarmos os impactos da reforma tributária específicos para o seu negócio,
          escolha o segmento que melhor representa a sua empresa.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSegments.map((segment) => (
          <div 
            key={segment.id} 
            className="border rounded-lg p-6 cursor-pointer bg-white hover:border-primary transition-all"
            onClick={() => onSelectSegment(segment)}
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {segmentIcons[segment.id]}
              {segment.name}
            </h3>
            <p className="text-gray-600 mb-6">{segment.description}</p>
            <button 
              className="bg-primary text-white w-full py-3 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => onSelectSegment(segment)}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentSelector;
