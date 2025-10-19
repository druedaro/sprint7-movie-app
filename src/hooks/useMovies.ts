import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Movie, TMDBResponse, MovieCategory } from '../config/types';

export function useMovies(category: MovieCategory = 'popular') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getEndpoint = (cat: MovieCategory) => {
    const endpoints = {
      popular: TMDB_ENDPOINTS.popularMovies,
      top_rated: TMDB_ENDPOINTS.topRatedMovies,
      upcoming: TMDB_ENDPOINTS.upcomingMovies,
    };
    return endpoints[cat];
  };

  const fetchMovies = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAPI<TMDBResponse<Movie>>(getEndpoint(category), { page: pageNum });

      if (reset) {
        setMovies(data.results);
      } else {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const unique = data.results.filter((m) => !existingIds.has(m.id));
          return [...prev, ...unique];
        });
      }

      setHasMore(pageNum < data.total_pages);
    } catch {
      setError('Error loading movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  return { movies, loading, error, loadMore, hasMore };
}
