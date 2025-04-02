
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Book } from 'lucide-react';

interface LegislationBooksProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

interface LegislationBook {
  name: string;
  count: number;
  color: string;
}

const LegislationBooks: React.FC<LegislationBooksProps> = ({ articles, onSelectArticle }) => {
  // Define books of legislation
  const books = [
    { id: 'iva', name: 'Livro IVA', color: '#22c55e' },
    { id: 'cbs', name: 'Livro CBS', color: '#3b82f6' },
    { id: 'ibs', name: 'Livro IBS', color: '#f59e0b' },
    { id: 'is', name: 'Livro IS', color: '#8b5cf6' },
    { id: 'general', name: 'Disposições Gerais', color: '#64748b' }
  ];
  
  // For demonstration, let's assign articles to books based on their ID
  const getArticleBook = (article: Article): string => {
    const id = parseInt(article.id);
    if (id % 5 === 0) return 'iva';
    if (id % 5 === 1) return 'cbs';
    if (id % 5 === 2) return 'ibs';
    if (id % 5 === 3) return 'is';
    return 'general';
  };
  
  // Count articles per book
  const bookCounts: Record<string, number> = {};
  
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    bookCounts[bookId] = (bookCounts[bookId] || 0) + 1;
  });
  
  // Create chart data
  const chartData: LegislationBook[] = books.map(book => ({
    name: book.name,
    count: bookCounts[book.id] || 0,
    color: book.color
  })).filter(book => book.count > 0);
  
  // Group articles by book for the listing below the chart
  const articlesByBook: Record<string, Article[]> = {};
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    if (!articlesByBook[bookId]) {
      articlesByBook[bookId] = [];
    }
    articlesByBook[bookId].push(article);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Artigos por Livro da Legislação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="name"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} artigos`, name]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-4">
          {books.map(book => {
            const bookArticles = articlesByBook[book.id] || [];
            if (bookArticles.length === 0) return null;
            
            return (
              <div key={book.id}>
                <h4 
                  className="text-sm font-medium mb-2 flex items-center gap-1.5" 
                  style={{ color: book.color }}
                >
                  <Book className="h-3 w-3" />
                  {book.name} ({bookArticles.length})
                </h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {bookArticles.slice(0, 8).map(article => (
                    <button
                      key={article.id}
                      onClick={() => onSelectArticle(article.id)}
                      className="text-xs px-2 py-1 rounded-full border hover:bg-secondary transition-colors"
                    >
                      Art. {article.number}
                    </button>
                  ))}
                  {bookArticles.length > 8 && (
                    <span className="text-xs px-2 py-1 text-muted-foreground">
                      +{bookArticles.length - 8} artigos
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
          <p>
            Os livros da reforma tributária organizam as regras por tipo de tributo e área de aplicação.
            Clique nos artigos para ver os detalhes e impactos específicos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegislationBooks;
