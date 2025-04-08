
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { CompanyData } from '@/hooks/useResultsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LegislationBooks from './LegislationBooks';
import ImpactDistributionChart from './ImpactDistributionChart';
import { useEffect, useState } from 'react';
import { useArticleData } from '@/hooks/article/useArticleData';

interface CompanyLegislationRelationProps {
  segment: BusinessSegment;
  companyData?: CompanyData;
}

const CompanyLegislationRelation: React.FC<CompanyLegislationRelationProps> = ({
  segment,
  companyData
}) => {
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);
  const { segmentArticles: articles, isLoading } = useArticleData(segment);

  const handleSelectArticle = (articleId: string) => {
    // Navegar para a aba de artigos e expandir o artigo selecionado
    const tabTrigger = document.querySelector('[value="articles"]');
    if (tabTrigger) {
      tabTrigger.dispatchEvent(new Event('click'));
      // Aguardar a mudança de tab antes de expandir o artigo
      setTimeout(() => {
        const articleElement = document.getElementById(`article-${articleId}`);
        if (articleElement) {
          articleElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Carregando dados da legislação...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Relação da Sua Empresa com a Legislação</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Livros da Legislação */}
        <LegislationBooks 
          articles={articles}
          onSelectArticle={handleSelectArticle} 
          selectedBook={selectedBookFilter}
          onSelectBook={setSelectedBookFilter}
        />
        
        {/* Distribuição de Impactos */}
        <ImpactDistributionChart 
          articles={articles} 
          segmentId={segment.id}
          bookId={selectedBookFilter}
        />
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>
          Esta análise mostra como sua empresa se relaciona com a reforma tributária, 
          destacando os livros e artigos mais relevantes para o seu segmento: 
          <strong> {segment.name}</strong>.
        </p>
      </div>
    </div>
  );
};

export default CompanyLegislationRelation;
