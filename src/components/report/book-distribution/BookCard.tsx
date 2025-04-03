
import React from 'react';
import { BookCardProps } from './types';

const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect }) => {
  return (
    <div 
      key={book.bookId} 
      className={`bg-card p-4 rounded-md border transition-all duration-150 ${isSelected ? 'shadow-md border-primary' : 'shadow-sm hover:shadow-md'}`}
      onClick={() => onSelect(book)}
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
  );
};

export default BookCard;
