import React from 'react';
import { RelevanceBookData } from './useRelevanceDistributionData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
      {bookData.map(book => <Card key={book.id} className={`border ${selectedBook === book.id ? 'border-2 border-primary' : 'border-muted'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Livro {book.id}: {book.description}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{
                backgroundColor: colorScheme.irrelevante
              }}></div>
                  <span className="text-sm">Irrelevante</span>
                </div>
                <span className="font-semibold">{book.irrelevante}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{
                backgroundColor: colorScheme.poucoRelevante
              }}></div>
                  <span>Pouco relevante</span>
                </div>
                <span className="font-semibold">{book.poucoRelevante}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{
                backgroundColor: colorScheme.moderadamenteRelevante
              }}></div>
                  <span>Moderadamente relevante</span>
                </div>
                <span className="font-semibold">{book.moderadamenteRelevante}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{
                backgroundColor: colorScheme.muitoRelevante
              }}></div>
                  <span>Muito relevante</span>
                </div>
                <span className="font-semibold">{book.muitoRelevante}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant={selectedBook === book.id ? "default" : "outline"} onClick={() => onSelectBook(book.id)} className="w-full text-sm">
              {selectedBook === book.id ? 'Remover filtro' : 'Filtrar'}
            </Button>
          </CardFooter>
        </Card>)}
    </div>;
};
export default RelevanceBookCards;