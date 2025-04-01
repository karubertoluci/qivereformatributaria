
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/data/articles';
import { ArrowDown, ArrowUp, BookOpen, Info, Lightbulb, Tag, MessageSquare, Highlighter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ArticleImportanceChart from './ArticleImportanceChart';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentSection from './results/CommentSection';
import HighlightedText from './results/HighlightedText';
import { CommentType, HighlightType } from './results/types';

interface ArticleCardProps {
  article: Article;
  segmentId: string;
  expanded: boolean;
  onToggleExpand: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, segmentId, expanded, onToggleExpand }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [highlights, setHighlights] = useState<HighlightType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("content");

  const segmentImpacts = article.impacts.filter(impact => 
    impact.segments.includes(segmentId)
  );
  
  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
  
  // Identificar o tipo principal de impacto para o card
  const primaryImpactType = hasNegativeImpact ? 'negative' : (hasPositiveImpact ? 'positive' : 'neutral');

  const handleAddComment = (text: string) => {
    const newComment: CommentType = {
      id: uuidv4(),
      text,
      timestamp: new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      articleId: article.id
    };
    setComments([...comments, newComment]);
  };

  const handleAddHighlight = (text: string, color: HighlightType['color']) => {
    const newHighlight: HighlightType = {
      id: uuidv4(),
      text,
      color,
      articleId: article.id
    };
    setHighlights([...highlights, newHighlight]);
  };
  
  return (
    <Card className={`mb-4 transition-all ${expanded ? 'border-primary border-2' : ''} ${
      primaryImpactType === 'positive' ? 'border-l-4 border-l-green-500' : 
      primaryImpactType === 'negative' ? 'border-l-4 border-l-red-500' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              {article.number}
            </CardTitle>
            <CardDescription className="text-lg font-medium mt-1">
              {article.title}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {hasPositiveImpact && (
              <Badge variant="outline" className="bg-positive text-positive-foreground flex gap-1">
                <ArrowUp className="h-4 w-4" /> Impacto Positivo
              </Badge>
            )}
            {hasNegativeImpact && (
              <Badge variant="outline" className="bg-negative text-negative-foreground flex gap-1">
                <ArrowDown className="h-4 w-4" /> Impacto Negativo
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-700 mb-4">
          {expanded ? (
            <HighlightedText 
              text={article.simplifiedText} 
              highlights={highlights}
              articleId={article.id}
              onAddHighlight={handleAddHighlight}
            />
          ) : (
            article.simplifiedText.substring(0, 120) + "..."
          )}
        </div>

        {!expanded && (
          <ArticleImportanceChart article={article} segmentId={segmentId} className="mt-2" />
        )}
        
        {expanded && (
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  <Lightbulb className="h-4 w-4 mr-2" /> Conteúdo
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" /> 
                  Comentários {comments.length > 0 && <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center">{comments.length}</span>}
                </TabsTrigger>
                <TabsTrigger value="highlights" className="flex-1">
                  <Highlighter className="h-4 w-4 mr-2" /> 
                  Destaques {highlights.length > 0 && <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center">{highlights.length}</span>}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-bold flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                    Tradução Simplificada
                  </h4>
                  <div className="text-sm p-3 bg-secondary/30 rounded-md">
                    <HighlightedText 
                      text={article.simplifiedText} 
                      highlights={highlights}
                      articleId={article.id}
                      onAddHighlight={handleAddHighlight}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <ArticleImportanceChart article={article} segmentId={segmentId} className="my-4" />
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-bold flex items-center mb-2">
                    <Info className="h-4 w-4 mr-1 text-blue-500" />
                    Texto Original
                  </h4>
                  <div className="text-xs text-gray-500 italic p-3 bg-gray-50 rounded-md border border-gray-100">
                    {article.originalText}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-bold flex items-center mb-3">
                    <Tag className="h-4 w-4 mr-1 text-primary" />
                    Impactos para seu Segmento
                  </h4>
                  <ul className="space-y-3">
                    {segmentImpacts.map((impact, index) => (
                      <li 
                        key={index} 
                        className={`text-sm p-3 rounded-md flex items-start ${
                          impact.type === 'positive' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' :
                          impact.type === 'negative' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' :
                          'bg-gray-50 text-gray-800 border-l-4 border-gray-500'
                        }`}
                      >
                        <div className="mt-0.5 mr-2">
                          {impact.type === 'positive' && <ArrowUp className="h-4 w-4" />}
                          {impact.type === 'negative' && <ArrowDown className="h-4 w-4" />}
                          {impact.type === 'neutral' && <Info className="h-4 w-4" />}
                        </div>
                        <div>
                          {impact.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <CommentSection
                  articleId={article.id}
                  comments={comments}
                  onAddComment={handleAddComment}
                />
              </TabsContent>

              <TabsContent value="highlights" className="mt-4">
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
                            highlight.color === 'yellow' ? 'bg-yellow-100 border-yellow-300' :
                            highlight.color === 'green' ? 'bg-green-100 border-green-300' :
                            highlight.color === 'blue' ? 'bg-blue-100 border-blue-300' :
                            'bg-pink-100 border-pink-300'
                          }`}
                        >
                          <div className="text-sm">{highlight.text}</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 h-7 text-xs"
                            onClick={() => setHighlights(highlights.filter(h => h.id !== highlight.id))}
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      Selecione qualquer texto no conteúdo do artigo para criar um destaque.
                    </div>
                  )}
                  
                  <div className="bg-secondary/30 p-3 rounded-md mt-4">
                    <h5 className="text-xs font-semibold mb-2">Como criar destaques</h5>
                    <ol className="text-xs text-gray-600 list-decimal pl-4 space-y-1">
                      <li>Navegue até a aba "Conteúdo"</li>
                      <li>Selecione qualquer texto para destacá-lo</li>
                      <li>Escolha uma cor quando aparecer a barra de ferramentas</li>
                      <li>Seus destaques serão salvos nesta aba</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full text-primary hover:text-primary hover:bg-primary/10"
          onClick={onToggleExpand}
        >
          {expanded ? "Mostrar menos" : "Mostrar mais"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
