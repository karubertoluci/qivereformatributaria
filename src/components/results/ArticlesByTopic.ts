
import { Article } from '@/data/articles';
import { Topic } from './types';

// Tópicos relevantes da reforma tributária
export const topics: Topic[] = [
  { 
    id: "cbs", 
    name: "CBS - Contribuição sobre Bens e Serviços", 
    description: "Nova contribuição federal que substituirá PIS e COFINS",
    count: 0
  },
  { 
    id: "ibs", 
    name: "IBS - Imposto sobre Bens e Serviços", 
    description: "Novo imposto que substituirá ICMS e ISS",
    count: 0
  },
  { 
    id: "creditos", 
    name: "Créditos Tributários", 
    description: "Sistema de aproveitamento de créditos tributários",
    count: 0
  },
  { 
    id: "aliquotas", 
    name: "Alíquotas e Regimes Especiais", 
    description: "Alíquotas diferenciadas e regimes especiais de tributação",
    count: 0
  },
  { 
    id: "transicao", 
    name: "Regras de Transição", 
    description: "Períodos e regras para transição ao novo sistema tributário",
    count: 0
  }
];

// Function to classify articles by topic and update topic counts
export const getArticlesByTopic = (articleList: Article[]): Record<string, Article[]> => {
  const result: Record<string, Article[]> = {};
  
  // Initialize with empty topics
  topics.forEach(topic => {
    result[topic.id] = [];
  });
  
  // Simple classification by keywords in title or text
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
      // Default to CBS topic if no match found
      result.cbs.push(article);
    }
  });
  
  // Update topic counts
  topics.forEach(topic => {
    topic.count = result[topic.id].length;
  });
  
  return result;
};
