
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { BusinessSegment } from '@/data/segments';
import { Article, articles } from '@/data/articles';
import { ArrowDown, ArrowUp, Search, Filter, BookOpen, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ArticlesPriorityChart from './ArticlesPriorityChart';

interface ResultsProps {
  segment: BusinessSegment;
  onBackToSegments: () => void;
}

type Topic = {
  id: string;
  name: string;
  description: string;
};

// Tópicos relevantes da reforma tributária
const topics: Topic[] = [
  { 
    id: "cbs", 
    name: "CBS - Contribuição sobre Bens e Serviços", 
    description: "Nova contribuição federal que substituirá PIS e COFINS" 
  },
  { 
    id: "ibs", 
    name: "IBS - Imposto sobre Bens e Serviços", 
    description: "Novo imposto que substituirá ICMS e ISS" 
  },
  { 
    id: "creditos", 
    name: "Créditos Tributários", 
    description: "Sistema de aproveitamento de créditos tributários" 
  },
  { 
    id: "aliquotas", 
    name: "Alíquotas e Regimes Especiais", 
    description: "Alíquotas diferenciadas e regimes especiais de tributação" 
  },
  { 
    id: "transicao", 
    name: "Regras de Transição", 
    description: "Períodos e regras para transição ao novo sistema tributário" 
  }
];

// Função para classificar artigos por tópico
const getArticlesByTopic = (articleList: Article[]): Record<string, Article[]> => {
  const result: Record<string, Article[]> = {};
  
  // Inicializa com tópicos vazios
  topics.forEach(topic => {
    result[topic.id] = [];
  });
  
  // Classificação simplificada por palavras-chave no título ou texto
  articleList.forEach(article => {
    const text = (article.title + article.simplifiedText).toLowerCase();
    
    if (text.includes("cbs") || text.includes("contribuição")) {
      result.cbs.push(article);
    } else if (text.includes("ibs") || text.includes("imposto sobre bens")) {
      result.ibs.push(article);
    } else if (text.includes("crédito") || text.includes("aproveitamento")) {
      result.creditos.push(article);
    } else if (text.includes("alíquota") || text.includes("redução") || text.includes("regime")) {
      result.aliquotas.push(article);
    } else if (text.includes("transição") || text.includes("vigência")) {
      result.transicao.push(article);
    } else {
      // Coloca no tópico CBS por padrão se não encontrar correspondência
      result.cbs.push(article);
    }
  });
  
  return result;
};

const Results: React.FC<ResultsProps> = ({ segment, onBackToSegments }) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'chart'>('chart');

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

  // Organizar artigos por tópico
  const articlesByTopic = getArticlesByTopic(filteredArticles);

  // Contagem de impactos positivos e negativos
  const positiveCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'positive' && impact.segments.includes(segment.id))
  ).length;
  
  const negativeCount = relevantArticles.filter(article => 
    article.impacts.some(impact => impact.type === 'negative' && impact.segments.includes(segment.id))
  ).length;
  
  const handleArticleSelect = (articleId: string) => {
    setExpandedArticleId(articleId);
    // Scroll to the article if in list view
    if (viewMode === 'chart') {
      setViewMode('list');
      // Give time for the view to switch before scrolling
      setTimeout(() => {
        const element = document.getElementById(`article-${articleId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

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

      <div className="bg-secondary p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Resumo dos Impactos</h3>
        <p className="text-sm text-gray-700">
          Encontramos {relevantArticles.length} artigos relevantes para o segmento "{segment.name}". 
          Destes, {positiveCount} apresentam impactos potencialmente positivos e {negativeCount} apresentam 
          pontos de atenção que podem impactar negativamente seu negócio.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={viewMode === 'chart' ? 'bg-primary text-primary-foreground' : ''}
            onClick={() => setViewMode('chart')}
          >
            <BarChart className="h-4 w-4 mr-1" /> Prioridade
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
            onClick={() => setViewMode('list')}
          >
            <BookOpen className="h-4 w-4 mr-1" /> Lista
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={viewMode === 'table' ? 'bg-primary text-primary-foreground' : ''}
            onClick={() => setViewMode('table')}
          >
            <Filter className="h-4 w-4 mr-1" /> Tabela
          </Button>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum artigo encontrado com os filtros aplicados.</p>
        </div>
      ) : (
        <>
          {viewMode === 'chart' && (
            <div className="mb-8">
              <ArticlesPriorityChart 
                articles={filteredArticles}
                segmentId={segment.id}
                onSelectArticle={handleArticleSelect}
              />
            </div>
          )}
          
          {viewMode === 'list' && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos os Artigos</TabsTrigger>
                {topics.map(topic => (
                  <TabsTrigger key={topic.id} value={topic.id}>
                    {topic.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-6">
                  {filteredArticles.map((article) => (
                    <div key={article.id} id={`article-${article.id}`}>
                      <ArticleCard 
                        article={article}
                        segmentId={segment.id}
                        expanded={expandedArticleId === article.id}
                        onToggleExpand={() => {
                          setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {topics.map(topic => (
                <TabsContent key={topic.id} value={topic.id}>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                  
                  <div className="space-y-6">
                    {articlesByTopic[topic.id].length > 0 ? (
                      articlesByTopic[topic.id].map((article) => (
                        <div key={article.id} id={`article-${article.id}`}>
                          <ArticleCard 
                            article={article}
                            segmentId={segment.id}
                            expanded={expandedArticleId === article.id}
                            onToggleExpand={() => {
                              setExpandedArticleId(expandedArticleId === article.id ? null : article.id);
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Nenhum artigo encontrado nesta categoria.</p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
          
          {viewMode === 'table' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artigo</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Impacto</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => {
                  const segmentImpacts = article.impacts.filter(impact => 
                    impact.segments.includes(segment.id)
                  );
                  const hasPositiveImpact = segmentImpacts.some(impact => impact.type === 'positive');
                  const hasNegativeImpact = segmentImpacts.some(impact => impact.type === 'negative');
                  
                  return (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.number}</TableCell>
                      <TableCell>{article.title}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {hasPositiveImpact && (
                            <Badge variant="outline" className="bg-positive text-positive-foreground">
                              <ArrowUp className="h-3 w-3 mr-1" /> Positivo
                            </Badge>
                          )}
                          {hasNegativeImpact && (
                            <Badge variant="outline" className="bg-negative text-negative-foreground">
                              <ArrowDown className="h-3 w-3 mr-1" /> Negativo
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setExpandedArticleId(expandedArticleId === article.id ? null : article.id)}
                        >
                          {expandedArticleId === article.id ? "Fechar" : "Ver mais"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}
      
      {expandedArticleId && viewMode === 'table' && (
        <div className="mt-6 p-4 border rounded-lg">
          <ArticleCard 
            article={articles.find(a => a.id === expandedArticleId)!}
            segmentId={segment.id}
            expanded={true}
            onToggleExpand={() => setExpandedArticleId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
