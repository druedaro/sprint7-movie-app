import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { seriesService } from '../services/seriesService';
import type { Movie, Series } from '../types/domain';
import type { MediaType } from '../types/common';

export function useSearch(query: string, mediaType: MediaType = 'movie') {
  const [results, setResults] = useState<(Movie | Series)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      async function performSearch() {
        try {
          setLoading(true);
          setError(null);

          const data = mediaType === 'movie'
            ? await movieService.searchMovies(query)
            : await seriesService.searchSeries(query);

          setResults(data.results || []);
        } catch {
          setError('Error searching. Please try again.');
        } finally {
          setLoading(false);
        }
      }

      performSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, mediaType]);

  return { results, loading, error };
}
