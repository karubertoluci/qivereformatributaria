
import React from 'react';
import { Book, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-black border-b border-white/10 py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Book size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">LegiScanAR</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <Info size={16} className="mr-2" /> Sobre a Reforma
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
              <div className="p-4">
                <h3 className="font-bold mb-2">Reforma Tributária 2025</h3>
                <p className="text-sm mb-2">
                  A reforma tributária brasileira de 2025 é a maior mudança no sistema tributário nacional das últimas décadas, 
                  com base na Emenda Constitucional 132/2023 e regulamentada pela Lei Complementar 214/2024.
                </p>
                <p className="text-sm mb-2">
                  Principais mudanças:
                </p>
                <ul className="text-xs space-y-1 mb-2">
                  <li>• Criação da CBS (federal) substituindo PIS e COFINS</li>
                  <li>• Criação do IBS (estadual/municipal) substituindo ICMS e ISS</li>
                  <li>• Sistema de crédito amplo e não cumulativo</li>
                  <li>• Período de transição gradual de 8 anos</li>
                  <li>• Adoção do princípio do destino para tributação</li>
                </ul>
                <p className="text-xs font-medium">
                  Fonte: Lei Complementar nº 214/2024
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <HelpCircle size={16} className="mr-2" /> Ajuda
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
              <div className="p-4">
                <h3 className="font-bold mb-2">Como usar o LegiScanAR</h3>
                <ol className="text-sm space-y-2">
                  <li>1. <span className="font-medium">Selecione seu segmento</span> na página inicial para identificar os artigos relevantes para o seu negócio.</li>
                  <li>2. <span className="font-medium">Explore os artigos</span> organizados por tópicos ou utilize a barra de pesquisa.</li>
                  <li>3. <span className="font-medium">Analise os impactos</span> positivos e negativos identificados para seu segmento.</li>
                  <li>4. <span className="font-medium">Clique em "Mostrar mais"</span> para ler detalhes sobre cada artigo relevante.</li>
                </ol>
                <p className="text-xs mt-3">
                  LegiScanAR é uma ferramenta informativa e não substitui a consultoria profissional especializada.
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
