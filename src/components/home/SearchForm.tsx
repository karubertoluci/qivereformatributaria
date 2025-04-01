
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { 
  Building, 
  Store, 
  Factory, 
  Briefcase, 
  Leaf, 
  BarChart, // Changed from ChartBar to BarChart as it's correct in lucide-react
  Stethoscope, // Changed from Hospital to Stethoscope as it's more recognizable for health
  GraduationCap, 
  Banknote, 
  Truck 
} from 'lucide-react';
import { businessSegments, BusinessSegment } from '@/data/segments';

const cnaeToSegmentMap: Record<string, string> = {
  "47": "comercio_varejo",    // Comércio varejista
  "10": "industria",          // Indústria de alimentos
  "62": "tecnologia",         // Desenvolvimento de software
  "01": "agronegocio",        // Agricultura
  "41": "construcao",         // Construção de edifícios
  "85": "educacao",           // Educação
  "86": "saude",              // Atividades de atenção à saúde humana
  "64": "financeiro",         // Serviços financeiros
  "49": "transporte",         // Transporte terrestre
  "56": "servicos"            // Serviços de alimentação
};

const segmentIcons: Record<string, React.ReactNode> = {
  "comercio_varejo": <Store className="h-5 w-5" />,
  "industria": <Factory className="h-5 w-5" />,
  "servicos": <Briefcase className="h-5 w-5" />,
  "agronegocio": <Leaf className="h-5 w-5" />,
  "construcao": <Building className="h-5 w-5" />,
  "tecnologia": <BarChart className="h-5 w-5" />,
  "saude": <Stethoscope className="h-5 w-5" />,
  "educacao": <GraduationCap className="h-5 w-5" />,
  "financeiro": <Banknote className="h-5 w-5" />,
  "transporte": <Truck className="h-5 w-5" />,
};

interface SearchFormProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onCnaeSubmit, onBrowseBySegment, onSelectSegment }) => {
  const form = useForm({
    defaultValues: {
      cnae: '',
    },
  });

  const handleSubmit = (data: { cnae: string }) => {
    if (!data.cnae || data.cnae.trim() === '') {
      toast.error('Por favor, insira um CNAE válido.');
      return;
    }
    
    const cnaeDivision = data.cnae.substring(0, 2);
    const segmentId = cnaeToSegmentMap[cnaeDivision];
    
    if (segmentId) {
      const segment = businessSegments.find(seg => seg.id === segmentId);
      if (segment) {
        toast.success(`CNAE ${data.cnae} identificado como ${segment.name}`);
        onSelectSegment(segment);
      } else {
        onCnaeSubmit(data.cnae);
        toast.success(`CNAE ${data.cnae} selecionado com sucesso!`);
      }
    } else {
      onCnaeSubmit(data.cnae);
      toast.info(`CNAE ${data.cnae} não foi mapeado automaticamente para um segmento específico.`);
    }
  };

  return (
    <Card className="card-gradient p-6 shadow-xl mb-8">
      <Tabs defaultValue="cnae" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/60">
          <TabsTrigger value="cnae" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Buscar por CNAE
          </TabsTrigger>
          <TabsTrigger value="segment" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Navegar por Segmento
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cnae">
          <h2 className="text-2xl font-bold mb-4 text-center">Para evoluir insira seu CNAE</h2>
          <p className="highlighted-text text-center mb-4">
            Quando colocar o CNAE vamos carregar os artigos referente ao seu segmento de atuação.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cnae"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-3 sm:flex-row items-end">
                      <div className="flex-1">
                        <Label htmlFor="cnae" className="text-left block mb-2">CNAE:</Label>
                        <FormControl>
                          <Input
                            id="cnae"
                            placeholder="Insira o código CNAE"
                            className="bg-white border-primary/20 focus-visible:ring-primary"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <Button 
                        type="submit" 
                        className="transition-colors"
                      >
                        <Building className="mr-2 h-4 w-4" />
                        Buscar por CNAE
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="segment">
          <h2 className="text-2xl font-bold mb-4 text-center">Navegue por segmento de atuação</h2>
          <p className="highlighted-text text-center mb-6">
            Escolha um setor para ver os impactos da reforma tributária específicos para esta área.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {businessSegments.slice(0, 6).map((segment) => (
              <Button 
                key={segment.id}
                variant="outline" 
                className="bg-white hover:bg-primary/10 border-primary/20 text-foreground hover:text-primary flex flex-col h-auto py-4 transition-all duration-200 shadow-sm"
                onClick={() => onSelectSegment(segment)}
              >
                <span className="text-xl mb-1">
                  {segmentIcons[segment.id] || segment.id}
                </span>
                <span className="mt-1">{segment.name}</span>
              </Button>
            ))}
          </div>
          
          {businessSegments.length > 6 && (
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                className="bg-white border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                onClick={onBrowseBySegment}
              >
                Ver todos os segmentos
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SearchForm;
