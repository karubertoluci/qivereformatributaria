
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentSelector from '@/components/SegmentSelector';
import Results from '@/components/Results';
import { BusinessSegment, businessSegments } from '@/data/segments';
import { Building, Search, Book, FileText, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

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

  const handleBrowseBySegment = () => {
    setShowSegments(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow">
        {!showSegments ? (
          <div className="flex flex-col min-h-[calc(100vh-12rem)]">
            <section className="bg-gradient-to-b from-blue-600 to-blue-800 py-12 md:py-16 px-4 flex-grow">
              <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                    Seja bem-vindo à Reforma Tributária Simplificada
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow">
                    Entenda os impactos da reforma tributária no seu negócio de forma clara e objetiva
                  </p>
                </div>
                
                <Card className="backdrop-blur-sm bg-black/40 border border-white/20 p-6 mb-8 shadow-xl">
                  <p className="text-lg text-center text-white">
                    É importante você saber que o conteúdo aqui é feito utilizando inteligência artificial.
                  </p>
                </Card>
                
                <Card className="backdrop-blur-sm bg-black/40 border border-white/20 p-8 shadow-xl mb-10">
                  <Tabs defaultValue="cnae" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/60">
                      <TabsTrigger value="cnae" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        Buscar por CNAE
                      </TabsTrigger>
                      <TabsTrigger value="segment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        Navegar por Segmento
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="cnae">
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
                                        className="bg-white/10 border-white/20 text-white"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                  <Button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto transition-colors"
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
                            className="bg-white/10 border-white/20 text-white hover:bg-blue-600/40 flex flex-col h-auto py-4 transition-all duration-200 shadow-lg"
                            onClick={handleBrowseBySegment}
                          >
                            {segment.name}
                          </Button>
                        ))}
                      </div>
                      
                      {businessSegments.length > 6 && (
                        <div className="text-center mt-6">
                          <Button 
                            variant="outline" 
                            className="bg-white/10 border-white/20 text-white hover:bg-blue-600/40 transition-all duration-200"
                            onClick={handleBrowseBySegment}
                          >
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Ver todos os segmentos
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                    <Search className="h-10 w-10 mb-3 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Análise Personalizada</h3>
                    <p className="text-sm text-center text-white/80">Receba insights específicos para o seu segmento de atuação</p>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                    <Book className="h-10 w-10 mb-3 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Linguagem Clara</h3>
                    <p className="text-sm text-center text-white/80">Traduzimos o "juridiquês" para uma linguagem fácil de entender</p>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                    <FileText className="h-10 w-10 mb-3 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Impactos Detalhados</h3>
                    <p className="text-sm text-center text-white/80">Identifique oportunidades e desafios para o seu negócio</p>
                  </Card>
                </div>
              </div>
            </section>
            
            <section className="py-12 bg-zinc-900 text-white">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
                    <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Insira seu CNAE</h3>
                    <p className="text-gray-300">Informe o código CNAE da sua empresa para análise personalizada</p>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
                    <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analise os Resultados</h3>
                    <p className="text-gray-300">Veja os artigos relevantes e seus impactos específicos</p>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-sm border-white/20 p-6 rounded-lg shadow-lg text-center">
                    <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Tome Decisões Informadas</h3>
                    <p className="text-gray-300">Planeje-se com base em informações claras e objetivas</p>
                  </Card>
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
