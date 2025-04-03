import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/data/articles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Book, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface LegislationBooksProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  selectedBook?: string | null;
  onSelectBook?: (bookId: string | null) => void;
}

const LegislationBooks: React.FC<LegislationBooksProps> = ({ 
  articles, 
  onSelectArticle,
  selectedBook: externalSelectedBook,
  onSelectBook
}) => {
  // Define books of legislation
  const books = [
    { id: 'I', name: 'Livro I: CBS', color: '#22c55e', description: 'Contribuição sobre Bens e Serviços' },
    { id: 'II', name: 'Livro II: IBS', color: '#3b82f6', description: 'Imposto sobre Bens e Serviços' },
    { id: 'III', name: 'Livro III: IS', color: '#8b5cf6', description: 'Imposto Seletivo' },
    { id: 'IV', name: 'Livro IV: Outras disposições', color: '#f59e0b', description: 'Disposições finais e transitórias' }
  ];
  
  // State to track which book is selected for filtering - use internal state if no external state provided
  const [internalSelectedBook, setInternalSelectedBook] = useState<string | null>(null);
  
  // Use either external or internal state depending on what's provided
  const selectedBook = externalSelectedBook !== undefined ? externalSelectedBook : internalSelectedBook;
  const setSelectedBook = onSelectBook || setInternalSelectedBook;
  
  // For demonstration, let's assign articles to books based on their ID
  const getArticleBook = (article: Article): string => {
    // If article has metadata.bookId, use that directly
    if (article.metadata?.bookId) {
      return article.metadata.bookId;
    }
    
    // Otherwise determine based on article number
    const id = parseInt(article.id.replace(/\D/g, '')) || parseInt(article.number.replace(/\D/g, ''));
    if (id < 150) return 'I';
    if (id >= 150 && id < 250) return 'II';
    if (id >= 250 && id < 350) return 'III';
    return 'IV';
  };
  
  // Count articles per book with more detailed counting
  const bookCounts: Record<string, {
    total: number, 
    positive: number, 
    negative: number, 
    neutral: number,
    titles: Record<string, number>
  }> = {};
  
  // Mock data for titles within books
  const bookTitles: Record<string, string[]> = {
    'I': ['Normas Gerais', 'Regimes Especiais', 'Alíquotas', 'Administração'],
    'II': ['Normas Gerais', 'Alíquotas', 'Regimes Especiais', 'Administração'],
    'III': ['Normas Gerais', 'Tabaco', 'Bebidas', 'Veículos'],
    'IV': ['Transição', 'Disposições Finais', 'Comitê Gestor', 'Outras']
  };
  
  // Initialize book structure
  books.forEach(book => {
    bookCounts[book.id] = { 
      total: 0, 
      positive: 0, 
      negative: 0, 
      neutral: 0,
      titles: {}
    };
    // Initialize titles
    bookTitles[book.id]?.forEach(title => {
      bookCounts[book.id].titles[title] = 0;
    });
  });
  
  // Count articles and categorize by book, impact type, and title
  articles.forEach(article => {
    const bookId = getArticleBook(article);
    const bookData = bookCounts[bookId];
    if (bookData) {
      bookData.total += 1;
      
      // Assign to a title (for demo purposes)
      const id = parseInt(article.id.replace(/\D/g, ''));
      const titleIndex = id % (bookTitles[bookId]?.length || 1);
      const title = bookTitles[bookId]?.[titleIndex] || 'Outros';
      bookData.titles[title] = (bookData.titles[title] || 0) + 1;
      
      // Count by impact type
      article.impacts.forEach(impact => {
        if (impact.type === 'positive') bookData.positive++;
        else if (impact.type === 'negative') bookData.negative++;
        else bookData.neutral++;
      });
    }
  });
  
  // Create chart data with exact counts and title breakdowns
  const chartData = books.map(book => {
    const bookData = bookCounts[book.id] || { total: 0, positive: 0, negative: 0, neutral: 0, titles: {} };
    const titleData = Object.entries(bookData.titles).map(([title, count]) => ({
      title,
      count
    }));
    
    return {
      id: book.id,
      name: book.name,
      count: bookData.total,
      positive: bookData.positive,
      negative: bookData.negative,
      neutral: bookData.neutral,
      color: book.color,
      titles: titleData,
      description: book.description
    };
  }).sort((a, b) => b.count - a.count); // Sort by count (highest to lowest)

  // Handle click on chart bar
  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedItem = data.activePayload[0].payload;
      if (clickedItem && clickedItem.id) {
        if (selectedBook === clickedItem.id) {
          // If clicking the same book, remove the filter
          setSelectedBook(null);
          toast.info("Filtro removido");
        } else {
          // Apply the filter for the clicked book
          setSelectedBook(clickedItem.id);
          toast.info(`Filtrando por ${clickedItem.name}`);
        }
      }
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
              onClick={handleBarClick}
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
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartData.map((book) => (
            <div 
              key={book.id} 
              className={`p-3 rounded border cursor-pointer transition-all ${book.id === selectedBook ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
              onClick={() => {
                if (selectedBook === book.id) {
                  setSelectedBook(null);
                  toast.info("Filtro removido");
                } else {
                  setSelectedBook(book.id);
                  toast.info(`Filtrando por ${book.name}`);
                }
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: book.color }}></span>
                  {book.name}
                </h4>
                <span className="text-sm font-medium">{book.count} artigos</span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{book.description}</p>
              
              {/* Impact distribution */}
              <div className="flex gap-2 text-xs mt-2">
                <div className="flex-1 bg-green-50 p-1 rounded text-center">
                  <span className="font-medium block text-green-700">{Math.round((book.positive / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
                  <span className="text-green-600">Favorável</span>
                </div>
                <div className="flex-1 bg-gray-50 p-1 rounded text-center">
                  <span className="font-medium block text-gray-700">{Math.round((book.neutral / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
                  <span className="text-gray-600">Neutro</span>
                </div>
                <div className="flex-1 bg-red-50 p-1 rounded text-center">
                  <span className="font-medium block text-red-700">{Math.round((book.negative / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
                  <span className="text-red-600">Desfavorável</span>
                </div>
              </div>
              
              {/* Top titles */}
              <div className="mt-2">
                <p className="text-xs font-medium">Principais títulos:</p>
                <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                  {book.titles.slice(0, 3).map((title, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{title.title}</span>
                      <span>{title.count} artigos</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
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
