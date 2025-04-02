import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Building, FileText, User, Briefcase, Search } from 'lucide-react';
import { businessSegments, BusinessSegment } from '@/data/segments';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const formSchema = z.object({
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).max(18),
  cnae: z.string().min(2, { message: 'CNAE inválido' }),
  razaoSocial: z.string().min(3, { message: 'Razão social deve ter pelo menos 3 caracteres' }),
  nome: z.string().min(2, { message: 'Por favor, informe seu nome' }),
  cargo: z.string().min(2, { message: 'Por favor, informe seu cargo' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }).optional(),
  desafios: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  onCnaeSubmit: (cnae: string) => void;
  onBrowseBySegment: () => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onCnaeSubmit, onBrowseBySegment, onSelectSegment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  const simulateReportGeneration = () => {
    setShowLoadingDialog(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingDialog(false);
            const segmentId = cnaeToSegmentMap[form.getValues().cnae.substring(0, 2)];
            if (segmentId) {
              const segment = businessSegments.find(seg => seg.id === segmentId);
              if (segment) {
                toast.success(`Relatório para ${form.getValues().razaoSocial} gerado com sucesso!`);
                onSelectSegment(segment);
              }
            } else {
              onCnaeSubmit(form.getValues().cnae);
              toast.success(`Relatório para ${form.getValues().razaoSocial} gerado com sucesso!`);
            }
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleInitialSubmit = () => {
    setShowFullForm(true);
  };

  const handleSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    localStorage.setItem('formData', JSON.stringify(data));
    
    setTimeout(() => {
      setIsLoading(false);
      simulateReportGeneration();
      console.log("Dados capturados:", data);
    }, 1000);
  };

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg p-8 mb-8 border border-orange-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Relatório Personalizado da Reforma Tributária</h2>
        <p className="text-orange-600 text-center text-lg mb-8">
          Gere agora um relatório da Reforma Tributária de forma simplificada e compreenda o que pode impactar sua empresa.
        </p>
        
        {!showFullForm ? (
          <div className="flex flex-col items-center">
            <Button 
              onClick={handleInitialSubmit} 
              className="bg-orange-500 hover:bg-orange-600 transition-colors text-lg py-8 px-10 mb-4 shadow-md"
              size="lg"
            >
              <FileText className="mr-2 h-6 w-6" />
              Gerar relatório personalizado para minha empresa
            </Button>
            <p className="text-sm text-gray-500 mt-2">Relatório gratuito e sem compromisso</p>
            
            <div className="mt-6 text-center">
              <button 
                onClick={onBrowseBySegment}
                className="text-orange-600 underline hover:text-orange-700 transition-colors text-sm cursor-pointer"
              >
                Prefiro navegar por segmento
              </button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="cnpj" className="block mb-2 font-medium">CNPJ da empresa:</Label>
                      <FormControl>
                        <Input
                          id="cnpj"
                          placeholder="XX.XXX.XXX/XXXX-XX"
                          className="border-gray-300 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cnae"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="cnae" className="block mb-2 font-medium">CNAE:</Label>
                      <FormControl>
                        <Input
                          id="cnae"
                          placeholder="Código CNAE"
                          className="border-gray-300 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="razaoSocial"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="razaoSocial" className="block mb-2 font-medium">Razão Social:</Label>
                    <FormControl>
                      <Input
                        id="razaoSocial"
                        placeholder="Nome da sua empresa"
                        className="border-gray-300 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="nome" className="block mb-2 font-medium">Seu nome:</Label>
                      <FormControl>
                        <Input
                          id="nome"
                          placeholder="Seu nome completo"
                          className="border-gray-300 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="cargo" className="block mb-2 font-medium">Seu cargo:</Label>
                      <FormControl>
                        <Input
                          id="cargo"
                          placeholder="Ex: Diretor Financeiro, CEO, etc."
                          className="border-gray-300 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="block mb-2 font-medium">E-mail corporativo:</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.email@empresa.com.br"
                        className="border-gray-300 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="telefone" className="block mb-2 font-medium">Telefone (opcional):</Label>
                    <FormControl>
                      <Input
                        id="telefone"
                        placeholder="(XX) XXXXX-XXXX"
                        className="border-gray-300 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="desafios"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="desafios" className="block mb-2 font-medium">Quais são suas maiores dúvidas sobre a reforma tributária? (opcional)</Label>
                    <FormControl>
                      <Textarea
                        id="desafios"
                        placeholder="Conte-nos quais aspectos da reforma tributária mais preocupam sua empresa..."
                        className="border-gray-300 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 transition-colors w-full py-6"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Gerar meu relatório personalizado
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Ao clicar em "Gerar meu relatório personalizado", você concorda com nossa política de privacidade 
                  e permite que entremos em contato para apresentar soluções.
                </p>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setShowFullForm(false)}
                  className="text-orange-600 underline hover:text-orange-700 transition-colors text-sm cursor-pointer"
                >
                  Voltar
                </button>
              </div>
            </form>
          </Form>
        )}
        
        <Dialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Gerando seu relatório personalizado</DialogTitle>
              <DialogDescription>
                Estamos analisando os impactos da reforma tributária para sua empresa.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="mb-4">
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium flex items-center">
                  <span className={`mr-2 ${loadingProgress >= 20 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  Identificando seu segmento de atuação
                </p>
                <p className="text-sm font-medium flex items-center">
                  <span className={`mr-2 ${loadingProgress >= 40 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  Analisando artigos relevantes para {form.getValues().razaoSocial}
                </p>
                <p className="text-sm font-medium flex items-center">
                  <span className={`mr-2 ${loadingProgress >= 60 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  Calculando impacto dos artigos no seu negócio
                </p>
                <p className="text-sm font-medium flex items-center">
                  <span className={`mr-2 ${loadingProgress >= 80 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  Personalizando recomendações
                </p>
                <p className="text-sm font-medium flex items-center">
                  <span className={`mr-2 ${loadingProgress >= 100 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  Finalizando seu relatório
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchForm;
