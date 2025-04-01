
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Building, LayoutGrid } from 'lucide-react';
import { businessSegments, BusinessSegment } from '@/data/segments';

// Map of CNAE codes to business segment IDs
// This is a simplified example - in a real application, this would be more comprehensive
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
    
    // Get first two digits of CNAE to identify the segment
    const cnaeDivision = data.cnae.substring(0, 2);
    const segmentId = cnaeToSegmentMap[cnaeDivision];
    
    if (segmentId) {
      // Find the segment that corresponds to this CNAE
      const segment = businessSegments.find(seg => seg.id === segmentId);
      if (segment) {
        toast.success(`CNAE ${data.cnae} identificado como ${segment.name}`);
        onSelectSegment(segment);
      } else {
        // This shouldn't happen if our map and segments are aligned
        onCnaeSubmit(data.cnae);
        toast.success(`CNAE ${data.cnae} selecionado com sucesso!`);
      }
    } else {
      // If no mapping found, just proceed with the CNAE
      onCnaeSubmit(data.cnae);
      toast.info(`CNAE ${data.cnae} não foi mapeado automaticamente para um segmento específico.`);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-black/40 border border-white/20 p-8 shadow-xl mb-10">
      <Tabs defaultValue="cnae" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/60">
          <TabsTrigger value="cnae" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
            Buscar por CNAE
          </TabsTrigger>
          <TabsTrigger value="segment" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
            Navegar por Segmento
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cnae">
          <h2 className="text-2xl font-bold mb-4 text-center">Para evoluir insira seu CNAE</h2>
          <p className="mb-6 text-center">Quando colocar o CNAE vamos carregar os artigos referente ao seu segmento de atuação.</p>
          
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
                            className="bg-white/10 border-white/20 text-white"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto transition-colors"
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
          <p className="mb-6 text-center">Escolha um setor para ver os impactos da reforma tributária específicos para esta área.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {businessSegments.slice(0, 6).map((segment) => (
              <Button 
                key={segment.id}
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex flex-col h-auto py-4 transition-all duration-200 shadow-lg"
                onClick={onBrowseBySegment}
              >
                {segment.name}
              </Button>
            ))}
          </div>
          
          {businessSegments.length > 6 && (
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                onClick={onBrowseBySegment}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
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
