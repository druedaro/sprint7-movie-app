import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { Movie, Series } from '../config/types';

interface UseSearchResult {
  results: (Movie | Series)[];
  loading: boolean;
  error: string | null;
}

export function useSearch(query: string, type: 'movie' | 'tv' = 'movie'): UseSearchResult {
  const [results, setResults] = useState<(Movie | Series)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await tmdb.get(`/search/${type}?query=${encodeURIComponent(query)}`);
        setResults(data.results);
      } catch (err) {
        setError('Error searching. Please try again.');
        console.error('Error searching:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchContent();
  }, [query, type]);

  return { results, loading, error };
}