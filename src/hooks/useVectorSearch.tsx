// src/hooks/useVectorSearch.ts
import { useState } from 'react';

export interface SearchResult {
  documentId: string;
  content: string;
  metadata: {
    title?: string;
    section?: string;
  };
  score: number;
}

interface SearchOptions {
  limit?: number;
  threshold?: number;
}

export function useVectorSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (query: string, options: SearchOptions = {}) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test-vectorsearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          limit: options.limit ?? 5,
          threshold: options.threshold,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Search failed. Please try again.');
      }

      const data = await response.json();
      const searchResults = data.results || [];
      setResults(searchResults);
      return searchResults;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    performSearch,
    results,
    isLoading,
    error,
    setResults,  // Expose this to allow clearing results
  };
}