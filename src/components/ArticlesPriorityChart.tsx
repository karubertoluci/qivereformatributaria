
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import { 
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend
} from 'recharts';
import ChartHeader from '@/components/report/charts/ChartHeader';
import { filterArticlesByRelevance } from './report/charts/utils/chartCalculations';

interface ArticlesPriorityChartProps {
  articles: Article[];
  segmentId: string;
  onSelectArticle?: (articleId: string) => void;
  bookId?: string | null;
  relevanceFilter?: string | null;
}

// Function to score article relevance and distribute them graphically
const getArticlePriorityData = (articles: Article[], segmentId: string) => {
  const result = [];
  
  for (const article of articles) {
    const segmentImpacts = article.impacts.filter(impact => 
      impact.segments.includes(segmentId)
    );
    
    if (segmentImpacts.length === 0) continue;
    
    // Calculate relevance score
    let relevance = 0;
    relevance += segmentImpacts.length * 10;
    
    let urgency = 0;
    let isNegative = false;
    
    segmentImpacts.forEach(impact => {
      if (impact.type === 'positive') {
        relevance += 15;
        urgency += impact.severity === 'high' ? 35 : 
                  impact.severity === 'medium' ? 20 : 10;
      }
      if (impact.type === 'negative') {
        isNegative = true;
        relevance += 20;
        urgency += impact.severity === 'high' ? 50 : 
                  impact.severity === 'medium' ? 30 : 15;
      }
    });
    
    // Cap scores to a max of 100
    relevance = Math.min(relevance, 100);
    urgency = Math.min(urgency, 100);
    
    result.push({
      id: article.id,
      number: article.number,
      title: article.title,
      relevance,
      urgency,
      isNegative,
      simplified: article.simplifiedText.substring(0, 120) + '...',
    });
  }
  
  // Sort by urgency and relevance
  return result.sort((a, b) => (b.relevance + b.urgency) - (a.relevance + a.urgency));
};

const ArticlesPriorityChart: React.FC<ArticlesPriorityChartProps> = ({
  articles,
  segmentId,
  onSelectArticle,
  bookId,
  relevanceFilter
}) => {
  // First filter by book if bookId is provided
  const bookFilteredArticles = bookId 
    ? articles.filter(article => {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (bookId === 'I') return articleNum <= 180;
        if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
        return articleNum > 300;
      })
    : articles;
  
  // Then filter by relevance if needed
  const finalFilteredArticles = relevanceFilter 
    ? filterArticlesByRelevance(bookFilteredArticles, segmentId, relevanceFilter)
    : bookFilteredArticles;
  
  const data = getArticlePriorityData(finalFilteredArticles, segmentId);
  
  const handleDotClick = (data: any) => {
    if (onSelectArticle) {
      onSelectArticle(data.id);
    }
  };
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <ChartHeader 
          title="Priorização de Leitura"
          description="Artigos organizados por relevância e urgência para seu segmento"
          icon={<BookMarked className="h-5 w-5 text-primary" />}
          tooltipContent="Este gráfico organiza os artigos por prioridade de leitura, combinando relevância para seu segmento e urgência de impacto. Clique em um ponto para ver detalhes do artigo."
          bookId={bookId}
        />
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="relevance" 
                name="Relevância" 
                domain={[0, 100]}
                label={{ value: 'Relevância', position: 'bottom', offset: 0 }} 
              />
              <YAxis 
                type="number" 
                dataKey="urgency" 
                name="Urgência" 
                domain={[0, 100]}
                label={{ value: 'Urgência', angle: -90, position: 'left' }} 
              />
              <ZAxis range={[60, 60]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [value, name === 'relevance' ? 'Relevância' : 'Urgência']}
                content={(props) => {
                  const { active, payload } = props;
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow-lg text-xs max-w-[200px]">
                        <p className="font-bold">{data.number}: {data.title}</p>
                        <p className="text-muted-foreground mt-1">{data.simplified}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p>Relevância:</p>
                            <p className="font-medium">{data.relevance}/100</p>
                          </div>
                          <div>
                            <p>Urgência:</p>
                            <p className="font-medium">{data.urgency}/100</p>
                          </div>
                        </div>
                        <p className="mt-1 text-center text-primary-foreground bg-primary/80 rounded p-1">
                          Clique para detalhes
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter 
                name="Artigos" 
                data={data} 
                fill="#8884d8" 
                onClick={handleDotClick}
              >
                {data.map((entry, index) => (
                  <rect
                    key={`cell-${index}`}
                    x={0}
                    y={0}
                    width={10}
                    height={10}
                    fill={entry.isNegative ? "#ef4444" : "#4ade80"}
                    stroke={entry.isNegative ? "#dc2626" : "#22c55e"}
                    strokeWidth={1}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 p-2 bg-muted/50 rounded-md border border-muted text-xs">
          <p className="text-center mb-1 font-medium">Como interpretar:</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-sm mr-1"></span>
              <strong>Verde:</strong> Impacto positivo
            </div>
            <div>
              <span className="inline-block w-2 h-2 bg-red-500 rounded-sm mr-1"></span>
              <strong>Vermelho:</strong> Impacto negativo
            </div>
          </div>
          <p className="mt-2 text-center text-muted-foreground">
            Priorize a leitura dos artigos localizados no canto superior direito
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlesPriorityChart;
