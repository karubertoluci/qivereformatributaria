
import React from 'react';
import { Highlighter, X } from 'lucide-react';
import { Article } from '@/data/articles';
import { HighlightType } from '../types';

interface HighlightsTabProps {
  highlights: HighlightType[];
  relevantArticles: Article[];
  setExpandedArticleId: (id: string | null) => void;
  handleRemoveHighlight: (id: string) => void;
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({
  highlights,
  relevantArticles,
  setExpandedArticleId,
  handleRemoveHighlight
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Meus Destaques</h2>
      
      {highlights.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Highlighter className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Você ainda não possui destaques. Selecione um texto em qualquer parte do relatório 
            e use a ferramenta de destaque para organizar suas anotações.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {highlights.map((highlight) => (
            <div 
              key={highlight.id} 
              className={`p-4 rounded-lg border flex justify-between items-start ${
                highlight.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                highlight.color === 'green' ? 'bg-green-50 border-green-200' :
                highlight.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                'bg-pink-50 border-pink-200'
              }`}
            >
              <div>
                <div className="text-sm font-medium mb-1">
                  Artigo {relevantArticles.find(a => a.id === highlight.articleId)?.number || 'Não especificado'}
                </div>
                <p className="text-sm">"{highlight.text}"</p>
                <button 
                  className="text-xs text-primary mt-2 underline"
                  onClick={() => {
                    setExpandedArticleId(highlight.articleId);
                    document.querySelector('[value="articles"]')?.dispatchEvent(new Event('click'));
                  }}
                >
                  Ir para o artigo
                </button>
              </div>
              <button 
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveHighlight(highlight.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighlightsTab;
