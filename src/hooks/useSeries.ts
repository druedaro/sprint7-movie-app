import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { Series } from '../config/types';

interface UseSeriesResult {
  series: Series[];
  loading: boolean;
  error: string | null;
}

export function useSeries(page: number = 1, genreId?: number): UseSeriesResult {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = genreId
          ? `/discover/tv?with_genres=${genreId}&page=${page}`
          : `/tv/popular?page=${page}`;

        const data = await tmdb.get(endpoint);
        
        if (page === 1) {
          setSeries(data.results);
        } else {
          setSeries(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        setError('Error loading series. Please try again.');
        console.error('Error fetching series:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [page, genreId]);

  return { series, loading, error };
}