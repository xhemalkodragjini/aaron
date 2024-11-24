// src/hooks/useSummaryGen.tsx
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

  
export function useSummaryGen() {
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const generateSummary = async (query: string, searchResults: SearchResult[]) => {
      if (!searchResults.length) return;
  
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch('/api/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: query.trim(),
            context: searchResults.map(result => ({
              content: result.content,
              metadata: result.metadata,
              score: result.score,
            })),
          }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to generate summary');
        }
  
        const data = await response.json();
        setSummary(data.summary);
        return data.summary;
  
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary';
        setError(errorMessage);
        throw err;
  
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      generateSummary,
      summary,
      isLoading,
      error,
      setSummary,  // Expose this to allow clearing summary
    };
  }