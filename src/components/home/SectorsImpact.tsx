
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Store, Briefcase, Building, BarChart4, HeartPulse, GraduationCap, Banknote, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormDialogContext } from './FormDialogContext';
import { businessSegments } from '@/data/segments';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface SectorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onLearnMore: () => void;
}

const SectorCard: React.FC<SectorCardProps> = ({ icon, title, description, onLearnMore }) => (
  <Card className="border border-orange-100 shadow-sm hover:shadow-md transition-shadow h-full bg-gradient-to-br from-orange-50/50 to-white">
    <CardContent className="p-6 flex flex-col items-center h-full">
      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-center">{title}</h3>
      <p className="text-gray-700 text-center mb-4">
        {description}
      </p>
      <div className="mt-auto pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLearnMore}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
        >
          Saiba mais →
        </Button>
      </div>
    </CardContent>
  </Card>
);

const SectorsImpact = () => {
  const { openFormDialog } = useFormDialogContext();
  
  const sectors = [
    {
      icon: <Store className="h-8 w-8 text-orange-500" />,
      title: "Comércio e Varejo",
      description: "Impacto nas alíquotas e fim da cumulatividade dos tributos, com potencial redução da carga tributária em produtos essenciais.",
      segmentId: "comercio_varejo"
    },
    {
      icon: <Building className="h-8 w-8 text-orange-500" />,
      title: "Indústria",
      description: "Simplificação do sistema e recuperação de créditos em toda cadeia produtiva, eliminando a tributação em cascata.",
      segmentId: "industria"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-orange-500" />,
      title: "Prestação de Serviços",
      description: "Mudanças significativas com a substituição do ISS pelo IBS, com regras de transição especiais para o setor.",
      segmentId: "servicos"
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-orange-500" />,
      title: "Tecnologia",
      description: "Maior segurança jurídica e possibilidade de aproveitamento de créditos de bens e serviços utilizados na operação.",
      segmentId: "tecnologia"
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-orange-500" />,
      title: "Saúde",
      description: "Tratamento diferenciado para medicamentos e serviços essenciais, com possível redução de custos ao consumidor final.",
      segmentId: "saude"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-orange-500" />,
      title: "Educação",
      description: "Regime específico com alíquotas diferenciadas e regras especiais para instituições de ensino.",
      segmentId: "educacao"
    },
    {
      icon: <Banknote className="h-8 w-8 text-orange-500" />,
      title: "Serviços Financeiros",
      description: "Nova metodologia de tributação para operações financeiras, com impacto direto nos custos de transação bancária.",
      segmentId: "financeiro"
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: "Transporte e Logística",
      description: "Mudanças na tributação interestadual e maior clareza para operações de transporte com o princípio do destino.",
      segmentId: "transporte"
    }
  ];

  const handleLearnMore = () => {
    openFormDialog();
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4">Setores Impactados pela Reforma</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <p className="text-lg text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          A Reforma Tributária traz mudanças específicas para diferentes setores da economia. 
          Conheça os principais impactos no seu segmento de atuação.
        </p>
        
        {/* Carousel for all screen sizes */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {sectors.map((sector, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <SectorCard 
                  icon={sector.icon}
                  title={sector.title}
                  description={sector.description}
                  onLearnMore={handleLearnMore}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative left-0 right-auto transform-none" />
            <div className="flex gap-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-orange-500' : 'bg-gray-300'}`} />
              ))}
            </div>
            <CarouselNext className="relative right-0 left-auto transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default SectorsImpact;
