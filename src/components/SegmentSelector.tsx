
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { businessSegments, BusinessSegment } from '@/data/segments';

interface SegmentSelectorProps {
  onSelectSegment: (segment: BusinessSegment) => void;
}

const SegmentSelector: React.FC<SegmentSelectorProps> = ({ onSelectSegment }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Selecione seu Segmento de Atuação</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Para analisarmos os impactos da reforma tributária específicos para o seu negócio, 
          escolha o segmento que melhor representa a sua empresa.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businessSegments.map((segment) => (
          <Card 
            key={segment.id} 
            className="card-gradient hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
            onClick={() => onSelectSegment(segment)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{segment.name}</CardTitle>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Selecionar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SegmentSelector;
