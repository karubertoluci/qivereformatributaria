
import React from 'react';
import { BOOK_META } from './types';

interface BookCardHeaderProps {
  bookId: string;
  bookMeta: typeof BOOK_META[0];
}

export const BookCardHeader: React.FC<BookCardHeaderProps> = ({ bookId, bookMeta }) => {
  return (
    <h3 className="font-medium text-sm mb-3 flex items-center gap-1.5">
      <span 
        className="w-3 h-3 rounded-full inline-block"
        style={{ backgroundColor: bookMeta.color }}
      ></span>
      <span className="text-gray-800">Livro {bookId}: {bookMeta.title}</span>
    </h3>
  );
};
