
import React from 'react';

interface BookData {
  id: string;
  name: string;
  total: number;
  muitoRelevante: number;
  moderadamenteRelevante: number;
  poucoRelevante: number;
  irrelevante: number;
}

interface RelevanceBookCardsProps {
  bookData: BookData[];
  selectedBook: string | null;
  onSelectBook: (bookId: string | null) => void;
  colorScheme: Record<string, string>;
}

const RelevanceBookCards: React.FC<RelevanceBookCardsProps> = ({
  bookData,
  selectedBook,
  onSelectBook,
  colorScheme
}) => {
  const handleBookClick = (bookId: string) => {
    onSelectBook(bookId === selectedBook ? null : bookId);
  };
  
  if (!bookData || bookData.length === 0 || bookData.every(book => book.total === 0)) {
    return null;
  }
  
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {bookData.map((book) => (
        <div 
          key={book.id}
          className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedBook === book.id ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => handleBookClick(book.id)}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-base font-medium">{book.name}</h4>
            <span className="text-sm font-medium">{book.total} artigos</span>
          </div>
          
          <div className="space-y-2 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorScheme.muitoRelevante }}></div>
              <span className="text-xs">Muito relevante: {book.muitoRelevante}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorScheme.moderadamenteRelevante }}></div>
              <span className="text-xs">Moderadamente: {book.moderadamenteRelevante}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorScheme.poucoRelevante }}></div>
              <span className="text-xs">Pouco relevante: {book.poucoRelevante}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorScheme.irrelevante }}></div>
              <span className="text-xs">Irrelevante: {book.irrelevante}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelevanceBookCards;
