
import React from 'react';
import { Article } from '@/data/articles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChartIcon, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ArticlesPriorityChartProps {
  articles: Article[];
  segmentId: string;
  onSelectArticle: (articleId: string) => void;
  bookId?: string | null;
}

const ArticlesPriorityChart: React.FC<ArticlesPriorityChartProps> = ({ 
  articles,
  segmentId,
  onSelectArticle,
  bookId
}) => {
  // Filter articles by book if bookId is provided
  const filteredArticles = bookId 
    ? articles.filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (bookId === 'I') return articleNum <= 180;
        if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
        return articleNum > 300;
      })
    : articles;
    
  // Calculate importance score for each article
  const calculateImportanceScore = (article: Article) => {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    let score = 0;
    
    // Base score from number of impacts
    score += segmentImpacts.length * 10;
    
    // Additional points based on impact type
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') score += 15;
      if (impact.type === 'negative') score += 20; // Negative impacts slightly more important to be aware of
    });
    
    return Math.min(score, 100); // Cap at 100
  };
  
  // Create sorted chart data
  const chartData = filteredArticles
    .map(article => ({
      id: article.id,
      name: article.number,
      title: article.title,
      score: calculateImportanceScore(article),
      type: article.impacts.some(impact => 
        impact.type === 'negative' && impact.segments.includes(segmentId)
      ) ? 'negative' : 'positive'
    }))
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 10); // Only show top 10 most important articles
  
  // Get color based on score
  function getScoreColor(score: number, type: string) {
    if (type === 'negative') {
      if (score >= 75) return '#ef4444'; // Critical negative - bright red
      if (score >= 50) return '#f87171'; // Important negative - lighter red
      return '#fca5a5'; // Less important negative - pale red
    } else {
      if (score >= 75) return '#10b981'; // Critical positive - bright green
      if (score >= 50) return '#34d399'; // Important positive - lighter green
      return '#6ee7b7'; // Less important positive - pale green
    }
  }

  // Handle chart click
  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedItem = data.activePayload[0].payload;
      if (clickedItem && clickedItem.id) {
        onSelectArticle(clickedItem.id);
      }
    }
  };
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-primary" />
              <span>Priorização de Leitura</span>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Artigos mais relevantes para seu segmento, ordenados por nível de importância
              {bookId && <span className="font-medium"> (Livro {bookId})</span>}
            </CardDescription>
          </div>
          
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Este gráfico mostra os artigos mais importantes para seu segmento. 
                Clique nas barras para visualizar detalhes de cada artigo.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent>
        {chartData.length === 0 ? (
          <div className="w-full h-48 md:h-60 flex items-center justify-center text-muted-foreground">
            Nenhum artigo com impacto relevante encontrado.
          </div>
        ) : (
          <div className="w-full h-48 md:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                layout="vertical"
                barCategoryGap={8}
                margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
                onClick={handleChartClick}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tickCount={6} 
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={50} 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  content={
                    ({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-md border bg-background p-2 shadow-md max-w-xs">
                            <div className="font-medium">{data.name} - {data.title}</div>
                            <div className="text-sm mt-1 flex items-center gap-1">
                              <span>Relevância: {data.score}%</span>
                              {data.type === 'negative' ? 
                                <ArrowDown className="h-3 w-3 text-red-500" /> : 
                                <ArrowUp className="h-3 w-3 text-green-500" />
                              }
                            </div>
                            <div className="text-xs mt-1 text-muted-foreground">
                              Clique para visualizar o artigo
                            </div>
                          </div>
                        );
                      }
                      
                      return null;
                    }
                  }
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20} className="cursor-pointer">
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getScoreColor(entry.score, entry.type)} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="mt-2 p-2 bg-muted/50 rounded-md border border-muted text-xs">
          <div className="flex items-center gap-1 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-medium">Legenda:</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span>
              <span className="inline-block w-2 h-2 bg-red-500 rounded-sm mr-1"></span>
              <strong>Vermelho:</strong> Desfavorável
            </span>
            <span>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-sm mr-1"></span>
              <strong>Verde:</strong> Favorável
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlesPriorityChart;
