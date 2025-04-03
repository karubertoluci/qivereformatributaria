
import React from 'react';
import { BookCardProps } from './types';
import { BOOK_META } from './types';
import { BookCardHeader } from './BookCardHeader';
import { BookCardStats } from './BookCardStats';
import { BookCardButton } from './BookCardButton';

const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect }) => {
  const bookMeta = BOOK_META.find(meta => meta.id === book.bookId) || BOOK_META[0];
  
  return (
    <div 
      className={`bg-white p-4 rounded-md border transition-all ${isSelected ? 'shadow-md border-primary' : 'shadow-sm hover:shadow-md border-gray-200'}`}
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
    </div>
  );
};

export default BookCard;
