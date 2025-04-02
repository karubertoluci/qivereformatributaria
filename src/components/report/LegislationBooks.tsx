
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Book, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LegislationBooksProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

const LegislationBooks: React.FC<LegislationBooksProps> = ({ articles, onSelectArticle }) => {
  // Define books of legislation
  const books = [
    { id: 'iva', name: 'Livro IVA', color: '#22c55e' },
    { id: 'cbs', name: 'Livro CBS', color: '#3b82f6' },
    { id: 'ibs', name: 'Livro IBS', color: '#f59e0b' },
    { id: 'is', name: 'Livro IS', color: '#8b5cf6' }
  ];
  
  // State to track which book is selected for filtering
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  
  // For demonstration, let's assign articles to books based on their ID
  const getArticleBook = (article: Article): string => {
    const id = parseInt(article.id);
    if (id % 4 === 0) return 'iva';
    if (id % 4 === 1) return 'cbs';
    if (id % 4 === 2) return 'ibs';
    return 'is';
  };
  
  // Count articles per book
  const bookCounts: Record<string, number> = {};
  
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    bookCounts[bookId] = (bookCounts[bookId] || 0) + 1;
  });
  
  // Create chart data
  const chartData = books.map(book => ({
    name: book.name,
    count: bookCounts[book.id] || 0,
    color: book.color,
    id: book.id
  })).sort((a, b) => b.count - a.count); // Sort by count (highest to lowest)
  
  // Group articles by book for the listing below the chart
  const articlesByBook: Record<string, Article[]> = {};
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    if (!articlesByBook[bookId]) {
      articlesByBook[bookId] = [];
    }
    articlesByBook[bookId].push(article);
  });

  // Filter articles based on selected book
  const filteredArticles = selectedBook 
    ? articles.filter(article => getArticleBook(article) === selectedBook)
    : articles;

  // Handle click on chart bar
  const handleBarClick = (data: any) => {
    if (data && data.id) {
      setSelectedBook(data.id === selectedBook ? null : data.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Artigos por Livro da Legislação
        </CardTitle>
        {selectedBook && (
          <Badge 
            variant="outline" 
            className="flex items-center gap-1 cursor-pointer hover:bg-secondary"
            onClick={() => setSelectedBook(null)}
          >
            <Filter className="h-3 w-3" />
            Filtrando: {books.find(b => b.id === selectedBook)?.name}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                label={{ value: 'Artigos', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip
                formatter={(value, name) => [`${value} artigos`, name]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="count" 
                barSize={60}
                className="cursor-pointer"
                onClick={(data) => handleBarClick(data)}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.id === selectedBook ? '#000' : entry.color}
                    strokeWidth={entry.id === selectedBook ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-4">
          {(selectedBook ? [books.find(b => b.id === selectedBook)!] : books).map(book => {
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
        
        {filteredArticles.length === 0 && (
          <div className="my-8 text-center text-muted-foreground">
            Nenhum artigo encontrado neste livro.
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
          <p>
            Os livros da reforma tributária organizam as regras por tipo de tributo e área de aplicação.
            Clique nas barras para filtrar os artigos por livro.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegislationBooks;
