
import React from 'react';
import { BookCardProps } from './types';
import { BOOK_META } from './types';
import { BookCardHeader } from './BookCardHeader';
import { BookCardStats } from './BookCardStats';
import { BookCardButton } from './BookCardButton';
import { Card } from '@/components/ui/card';

const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect }) => {
  const bookMeta = BOOK_META.find(meta => meta.id === book.bookId) || BOOK_META[0];
  
  return (
    <Card 
      className={`bg-white p-4 rounded-md transition-all ${isSelected ? 'shadow-md border-primary border' : 'shadow-sm hover:shadow-md border border-gray-200'}`}
      onClick={() => onSelect(book)}
      style={{cursor: 'pointer'}}
    >
      <BookCardHeader bookId={book.bookId} bookMeta={bookMeta} />
      <BookCardStats 
        positiveImpacts={book.positiveImpacts} 
        negativeImpacts={book.negativeImpacts} 
        neutralImpacts={book.neutralImpacts} 
      />
      <BookCardButton />
    </Card>
  );
};

export default BookCard;
