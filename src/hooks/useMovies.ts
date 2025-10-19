import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { Movie } from '../config/types';

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export function useMovies(page: number = 1, genreId?: number): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = genreId
          ? `/discover/movie?with_genres=${genreId}&page=${page}`
          : `/movie/popular?page=${page}`;

        const data = await tmdb.get(endpoint);
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        setError('Error loading movies. Please try again.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, genreId]);

  return { movies, loading, error };
}