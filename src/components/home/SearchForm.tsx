
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileBarChart, Search, Building, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormDialogContext } from './FormDialogContext';
import FormDialog from './search-form/FormDialog';
import ReportLoadingDialog from './search-form/ReportLoadingDialog';
import { businessSegments, BusinessSegment } from '@/data/segments';

interface SegmentWithUI extends BusinessSegment {
  icon?: React.ReactNode;
  keywords?: string[]; // Make keywords optional with a default fallback
}

const getSegmentKeywords = (segment: SegmentWithUI): string[] => {
  return segment.keywords || [segment.name.toLowerCase()];
};

interface SearchFormProps {
  onCnaeSubmit: (cnae: string) => void;
  onSelectSegment: (segment: BusinessSegment | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onCnaeSubmit, onSelectSegment }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('segment');
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  const [formData, setFormData] = React.useState<any>(null);
  const { isFormDialogOpen, openFormDialog, closeFormDialog } = useFormDialogContext();
  
  console.log("Estado do modal no SearchForm:", isFormDialogOpen);
  console.log("Estado do loading no SearchForm:", isLoading);
  
  const filteredSegments = businessSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getSegmentKeywords(segment as SegmentWithUI).some(keyword => 
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSegmentSelection = (segment: BusinessSegment) => {
    console.log("Segmento selecionado, abrindo modal");
    openFormDialog();
  };

  const handleDialogSubmit = (formData: any) => {
    console.log("Form dialog submitted with data:", formData);
    
    localStorage.setItem('formData', JSON.stringify(formData));
    
    setFormData(formData);
    
    // Primeiro fechamos o modal do formulário
    closeFormDialog();
    
    // Depois de um pequeno delay, abrimos o modal de carregamento
    setTimeout(() => {
      setIsLoading(true);
      console.log("Iniciando carregamento do relatório");
    }, 300);
  };
  
  const handleLoadingComplete = () => {
    setLoadingCompleted(true);
    setIsLoading(false); // Certifique-se de fechar o modal de carregamento
    
    if (activeTab === 'cnae' && formData?.companyData?.cnaePrincipal?.codigo) {
      console.log("Usando CNAE para submissão:", formData.companyData.cnaePrincipal.codigo);
      onCnaeSubmit(formData.companyData.cnaePrincipal.codigo);
    } else {
      const selectedSegment = formData?.companyData?.cnaePrincipal?.descricao
        ? businessSegments.find(s => 
            getSegmentKeywords(s as SegmentWithUI).some(k => 
              formData.companyData.cnaePrincipal.descricao.toLowerCase().includes(k.toLowerCase())
            )
          ) || businessSegments[0]
        : filteredSegments[0];
        
      console.log("Selecionando segmento:", selectedSegment);
      onSelectSegment(selectedSegment);
    }
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
                      {(segment as SegmentWithUI).icon || <Building className="h-6 w-6 text-orange-500" />}
                    </div>
                    <h3 className="font-medium text-sm">{segment.name}</h3>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => {
                  console.log("Botão de gerar relatório clicado");
                  openFormDialog();
                }}
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
                  onClick={() => {
                    console.log("Botão de informar dados clicado");
                    openFormDialog();
                  }}
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

      <Dialog open={isFormDialogOpen} onOpenChange={(open) => {
        if (!open) closeFormDialog();
      }}>
        <FormDialog 
          onSubmit={handleDialogSubmit} 
          isLoading={false} 
          open={isFormDialogOpen}
          onOpenChange={(open) => {
            if (!open) closeFormDialog();
          }}
        />
      </Dialog>
      
      {/* Garante que o modal de carregamento esteja sempre aberto quando isLoading é true */}
      <ReportLoadingDialog 
        open={isLoading}
        onOpenChange={(open) => {
          if (!open && !loadingCompleted) setIsLoading(false);
        }}
        onComplete={handleLoadingComplete}
        companyName={formData?.nome || ""}
        companyData={formData?.companyData}
      />
    </>
  );
};

export default SearchForm;
