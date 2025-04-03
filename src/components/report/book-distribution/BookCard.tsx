
import React from 'react';
import { BookCardProps } from './types';

const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect }) => {
  // Get the appropriate dot color for the book
  const getDotColor = () => {
    switch (book.bookId) {
      case 'I': return '#3b82f6'; // Blue for Livro I: CBS
      case 'II': return '#f59e0b'; // Orange for Livro II: IBS
      case 'III': return '#8b5cf6'; // Purple for Livro III: IS
      case 'IV': return '#10b981'; // Green for Livro IV
      default: return '#3b82f6';
    }
  };

  const bookTitles = {
    'I': 'CBS',
    'II': 'IBS',
    'III': 'IS',
    'IV': 'Outras disposições'
  };

  return (
    <div 
      className={`bg-white p-4 rounded-md border transition-all ${isSelected ? 'shadow-md border-primary' : 'shadow-sm hover:shadow-md border-gray-200'}`}
      onClick={() => onSelect(book)}
      style={{cursor: 'pointer'}}
    >
      <h3 className="font-medium text-sm mb-3 flex items-center gap-1.5">
        <span 
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: getDotColor() }}
        ></span>
        <span className="text-gray-800">Livro {book.bookId}: {bookTitles[book.bookId as keyof typeof bookTitles]}</span>
      </h3>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-50 p-2 rounded">
          <div className="font-bold text-green-600 text-lg">{book.positiveImpacts}</div>
          <div className="text-xs text-green-600">Favoráveis</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="font-bold text-gray-500 text-lg">{book.neutralImpacts}</div>
          <div className="text-xs text-gray-500">Neutros</div>
        </div>
        <div className="bg-red-50 p-2 rounded">
          <div className="font-bold text-red-500 text-lg">{book.negativeImpacts}</div>
          <div className="text-xs text-red-500">Desfavoráveis</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default BookCard;
