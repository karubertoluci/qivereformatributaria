
import React from 'react';
import { BookCardListProps } from './types';
import BookCardItem from './BookCard';
import { toast } from 'sonner';

export const BookCardList: React.FC<BookCardListProps> = ({ chartData, selectedBook, onSelectBook }) => {
  const handleSelectBook = (bookId: string) => {
    if (selectedBook === bookId) {
      onSelectBook('');
      toast.info("Filtro removido");
    } else {
      onSelectBook(bookId);
      const book = chartData.find(b => b.id === bookId);
      if (book) {
        toast.info(`Filtrando por ${book.name}`);
      }
    }
  };
  
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {chartData.map((book) => (
        <BookCardItem
          key={book.id}
          book={book}
          isSelected={selectedBook === book.id}
          onSelect={() => handleSelectBook(book.id)}
        />
      ))}
    </div>
  );
};

export default BookCardList;
