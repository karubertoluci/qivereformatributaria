
/**
 * Clears the article cache for a specific segment or all segments
 * @param segmentId Optional segment ID to clear cache for just that segment
 */
export const clearArticleCache = (segmentId?: string) => {
  if (segmentId) {
    localStorage.removeItem(`segmentArticles_${segmentId}`);
    console.log(`Cleared article cache for segment: ${segmentId}`);
  } else {
    // Find all keys that start with segmentArticles_ and remove them
    const keysToRemove = Object.keys(localStorage).filter(
      key => key.startsWith('segmentArticles_')
    );
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared article cache for all segments (${keysToRemove.length} segments)`);
  }
};

/**
 * Checks if there is cached article data for a segment
 * @param segmentId The segment ID to check
 * @returns boolean indicating if cache exists
 */
export const hasArticleCache = (segmentId: string): boolean => {
  return localStorage.getItem(`segmentArticles_${segmentId}`) !== null;
};
