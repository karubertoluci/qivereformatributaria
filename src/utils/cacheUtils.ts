
/**
 * Limpa o cache de artigos para um segmento específico ou todos os segmentos
 * @param segmentId ID opcional do segmento para limpar apenas o cache desse segmento
 */
export const clearArticleCache = (segmentId?: string) => {
  if (segmentId) {
    localStorage.removeItem(`segmentArticles_${segmentId}`);
    console.log(`Cache de artigos limpo para o segmento: ${segmentId}`);
  } else {
    // Encontrar todas as chaves que começam com segmentArticles_ e removê-las
    const keysToRemove = Object.keys(localStorage).filter(
      key => key.startsWith('segmentArticles_')
    );
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cache de artigos limpo para todos os segmentos (${keysToRemove.length} segmentos)`);
  }
};

/**
 * Verifica se há dados de artigos em cache para um segmento
 * @param segmentId O ID do segmento para verificar
 * @returns boolean indicando se o cache existe
 */
export const hasArticleCache = (segmentId: string): boolean => {
  return localStorage.getItem(`segmentArticles_${segmentId}`) !== null;
};

/**
 * Força uma atualização dos dados dos artigos limpando o cache e, opcionalmente, recarregando a página
 */
export const forceArticleRefresh = (segmentId?: string) => {
  clearArticleCache(segmentId);
  // A recarga da página será feita pelo componente que chama esta função
};
