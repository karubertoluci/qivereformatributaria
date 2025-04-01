
import React from 'react';
import { businessSegments, BusinessSegment } from '@/data/segments';

interface SegmentSelectorProps {
  onSelectSegment: (segment: BusinessSegment) => void;
}

const SegmentSelector: React.FC<SegmentSelectorProps> = ({ onSelectSegment }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Selecione seu Segmento de Atuação</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Para analisarmos os impactos da reforma tributária específicos para o seu negócio,
          escolha o segmento que melhor representa a sua empresa.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSegments.map((segment) => (
          <div 
            key={segment.id} 
            className="border rounded-lg p-6 cursor-pointer bg-white hover:border-primary transition-all"
            onClick={() => onSelectSegment(segment)}
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {segment.emoji}
              {segment.name}
            </h3>
            <p className="text-gray-600 mb-6">{segment.description}</p>
            <button 
              className="bg-primary text-white w-full py-3 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => onSelectSegment(segment)}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentSelector;
