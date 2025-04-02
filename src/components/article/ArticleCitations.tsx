
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, BookOpen, Info } from 'lucide-react';

interface Citation {
  id: string;
  text: string;
  source: string;
  page?: string;
  bookSection?: string;
  url?: string;
}

interface ArticleCitationsProps {
  articleId: string;
}

const ArticleCitations: React.FC<ArticleCitationsProps> = ({ articleId }) => {
  // In a real application, these would come from the database based on articleId
  // This is placeholder data for demonstration
  const citations: Citation[] = [
    {
      id: '1',
      text: "O IVA dual brasileiro combina características do sistema europeu com adaptações para nossa realidade federativa...",
      source: "Manual da Reforma Tributária",
      page: "45-46",
      bookSection: "Capítulo 3: IVA Dual",
    },
    {
      id: '2',
      text: "A não-cumulatividade plena representa uma das maiores evoluções do novo sistema tributário em relação ao atual...",
      source: "Impactos Econômicos da Reforma Tributária",
      page: "112",
      bookSection: "Seção 2.4: Não-cumulatividade",
      url: "https://exemplo.gov.br/estudos/reforma-tributaria"
    },
    {
      id: '3',
      text: "O período de transição de oito anos foi definido para permitir adaptação gradual das empresas e dos fiscos estaduais e municipais...",
      source: "Notas Técnicas - Ministério da Fazenda",
      page: "17",
      bookSection: "Nota 4: Período de Transição",
      url: "https://exemplo.gov.br/notas/transicao-tributaria"
    }
  ];
  
  // Para fins de demonstração, vamos exibir 1-3 citações baseado no ID do artigo
  const citationsToShow = citations.slice(0, parseInt(articleId) % 3 + 1);
  
  if (citationsToShow.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <h4 className="text-sm font-bold flex items-center gap-1.5">
        <BookOpen className="h-4 w-4 text-primary" />
        Citações e Referências
      </h4>
      
      <div className="space-y-3">
        {citationsToShow.map(citation => (
          <Card key={citation.id} className="bg-secondary/20">
            <CardContent className="p-3">
              <blockquote className="border-l-2 border-primary pl-3 italic text-sm">
                "{citation.text}"
              </blockquote>
              
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{citation.source}</span>
                </div>
                
                {citation.page && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Página {citation.page}</span>
                  </div>
                )}
                
                {citation.bookSection && (
                  <div className="flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    <span>{citation.bookSection}</span>
                  </div>
                )}
                
                {citation.url && (
                  <a 
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Link className="h-3 w-3" />
                    <span>Acessar fonte</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticleCitations;
