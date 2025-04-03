
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ChartHelp: React.FC = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="rounded-full p-1 hover:bg-muted transition-colors">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Sobre este gráfico</h4>
          <p className="text-sm text-muted-foreground">
            Este gráfico mostra a distribuição de artigos nos três livros da reforma tributária, 
            organizados por níveis de relevância para seu segmento.
          </p>
          <p className="text-sm text-muted-foreground">
            Cada barra representa um livro, com cores diferentes indicando os níveis de relevância dos artigos.
          </p>
          <div className="pt-2 text-xs text-muted-foreground border-t">
            <ul className="list-disc list-inside space-y-1">
              <li>Clique em uma barra para filtrar por livro</li>
              <li>Clique nas legendas abaixo para filtrar por relevância</li>
              <li>Passe o mouse sobre as barras para ver detalhes</li>
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChartHelp;
