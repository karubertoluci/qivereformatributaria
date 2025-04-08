
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
        // Como não temos uma tabela de impactos, vamos usar diretamente a tabela livros_reforma
        const { data: livrosData, error: livrosError } = await supabase
          .from('livros_reforma' as any)
          .select('*');
          
        if (livrosError) throw livrosError;
        
        if (!livrosData || livrosData.length === 0) {
          setLoading(false);
          return;
        }
        
        // Formatar artigos para o formato esperado pelo componente
        const formattedArticles = livrosData.map(artigo => {
          // Criar um impacto padrão para cada artigo baseado no segmento
          const articleImpacts = [
            {
              type: "positive", // Tipo de impacto padrão
              description: `Artigo relacionado a ${segment.name}`,
              relevance: "medium",
              segments: [segment.id]
            }
          ];
          
          return {
            id: `art_${artigo.id}`,
            number: artigo.artigo || "N/A",
            title: `Artigo ${artigo.artigo || "N/A"}`,
            originalText: artigo.conteudo || "",
            simplifiedText: artigo.conteudo || "",
            impacts: articleImpacts,
            metadata: {
              livro: artigo.livro,
              titulo: artigo.titulo,
              capitulo: artigo.capitulo,
              secao: artigo.secao,
              subsecao: artigo.subsecao
            }
          };
        });
        
        setArticles(formattedArticles);
        
        // Armazenar os artigos em cache para este segmento para melhorar o desempenho
        localStorage.setItem(`segmentArticles_${segment.id}`, JSON.stringify(formattedArticles));
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
