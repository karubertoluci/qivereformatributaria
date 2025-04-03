
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Filter, X } from 'lucide-react';
import { toast } from 'sonner';
import { BookDistributionChartProps } from './book-distribution/types';
import { useBookDistributionData } from './book-distribution/useBookDistributionData';
import ChartDisplay from './book-distribution/ChartDisplay';
import BookCard from './book-distribution/BookCard';
import ChartHelp from './book-distribution/ChartHelp';

const BookDistributionChart: React.FC<BookDistributionChartProps> = ({
  articles,
  onSelectBook,
  selectedBook
}) => {
  const data = useBookDistributionData(articles);
  
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
      <CardHeader className="pb-2">
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
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
        <ChartDisplay 
          data={data} 
          selectedBook={selectedBook} 
          onBarClick={handleBarClick} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {data.map((book) => (
            <BookCard
              key={book.bookId}
              book={book}
              isSelected={selectedBook === book.bookId}
              onSelect={() => handleBarClick(book)}
            />
          ))}
        </div>
        
        <ChartHelp />
      </CardContent>
    </Card>
  );
};

export default BookDistributionChart;
