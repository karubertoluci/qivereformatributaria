
import React from 'react';
import { RelevanceBookData } from './useRelevanceDistributionData';

interface RelevanceBookCardsProps {
  bookData: RelevanceBookData[];
  selectedBook: string | null;
  onSelectBook: (bookId: string | null) => void;
  colorScheme: {
    muitoRelevante: string;
    moderadamenteRelevante: string;
    poucoRelevante: string;
    irrelevante: string;
  };
}

const RelevanceBookCards: React.FC<RelevanceBookCardsProps> = ({
  bookData,
  selectedBook,
  onSelectBook,
  colorScheme
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {bookData.map((book) => (
        <div 
          key={book.id}
          className={`bg-gray-50 p-3 rounded-lg border cursor-pointer hover:shadow transition-shadow
            ${selectedBook === book.id ? 'ring-2 ring-primary shadow-sm' : ''}`}
          onClick={() => onSelectBook(book.id)}
        >
          <div className="font-semibold mb-1">
            {book.name}: {book.description}
          </div>
          
          <div className="space-y-1 text-sm mb-2">
            <div className="flex justify-between">
              <span className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-sm mr-1.5"
                  style={{ backgroundColor: colorScheme.irrelevante }}
                ></span>
                Irrelevante
              </span>
              <span>{book.irrelevante}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-sm mr-1.5"
                  style={{ backgroundColor: colorScheme.poucoRelevante }}
                ></span>
                Pouco relevante
              </span>
              <span>{book.poucoRelevante}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-sm mr-1.5"
                  style={{ backgroundColor: colorScheme.moderadamenteRelevante }}
                ></span>
                Moderadamente
              </span>
              <span>{book.moderadamenteRelevante}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-sm mr-1.5"
                  style={{ backgroundColor: colorScheme.muitoRelevante }}
                ></span>
                Muito relevante
              </span>
              <span>{book.muitoRelevante}</span>
            </div>
          </div>
          
          <button 
            className="w-full mt-1 text-xs py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded text-center"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBook(selectedBook === book.id ? null : book.id);
            }}
          >
            Filtrar
          </button>
        </div>
      ))}
    </div>
  );
};

export default RelevanceBookCards;
