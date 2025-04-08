
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { CompanyData } from '@/hooks/useResultsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import LegislationBooks from './LegislationBooks';
import ImpactDistributionChart from './ImpactDistributionChart';
import { useEffect, useState } from 'react';

interface CompanyLegislationRelationProps {
  segment: BusinessSegment;
  companyData?: CompanyData;
}

const CompanyLegislationRelation: React.FC<CompanyLegislationRelationProps> = ({
  segment,
  companyData
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookFilter, setSelectedBookFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      // Tentar carregar do localStorage primeiro
      const cachedArticles = localStorage.getItem('segmentArticles');
      if (cachedArticles) {
        setArticles(JSON.parse(cachedArticles));
        setLoading(false);
        return;
      }
      
      try {
        // Buscar impactos para o segmento
        const { data: impacts, error: impactsError } = await supabase
          .from('impactos')
          .select('artigo_id, tipo, descricao, relevancia')
          .eq('segmento_id', segment.id);
          
        if (impactsError) throw impactsError;
        
        if (!impacts || impacts.length === 0) {
          setLoading(false);
          return;
        }
        
        // Obter IDs dos artigos
        const articleIds = impacts.map(impact => impact.artigo_id);
        
        // Buscar detalhes dos artigos
        const { data: articles, error: articlesError } = await supabase
          .from('artigos')
          .select('id, numero, texto, texto_simplificado')
          .in('id', articleIds);
          
        if (articlesError) throw articlesError;
        
        if (articles) {
          // Formatar artigos para o formato esperado pelo componente
          const formattedArticles = articles.map(article => {
            const articleImpacts = impacts
              .filter(impact => impact.artigo_id === article.id)
              .map(impact => ({
                type: impact.tipo,
                description: impact.descricao,
                relevance: impact.relevancia,
                segments: [segment.id]
              }));
            
            return {
              id: `art_${article.id}`,
              number: article.numero.toString(),
              title: `Artigo ${article.numero}`,
              originalText: article.texto,
              simplifiedText: article.texto_simplificado || article.texto,
              impacts: articleImpacts
            };
          });
          
          setArticles(formattedArticles);
        }
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [segment.id]);

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

  if (loading) {
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
