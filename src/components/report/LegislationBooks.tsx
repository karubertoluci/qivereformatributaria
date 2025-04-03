
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  LegislationBooksProps,
  LegislationBarChart,
  BookCardList,
  ChartHelp,
  prepareChartData,
  BOOK_DEFINITIONS
} from './legislation-books';

const LegislationBooks: React.FC<LegislationBooksProps> = ({ 
  articles, 
  onSelectArticle,
  selectedBook: externalSelectedBook,
  onSelectBook
}) => {
  // State to track which book is selected for filtering - use internal state if no external state provided
  const [internalSelectedBook, setInternalSelectedBook] = useState<string | null>(null);
  
  // Use either external or internal state depending on what's provided
  const selectedBook = externalSelectedBook !== undefined ? externalSelectedBook : internalSelectedBook;
  const setSelectedBook = onSelectBook || setInternalSelectedBook;
  
  // Prepare chart data
  const chartData = prepareChartData(articles);

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
            Filtrando: {BOOK_DEFINITIONS.find(b => b.id === selectedBook)?.name}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <LegislationBarChart 
          chartData={chartData} 
          selectedBook={selectedBook} 
          handleBarClick={handleBarClick} 
        />
        
        <BookCardList 
          chartData={chartData} 
          selectedBook={selectedBook} 
          onSelectBook={(bookId) => setSelectedBook(bookId === selectedBook ? null : bookId)} 
        />
        
        <ChartHelp />
      </CardContent>
    </Card>
  );
};

export default LegislationBooks;
