
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileBarChart, Search, Building, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormDialogContext } from './FormDialogContext';
import FormDialog from './search-form/FormDialog';
import LoadingDialog from './search-form/LoadingDialog';
import { businessSegments } from '@/data/segments';

const SearchForm = ({ onCnaeSubmit, onSelectSegment }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('segment');
  const [isLoading, setIsLoading] = React.useState(false);
  const { isFormDialogOpen, openFormDialog, closeFormDialog } = useFormDialogContext();
  
  // Filtrar segmentos com base no termo de busca
  const filteredSegments = businessSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSegmentSelection = (segment) => {
    openFormDialog();
  };

  const handleDialogSubmit = (formData) => {
    // Salvar dados no localStorage para uso posterior
    localStorage.setItem('formData', JSON.stringify(formData));
    
    // Simular carregamento
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      closeFormDialog();
      
      // Selecionar segmento com base no CNAE ou na seleção direta
      if (activeTab === 'cnae') {
        onCnaeSubmit(formData.cnpj || '');
      } else {
        // Encontrar o segmento que corresponde ao CNAE na descrição da empresa ou escolher o primeiro segmento
        const selectedSegment = formData.companyData?.cnaePrincipal?.descricao
          ? businessSegments.find(s => 
              s.keywords.some(k => 
                formData.companyData.cnaePrincipal.descricao.toLowerCase().includes(k.toLowerCase())
              )
            ) || businessSegments[0]
          : filteredSegments[0];
          
        onSelectSegment(selectedSegment);
      }
    }, 2000);
  };

  return (
    <>
      <Card className="bg-white shadow-lg border-gray-200">
        <CardContent className="p-6">
          <Tabs defaultValue="segment" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="segment" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Por Segmento</span>
              </TabsTrigger>
              <TabsTrigger value="cnae" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Por CNAE/CNPJ</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="segment">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Busque por comércio, indústria, serviços..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {filteredSegments.slice(0, 8).map((segment) => (
                  <div 
                    key={segment.id} 
                    className="bg-gray-50 hover:bg-orange-50 border border-gray-200 rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center text-center"
                    onClick={() => handleSegmentSelection(segment)}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                      {segment.icon}
                    </div>
                    <h3 className="font-medium text-sm">{segment.name}</h3>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={openFormDialog}
                className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg"
              >
                <FileBarChart className="mr-2 h-5 w-5" />
                Gerar Relatório Personalizado
              </Button>
            </TabsContent>
            
            <TabsContent value="cnae">
              <div className="space-y-6">
                <p className="text-gray-600">
                  Ao informar o CNPJ da sua empresa, conseguiremos gerar um relatório personalizado com base no seu CNAE principal.
                </p>
                
                <Button 
                  onClick={openFormDialog}
                  className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg"
                >
                  <FileBarChart className="mr-2 h-5 w-5" />
                  Informar dados da minha empresa
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
        <FormDialog onSubmit={handleDialogSubmit} isLoading={isLoading} />
      </Dialog>
      
      <Dialog open={isLoading}>
        <LoadingDialog />
      </Dialog>
    </>
  );
};

export default SearchForm;
