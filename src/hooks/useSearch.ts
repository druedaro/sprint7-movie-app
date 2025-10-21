import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Movie, Series, TMDBResponse, MediaType } from '../config/types';

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

          const endpoint = mediaType === 'movie' ? TMDB_ENDPOINTS.searchMovies : TMDB_ENDPOINTS.searchSeries;
          const data = await fetchAPI<TMDBResponse<Movie | Series>>(endpoint, { query });

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
