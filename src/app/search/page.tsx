"use client"
import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, AlertCircle } from 'lucide-react';

interface SearchResult {
  documentId: string;
  content: string;
  metadata: {
    title?: string;
    section?: string;
  };
  score: number;
}

const SemanticSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test-vectorsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          limit: 5,
          threshold: 0, // Adjust threshold as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed. Please try again.');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GCP Documentation Search</h1>
          <p className="mt-2 text-gray-600">
            Search through indexed Google Cloud documentation using semantic search
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How to configure automated backups in Cloud SQL?"
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {results.map((result, index) => (
            <div
              key={`${result.documentId}-${index}`}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
            >
              {result.metadata?.title && (
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {result.metadata.title}
                </h2>
              )}
              {result.metadata?.section && (
                <p className="text-sm text-gray-500 mb-2">
                  Section: {result.metadata.section}
                </p>
              )}
              <p className="text-gray-600 mb-4">{result.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Relevance Score: {(1 - result.score).toFixed(2)}
                </span>
                <a
                  href={`https://cloud.google.com/${result.documentId.replace(/-/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}

          {results.length === 0 && !isLoading && query && !error && (
            <div className="text-center py-12 text-gray-500">
              No results found. Try refining your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SemanticSearchPage;