
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { QuoteIcon } from 'lucide-react';

interface ExpertQuoteProps {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

const ExpertQuote: React.FC<ExpertQuoteProps> = ({ name, role, quote, imageUrl }) => (
  <Card className="border border-gray-200 shadow-md h-full">
    <CardContent className="p-8 flex flex-col h-full">
      <div className="mb-6 flex items-center">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      
      <div className="flex-grow">
        <QuoteIcon className="h-8 w-8 text-orange-400 mb-4 opacity-50" />
        <p className="text-lg text-gray-800 italic leading-relaxed">
          "{quote}"
        </p>
      </div>
    </CardContent>
  </Card>
);

const ExpertQuotes = () => {
  const experts = [
    {
      name: "Ana Paula Silva",
      role: "Economista e Consultora Tributária",
      quote: "A reforma tributária representa o maior avanço fiscal das últimas décadas. Empresas que se adaptarem rapidamente terão vantagem competitiva significativa.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Carlos Mendes",
      role: "Presidente da Associação de Comércio",
      quote: "Para o varejo, a reforma traz a oportunidade de simplificar processos e reduzir custos de conformidade que hoje consomem recursos valiosos das empresas.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Daniela Oliveira",
      role: "Diretora de Políticas Públicas",
      quote: "A não-cumulatividade plena dos tributos corrigirá distorções históricas que prejudicavam a competitividade da indústria brasileira.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Ricardo Torres",
      role: "Professor de Direito Tributário",
      quote: "Esta reforma estabelece bases mais modernas e alinhadas com as melhores práticas internacionais, facilitando a integração global das empresas brasileiras.",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-4">O que os especialistas dizem</h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-orange-500 rounded"></div>
        </div>
        
        <div className="flex overflow-x-auto pb-6">
          <div className="flex gap-6">
            {experts.map((expert, index) => (
              <div key={index} className="w-80 flex-shrink-0">
                <ExpertQuote
                  name={expert.name}
                  role={expert.role}
                  quote={expert.quote}
                  imageUrl={expert.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertQuotes;
