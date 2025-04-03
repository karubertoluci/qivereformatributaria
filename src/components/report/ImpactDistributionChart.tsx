
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, HelpCircle } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      { name: 'Muito relevante', score: 75, positive: 0, negative: 0, neutral: 0, total: 0 }
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
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') score += 15;
        if (impact.type === 'negative') score += 20;
      });
      score = Math.min(score, 100);
      
      // Determine which group this article belongs to
      let groupIndex = 0;
      if (score >= 75) groupIndex = 3;
      else if (score >= 50) groupIndex = 2;
      else if (score >= 25) groupIndex = 1;
      
      groups[groupIndex].total += 1;
      
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
        count: `${group.total} artigos`
      };
      
      return {
        name: group.name,
        favorable: Math.round((group.positive / total) * 100),
        neutral: Math.round((group.neutral / total) * 100),
        unfavorable: Math.round((group.negative / total) * 100),
        total: group.total,
        count: `${group.total} artigos`
      };
    });
  };
  
  const percentageData = calculatePercentageData();
  
  return (
    <Card className="mt-6 shadow-md">
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
              <Bar dataKey="unfavorable" stackId="a" name="unfavorable" fill="#ef4444" />
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
          <p className="mt-2 text-sm">Priorize a análise de artigos com alta relevância e impactos desfavoráveis.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactDistributionChart;
