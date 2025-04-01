
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative'>('all');

  // Filtrar artigos que afetam o segmento selecionado
  const relevantArticles = articles.filter(article => 
    article.impacts.some(impact => impact.segments.includes(segment.id))
  );

  // Aplicar filtros de pesquisa e tipo de impacto
  const filteredArticles = relevantArticles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => {
      if (filterType === 'all') return true;
      return article.impacts.some(
        impact => impact.type === filterType && impact.segments.includes(segment.id)
      );
    });

  // Contagem de impactos positivos e negativos
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Button 
            variant="ghost" 
            className="mb-4 md:mb-0 hover:bg-secondary"
            onClick={onBackToSegments}
          >
            ← Voltar para segmentos
          </Button>
          <h2 className="text-2xl md:text-3xl font-bold">
            Resultados para {segment.name}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <Badge variant="outline" className={`${filterType === 'positive' ? 'bg-positive text-positive-foreground' : 'bg-secondary'} cursor-pointer px-3 py-1`} onClick={() => setFilterType(filterType === 'positive' ? 'all' : 'positive')}>
            <ArrowUp className="h-4 w-4 mr-1" /> Positivos ({positiveCount})
          </Badge>
          <Badge variant="outline" className={`${filterType === 'negative' ? 'bg-negative text-negative-foreground' : 'bg-secondary'} cursor-pointer px-3 py-1`} onClick={() => setFilterType(filterType === 'negative' ? 'all' : 'negative')}>
            <ArrowDown className="h-4 w-4 mr-1" /> Negativos ({negativeCount})
          </Badge>
        </div>
      </div>
      
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="pl-10 pr-4"
          placeholder="Pesquisar artigos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-6">
        <div className="bg-secondary p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Resumo dos Impactos</h3>
          <p className="text-sm text-gray-700">
            Encontramos {relevantArticles.length} artigos relevantes para o segmento "{segment.name}". 
            Destes, {positiveCount} apresentam impactos potencialmente positivos e {negativeCount} apresentam 
            pontos de atenção que podem impactar negativamente seu negócio.
          </p>
        </div>
        
        {filteredArticles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard 
              key={article.id}
              article={article}
              segmentId={segment.id}
              expanded={expandedArticleId === article.id}
              onToggleExpand={() => {
                setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
