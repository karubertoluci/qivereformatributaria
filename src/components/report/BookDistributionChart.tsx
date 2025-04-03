import React, { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, PieChart, X } from 'lucide-react';
import { toast } from 'sonner';

interface BookDistributionChartProps {
  articles: Article[];
  onSelectBook?: (bookId: string | null) => void;
  selectedBook?: string | null;
}

interface BookData {
  bookId: string;
  title: string;
  color: string;
  articles: number;
  positiveImpacts: number;
  negativeImpacts: number;
  neutralImpacts: number;
}

const BookDistributionChart: React.FC<BookDistributionChartProps> = ({
  articles,
  onSelectBook,
  selectedBook
}) => {
  const [data, setData] = useState<BookData[]>([]);
  
  useEffect(() => {
    // Group articles by book and count them
    const bookMap = new Map<string, BookData>();
    
    // Define book metadata
    const bookMeta = [
      { id: 'I', title: 'CBS', color: '#3b82f6', description: 'Contribuição sobre Bens e Serviços' },
      { id: 'II', title: 'IBS', color: '#f59e0b', description: 'Imposto sobre Bens e Serviços' },
      { id: 'III', title: 'IS', color: '#8b5cf6', description: 'Imposto Seletivo' },
      { id: 'IV', title: 'Outras disposições', color: '#10b981', description: 'Disposições finais e transitórias' }
    ];
    
    // Initialize each book with zero counts
    bookMeta.forEach(book => {
      bookMap.set(book.id, {
        bookId: book.id,
        title: book.title,
        color: book.color,
        articles: 0,
        positiveImpacts: 0,
        negativeImpacts: 0,
        neutralImpacts: 0
      });
    });
    
    // Count articles and impacts by book
    articles.forEach(article => {
      // If article has metadata.bookId, use that directly
      let bookId = article.metadata?.bookId;
      
      // Otherwise determine which book this article belongs to based on article number
      if (!bookId) {
        const articleNum = parseInt(article.number.replace(/\D/g, '')) || 
                          parseInt(article.id.replace(/\D/g, ''));
        
        if (articleNum <= 150) bookId = 'I';
        else if (articleNum <= 250) bookId = 'II';
        else if (articleNum <= 350) bookId = 'III';
        else bookId = 'IV';
      }
      
      // Update article count
      const bookData = bookMap.get(bookId);
      if (bookData) {
        bookData.articles += 1;
        
        // Count impacts by type
        article.impacts.forEach(impact => {
          if (impact.type === 'positive') bookData.positiveImpacts++;
          else if (impact.type === 'negative') bookData.negativeImpacts++;
          else bookData.neutralImpacts++;
        });
      }
    });
    
    // Convert map to array
    setData(Array.from(bookMap.values()));
  }, [articles]);
  
  const handleBarClick = (entry: any) => {
    if (!onSelectBook) return;
    
    if (selectedBook === entry.bookId) {
      onSelectBook(null);
      toast.info("Filtro de livro removido");
    } else {
      onSelectBook(entry.bookId);
      toast.info(`Filtrando por Livro ${entry.bookId} (${entry.title})`);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Distribuição de Artigos por Livro
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Visualize a quantidade de artigos em cada livro da reforma tributária
            </CardDescription>
          </div>
          
          {selectedBook && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
              onClick={() => onSelectBook && onSelectBook(null)}
            >
              <Filter className="h-3 w-3" />
              Livro {selectedBook}: {data.find(d => d.bookId === selectedBook)?.title || ''}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="bookId" 
                tickFormatter={(value) => `Livro ${value}`} 
              />
              <YAxis 
                label={{ value: 'Artigos', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'articles') return [`${value} artigos`, 'Artigos'];
                  if (name === 'positiveImpacts') return [`${value}`, 'Impactos Favoráveis'];
                  if (name === 'negativeImpacts') return [`${value}`, 'Impactos Desfavoráveis'];
                  if (name === 'neutralImpacts') return [`${value}`, 'Impactos Neutros'];
                  return [value, name];
                }}
                labelFormatter={(value) => `Livro ${value}`}
              />
              <Legend 
                formatter={(value) => {
                  if (value === 'articles') return 'Artigos';
                  if (value === 'positiveImpacts') return 'Impactos Favoráveis';
                  if (value === 'negativeImpacts') return 'Impactos Desfavoráveis';
                  if (value === 'neutralImpacts') return 'Impactos Neutros';
                  return value;
                }}
              />
              <Bar 
                dataKey="articles" 
                fill="#8884d8" 
                name="articles"
                onClick={(data) => handleBarClick(data)}
                className="cursor-pointer"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke={entry.bookId === selectedBook ? '#000' : entry.color}
                    strokeWidth={entry.bookId === selectedBook ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {data.map((book) => (
            <div 
              key={book.bookId} 
              className={`bg-card p-4 rounded-md border transition-all duration-150 ${selectedBook === book.bookId ? 'shadow-md border-primary' : 'shadow-sm hover:shadow-md'}`}
              onClick={() => handleBarClick(book)}
              style={{cursor: 'pointer'}}
            >
              <h3 className="font-medium text-center mb-2 flex items-center justify-center gap-1">
                <span 
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: book.color }}
                ></span>
                Livro {book.bookId}: {book.title} ({book.articles} artigos)
              </h3>
              
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-green-50 p-1 rounded">
                  <div className="font-bold text-green-700">{book.positiveImpacts}</div>
                  <div className="text-xs text-green-600">Favoráveis</div>
                </div>
                <div className="bg-gray-50 p-1 rounded">
                  <div className="font-bold text-gray-700">{book.neutralImpacts}</div>
                  <div className="text-xs text-gray-600">Neutros</div>
                </div>
                <div className="bg-red-50 p-1 rounded">
                  <div className="font-bold text-red-700">{book.negativeImpacts}</div>
                  <div className="text-xs text-red-600">Desfavoráveis</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground p-2 bg-muted/50 rounded-md">
          <p className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            <strong>Como usar:</strong> Clique nas barras ou nos cards para filtrar artigos por livro da legislação.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookDistributionChart;
