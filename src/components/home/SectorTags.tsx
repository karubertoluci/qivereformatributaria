
import React from 'react';

interface SectorTagProps {
  name: string;
}

const SectorTag: React.FC<SectorTagProps> = ({ name }) => {
  return (
    <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
      {name}
    </div>
  );
};

const SectorTags = () => {
  const sectors = [
    "Agronegócio",
    "Automotivo",
    "Benefícios",
    "Bens de consumo",
    "Construção civil",
    "Educação",
    "Advocacia",
    "Farmacêutica",
    "e muito mais"
  ];
  
  return (
    <section className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-medium mb-6 text-center sm:text-left">Setores</h2>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {sectors.map((sector, index) => (
            <SectorTag key={index} name={sector} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorTags;
