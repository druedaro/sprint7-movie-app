import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Genre } from '../config/interfaces';
import type { MediaType } from '../config/types';

export function useGenres(mediaType: MediaType = 'movie') {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = mediaType === 'movie' ? TMDB_ENDPOINTS.movieGenres : TMDB_ENDPOINTS.tvGenres;
        const data = await fetchAPI<{ genres: Genre[] }>(endpoint);
        
        setGenres(data.genres || []);
      } catch {
        setError('Error loading genres.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [mediaType]);

  return { genres, loading, error };
}
