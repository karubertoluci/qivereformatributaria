
import { useState, useEffect } from 'react';

export const useErrorHandling = (fetchError: any) => {
  const [error, setError] = useState<string | null>(null);
  
  // Set error state from fetch error
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);

  return {
    error,
    setError
  };
};
