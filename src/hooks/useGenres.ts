import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { Genre } from '../config/types';

interface UseGenresResult {
  genres: Genre[];
  loading: boolean;
}

export function useGenres(type: 'movie' | 'tv' = 'movie'): UseGenresResult {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdb.get(`/genre/${type}/list`);
        setGenres(data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  return { genres, loading };
}