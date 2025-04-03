
import React from 'react';
import { BookCardItemProps } from './types';

export const BookCardItem: React.FC<BookCardItemProps> = ({ book, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-3 rounded border cursor-pointer transition-all ${isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: book.color }}></span>
          {book.name}
        </h4>
        <span className="text-sm font-medium">{book.count} artigos</span>
      </div>
      
      <p className="text-xs text-muted-foreground mb-2">{book.description}</p>
      
      {/* Impact distribution */}
      <div className="flex gap-2 text-xs mt-2">
        <div className="flex-1 bg-green-50 p-1 rounded text-center">
          <span className="font-medium block text-green-700">{Math.round((book.positive / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
          <span className="text-green-600">Favorável</span>
        </div>
        <div className="flex-1 bg-gray-50 p-1 rounded text-center">
          <span className="font-medium block text-gray-700">{Math.round((book.neutral / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
          <span className="text-gray-600">Neutro</span>
        </div>
        <div className="flex-1 bg-red-50 p-1 rounded text-center">
          <span className="font-medium block text-red-700">{Math.round((book.negative / (book.positive + book.negative + book.neutral)) * 100) || 0}%</span>
          <span className="text-red-600">Desfavorável</span>
        </div>
      </div>
      
      {/* Top titles */}
      <div className="mt-2">
        <p className="text-xs font-medium">Principais títulos:</p>
        <ul className="text-xs text-muted-foreground space-y-1 mt-1">
          {book.titles.slice(0, 3).map((title, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{title.title}</span>
              <span>{title.count} artigos</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookCardItem;
