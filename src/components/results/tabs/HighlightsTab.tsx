
import React from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '@/components/results/types';
import { TabsContent } from '@/components/ui/tabs';

interface HighlightsTabProps {
  highlights: HighlightType[];
  handleRemoveHighlight: (id: string) => void;
  articles: Article[];
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({
  highlights,
  handleRemoveHighlight,
  articles
}) => {
  return (
    <TabsContent value="highlights">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Seus destaques</h2>
        
        {highlights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Você ainda não marcou nenhum destaque. 
              Vá para a aba "Artigos" e selecione trechos de texto para destacar.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {highlights.map((highlight) => {
              const article = articles.find(a => a.id === highlight.articleId);
              return (
                <div 
                  key={highlight.id} 
                  className="p-4 border rounded-md shadow-sm relative"
                >
                  {article && (
                    <div className="mb-2">
                      <h3 className="font-medium text-primary">{article.title}</h3>
                    </div>
                  )}
                  <div className="space-y-2">
                    <p 
                      className={`py-1 px-2 rounded ${
                        highlight.color === 'yellow' ? 'bg-yellow-100' : 
                        highlight.color === 'green' ? 'bg-green-100' : 
                        highlight.color === 'blue' ? 'bg-blue-100' : 
                        highlight.color === 'pink' ? 'bg-purple-100' : 
                        'bg-gray-100'
                      }`}
                    >
                      {highlight.text}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleRemoveHighlight(highlight.id)}
                    className="absolute top-2 right-2 text-xs text-gray-500 hover:text-red-500"
                  >
                    Remover
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TabsContent>
  );
};

export default HighlightsTab;
