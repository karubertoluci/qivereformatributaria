
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Building } from 'lucide-react';
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
    <div className="bg-orange-50 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-center mb-2">Para evoluir insira seu CNAE</h2>
      <p className="text-orange-600 text-center mb-6">
        Quando colocar o CNAE vamos carregar os artigos referente ao seu segmento de atuação.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="cnae" className="block mb-2">CNAE:</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        id="cnae"
                        placeholder="Insira o código CNAE"
                        className="border-gray-300 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 transition-colors"
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
      
      <div className="mt-6 text-center">
        <Button 
          variant="link" 
          className="text-gray-600 hover:text-primary transition-colors text-sm"
          onClick={onBrowseBySegment}
        >
          Navegar por segmento
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
