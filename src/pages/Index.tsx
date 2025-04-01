
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentSelector from '@/components/SegmentSelector';
import Results from '@/components/Results';
import { BusinessSegment } from '@/data/segments';
import { Building, Search, Book, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);
  const [cnae, setCnae] = useState<string>('');
  const [showSegments, setShowSegments] = useState<boolean>(false);
  
  const form = useForm({
    defaultValues: {
      cnae: '',
    },
  });

  const handleSelectSegment = (segment: BusinessSegment) => {
    setSelectedSegment(segment);
  };

  const handleBackToSegments = () => {
    setSelectedSegment(null);
  };

  const handleSubmitCnae = (data: { cnae: string }) => {
    if (!data.cnae || data.cnae.trim() === '') {
      toast.error('Por favor, insira um CNAE válido.');
      return;
    }
    
    setCnae(data.cnae);
    setShowSegments(true);
    toast.success(`CNAE ${data.cnae} selecionado com sucesso!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {!showSegments ? (
          <div className="flex flex-col min-h-[calc(100vh-12rem)]">
            <section className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-12 md:py-16 px-4 flex-grow">
              <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    Seja bem-vindo à Reforma Tributária Simplificada
                  </h1>
                  <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
                    Entenda os impactos da reforma tributária no seu negócio de forma clara e objetiva
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg">
                  <p className="text-lg text-center">
                    É importante você saber que o conteúdo aqui é feito utilizando inteligência artificial.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-10">
                  <h2 className="text-2xl font-bold mb-4 text-center">Para evoluir insira seu CNAE</h2>
                  <p className="mb-6 text-center">Quando colocar o CNAE vamos carregar os artigos referente ao seu segmento de atuação.</p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitCnae)} className="space-y-4">
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
                                    className="bg-white/80 text-black"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <Button 
                                type="submit" 
                                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
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
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <Search className="h-10 w-10 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Análise Personalizada</h3>
                    <p className="text-sm text-center">Receba insights específicos para o seu segmento de atuação</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <Book className="h-10 w-10 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Linguagem Clara</h3>
                    <p className="text-sm text-center">Traduzimos o "juridiquês" para uma linguagem fácil de entender</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <FileText className="h-10 w-10 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Impactos Detalhados</h3>
                    <p className="text-sm text-center">Identifique oportunidades e desafios para o seu negócio</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Insira seu CNAE</h3>
                    <p className="text-gray-600">Informe o código CNAE da sua empresa para análise personalizada</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analise os Resultados</h3>
                    <p className="text-gray-600">Veja os artigos relevantes e seus impactos específicos</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Tome Decisões Informadas</h3>
                    <p className="text-gray-600">Planeje-se com base em informações claras e objetivas</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : !selectedSegment ? (
          <SegmentSelector onSelectSegment={handleSelectSegment} />
        ) : (
          <Results segment={selectedSegment} onBackToSegments={handleBackToSegments} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
