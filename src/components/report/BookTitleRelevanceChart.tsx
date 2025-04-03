
import React from 'react';
import { Article } from '@/data/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BookOpen } from 'lucide-react';

interface BookTitleRelevanceChartProps {
  articles: Article[];
  bookId: string;
  segmentId: string;
}

interface TitleData {
  id: string;
  name: string;
  irrelevante: number;
  poucoRelevante: number;
  moderadamenteRelevante: number;
  muitoRelevante: number;
}

const BookTitleRelevanceChart: React.FC<BookTitleRelevanceChartProps> = ({
  articles,
  bookId,
  segmentId
}) => {
  // Filter articles by the specified book
  const filterArticlesByBook = () => {
    return articles.filter(article => {
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                        parseInt(article.id.replace(/\D/g, ''));
      
      if (bookId === 'I') return articleNum <= 180;
      if (bookId === 'II') return articleNum > 180 && articleNum <= 300;
      return articleNum > 300;
    });
  };
  
  const bookArticles = filterArticlesByBook();
  
  // Group articles by title and count by relevance level
  const getTitleData = () => {
    // This would normally come from article metadata, using mock data for now
    const titleMap = new Map<string, TitleData>();
    
    // Define mock titles for each book
    const mockTitles: Record<string, string[]> = {
      'I': ['NORMAS GERAIS', 'REG. REGIMES IMACAGEM', 'REG. CASHBACK', 'REG. DIF. IBS', 'REG. ESP. IBS', 'REG. DIF. CBS', 'ADM. IBS', 'TRANS. IBS'],
      'II': ['DISP. PRELIMINARES', 'NORMAS GERAIS IMPOSTO SELETIVO', 'IMPOSTO SELETIVO SOBRE IMPORTAÇÕES', 'DISP. FINAIS'],
      'III': ['ZFM, ÁREAS LIVRE COMÉRCIO DEVOLUÇÃO', 'GOV', 'DISP. TRANSITÓRIAS', 'DISP. FINAIS']
    };
    
    // Initialize title data
    mockTitles[bookId].forEach((title, index) => {
      titleMap.set(title, {
        id: `${bookId}.${index + 1}`,
        name: title,
        irrelevante: 0,
        poucoRelevante: 0,
        moderadamenteRelevante: 0,
        muitoRelevante: 0
      });
    });
    
    // Count articles by relevance level for each title
    bookArticles.forEach(article => {
      // For demonstration, distribute articles among titles
      const articleNum = parseInt(article.number.replace(/\D/g, '')) || parseInt(article.id.replace(/\D/g, ''));
      const titleIndex = articleNum % mockTitles[bookId].length;
      const title = mockTitles[bookId][titleIndex];
      
      // Calculate relevance score
      const segmentImpacts = article.impacts.filter(impact => impact.segments.includes(segmentId));
      if (segmentImpacts.length === 0) return;
      
      let score = 0;
      score += segmentImpacts.length * 10;
      segmentImpacts.forEach(impact => {
        if (impact.type === 'positive') score += 15;
        if (impact.type === 'negative') score += 20;
      });
      score = Math.min(score, 100);
      
      // Update count based on relevance level
      const titleData = titleMap.get(title);
      if (titleData) {
        if (score >= 75) titleData.muitoRelevante += 1;
        else if (score >= 50) titleData.moderadamenteRelevante += 1;
        else if (score >= 25) titleData.poucoRelevante += 1;
        else titleData.irrelevante += 1;
      }
    });
    
    return Array.from(titleMap.values());
  };
  
  const data = getTitleData();
  
  // Colors for each relevance level
  const colors = {
    muitoRelevante: '#ef4444', // red
    moderadamenteRelevante: '#f97316', // orange
    poucoRelevante: '#eab308', // yellow
    irrelevante: '#65a30d' // green
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Distribuição de Artigos por Título do Livro {bookId}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barGap={0}
              barCategoryGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                height={80}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text 
                        x={0} 
                        y={0} 
                        dy={16} 
                        textAnchor="end" 
                        fill="#666" 
                        transform="rotate(-45)"
                        style={{ fontSize: 11 }}
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis label={{ value: 'Número de Artigos', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'muitoRelevante') return [value, 'Muito Relevante'];
                  if (name === 'moderadamenteRelevante') return [value, 'Moderadamente Relevante'];
                  if (name === 'poucoRelevante') return [value, 'Pouco Relevante'];
                  if (name === 'irrelevante') return [value, 'Irrelevante'];
                  return [value, name];
                }}
              />
              <Legend 
                formatter={(value) => {
                  if (value === 'muitoRelevante') return 'Muito Relevante';
                  if (value === 'moderadamenteRelevante') return 'Moderadamente Relevante';
                  if (value === 'poucoRelevante') return 'Pouco Relevante';
                  if (value === 'irrelevante') return 'Irrelevante';
                  return value;
                }}
              />
              <Bar dataKey="irrelevante" fill={colors.irrelevante} />
              <Bar dataKey="poucoRelevante" fill={colors.poucoRelevante} />
              <Bar dataKey="moderadamenteRelevante" fill={colors.moderadamenteRelevante} />
              <Bar dataKey="muitoRelevante" fill={colors.muitoRelevante} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>O gráfico acima mostra a distribuição de artigos por título do Livro {bookId}, categorizados por nível de relevância para seu segmento.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookTitleRelevanceChart;
