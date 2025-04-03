
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ChartHelpProps {
  title?: string;
  description?: string;
  usage?: string[];
}

const ChartHelp: React.FC<ChartHelpProps> = ({ 
  title = "Sobre este gráfico",
  description = "Este gráfico mostra a distribuição de artigos nos três livros da reforma tributária, organizados por níveis de relevância para seu segmento.",
  usage = [
    "Clique em uma barra para filtrar por livro",
    "Clique nas legendas abaixo para filtrar por relevância",
    "Passe o mouse sobre as barras para ver detalhes"
  ]
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="rounded-full p-1 hover:bg-muted transition-colors">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          <div className="pt-2 text-xs text-muted-foreground border-t">
            <ul className="list-disc list-inside space-y-1">
              {usage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChartHelp;
