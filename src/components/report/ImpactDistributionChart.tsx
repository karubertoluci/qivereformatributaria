
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, HelpCircle, AlertTriangle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImpactDistributionChartProps {
  articles: Article[];
  segmentId: string;
  bookId?: string | null;
}

interface RelevanceGroup {
  name: string;
  score: number;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  hasCritical?: boolean;
}

const ImpactDistributionChart: React.FC<ImpactDistributionChartProps> = ({
  articles,
  segmentId,
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
  
  // Calculate importance score for each article and group by relevance level
  const calculateRelevanceGroups = () => {
    // Define relevance groups
    const groups: RelevanceGroup[] = [
      { name: 'Irrelevante', score: 0, positive: 0, negative: 0, neutral: 0, total: 0 },
      { name: 'Pouco relevante', score: 25, positive: 0, negative: 0, neutral: 0, total: 0 },
      { name: 'Moderadamente relevante', score: 50, positive: 0, negative: 0, neutral: 0, total: 0 },
      { name: 'Muito relevante', score: 75, positive: 0, negative: 0, neutral: 0, total: 0, hasCritical: false }
    ];
    
    // Calculate relevance score for each article
    filteredArticles.forEach(article => {
      const segmentImpacts = article.impacts.filter(impact => 
        impact.segments.includes(segmentId)
      );
      
      if (segmentImpacts.length === 0) return;
      
      // Calculate score
      let score = 0;
      score += segmentImpacts.length * 10;
      
      let hasCriticalImpact = false;
      
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') score += 15;
        if (impact.type === 'negative') {
          score += 20;
          if (impact.severity === 'high') {
            hasCriticalImpact = true;
          }
        }
      });
      score = Math.min(score, 100);
      
      // Determine which group this article belongs to
      let groupIndex = 0;
      if (score >= 75) groupIndex = 3;
      else if (score >= 50) groupIndex = 2;
      else if (score >= 25) groupIndex = 1;
      
      groups[groupIndex].total += 1;
      
      // Mark group as critical if it contains at least one critical impact
      if (hasCriticalImpact && groupIndex === 3) {
        groups[groupIndex].hasCritical = true;
      }
      
      // Count impacts by type
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') groups[groupIndex].positive += 1;
        else if (impact.type === 'negative') groups[groupIndex].negative += 1;
        else groups[groupIndex].neutral += 1;
      });
    });
    
    return groups;
  };
  
  const data = calculateRelevanceGroups();
  
  // Check if we have critical impacts in highly relevant articles
  const hasCriticalImpacts = data.some(group => group.hasCritical);
  
  // Calculate percentages for stacked bar chart
  const calculatePercentageData = () => {
    return data.map(group => {
      const total = group.positive + group.negative + group.neutral;
      if (total === 0) return { 
        name: group.name, 
        favorable: 0, 
        neutral: 0, 
        unfavorable: 0,
        total: group.total,
        count: `${group.total} artigos`,
        hasCritical: group.hasCritical
      };
      
      return {
        name: group.name,
        favorable: Math.round((group.positive / total) * 100),
        neutral: Math.round((group.neutral / total) * 100),
        unfavorable: Math.round((group.negative / total) * 100),
        total: group.total,
        count: `${group.total} artigos`,
        hasCritical: group.hasCritical
      };
    });
  };
  
  const percentageData = calculatePercentageData();
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Favorabilidade por Relevância
              {bookId && <span className="text-sm font-normal ml-1">(Livro {bookId})</span>}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Análise da distribuição percentual de impactos por nível de relevância
            </CardDescription>
          </div>
          
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Este gráfico mostra a proporção de impactos favoráveis, neutros e desfavoráveis 
                  em cada nível de relevância dos artigos para seu segmento.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent>
        {hasCriticalImpacts && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Atenção! Existem artigos muito relevantes com impactos altamente desfavoráveis para seu segmento.
              Recomendamos priorizar sua análise.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={percentageData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150}
                tickFormatter={(value) => `${value} (${percentageData.find(d => d.name === value)?.total || '0'} artigos)`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'favorable') return [`${value}%`, 'Favorável'];
                  if (name === 'neutral') return [`${value}%`, 'Neutro'];
                  if (name === 'unfavorable') return [`${value}%`, 'Desfavorável'];
                  return [`${value}%`, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-md border bg-background p-3 shadow-md">
                        <div className="font-medium flex items-center gap-2">
                          {data.name} 
                          {data.hasCritical && (
                            <span className="text-red-500 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" /> 
                              Crítico
                            </span>
                          )}
                        </div>
                        <div className="text-sm mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                              Favorável:
                            </span>
                            <span>{data.favorable}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <span className="h-2 w-2 bg-gray-400 rounded-full inline-block mr-1"></span>
                              Neutro:
                            </span>
                            <span>{data.neutral}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-1"></span>
                              Desfavorável:
                            </span>
                            <span>{data.unfavorable}%</span>
                          </div>
                        </div>
                        <div className="text-xs mt-2 text-muted-foreground">
                          Total: {data.total} artigos
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                formatter={(value) => {
                  if (value === 'favorable') return 'Favorável';
                  if (value === 'neutral') return 'Neutro';
                  if (value === 'unfavorable') return 'Desfavorável';
                  return value;
                }}
                iconSize={15}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar dataKey="favorable" stackId="a" name="favorable" fill="#4ade80" />
              <Bar dataKey="neutral" stackId="a" name="neutral" fill="#d1d5db" />
              <Bar dataKey="unfavorable" stackId="a" name="unfavorable">
                {percentageData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.hasCritical ? '#dc2626' : '#ef4444'} // Brighter red for critical impacts
                    strokeWidth={entry.hasCritical ? 1 : 0}
                    stroke="#000"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-3 bg-muted/50 rounded-md border border-muted">
          <h4 className="font-medium mb-1">Como interpretar este gráfico:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 bg-green-500 rounded-full inline-block"></span>
              <span><strong>Verde (Favorável):</strong> Impactos positivos para seu segmento</span>
            </li>
            <li className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 bg-gray-400 rounded-full inline-block"></span>
              <span><strong>Cinza (Neutro):</strong> Impactos neutros ou com efeito equilibrado</span>
            </li>
            <li className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full inline-block"></span>
              <span><strong>Vermelho (Desfavorável):</strong> Impactos negativos que exigem atenção</span>
            </li>
          </ul>
          <div className="mt-3 border-t pt-2 border-muted-foreground/30">
            <p className="text-sm font-medium text-center">Priorize a análise de artigos com alta relevância e impactos desfavoráveis</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactDistributionChart;
