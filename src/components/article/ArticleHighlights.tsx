
import React from 'react';
import { Button } from '@/components/ui/button';
import { Highlighter } from 'lucide-react';
import { HighlightType } from '@/components/results/types';

interface ArticleHighlightsProps {
  highlights: HighlightType[];
  onRemoveHighlight: (id: string) => void;
}

const ArticleHighlights: React.FC<ArticleHighlightsProps> = ({ 
  highlights,
  onRemoveHighlight
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold flex items-center">
        <Highlighter className="h-4 w-4 mr-1 text-primary" />
        Destaques
      </h4>
      
      {highlights.length > 0 ? (
        <div className="space-y-3">
          {highlights.map((highlight) => (
            <div 
              key={highlight.id} 
              className={`p-3 rounded-md border ${
                highlight.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
                highlight.color === 'green' ? 'bg-green-50 border-green-300' :
                highlight.color === 'blue' ? 'bg-blue-50 border-blue-300' :
                'bg-pink-50 border-pink-300'
              }`}
            >
              <div className="text-sm">{highlight.text}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-7 text-xs"
                onClick={() => onRemoveHighlight(highlight.id)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground italic">
          Selecione qualquer texto no conteúdo do artigo para criar um destaque.
        </div>
      )}
      
      <div className="bg-gray-50 p-3 rounded-md mt-4">
        <h5 className="text-xs font-semibold mb-2">Como criar destaques</h5>
        <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
          <li>Navegue até a aba "Conteúdo"</li>
          <li>Selecione qualquer texto para destacá-lo</li>
          <li>Escolha uma cor quando aparecer a barra de ferramentas</li>
          <li>Seus destaques serão salvos nesta aba</li>
        </ol>
      </div>
    </div>
  );
};

export default ArticleHighlights;
