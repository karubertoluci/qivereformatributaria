
import { Article } from '@/data/articles';
import { Topic } from './types';

// Tópicos relevantes da reforma tributária
export const topics: Topic[] = [
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
export const getArticlesByTopic = (articleList: Article[]): Record<string, Article[]> => {
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
