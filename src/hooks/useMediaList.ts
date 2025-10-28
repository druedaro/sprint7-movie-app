import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Movie, Series, TMDBResponse } from '../config/interfaces';

// Union type para los tipos de media que soportamos
type MediaItem = Movie | Series;

// Union type para las categorías disponibles
type MediaCategory = 'popular' | 'top_rated' | 'upcoming';

/**
 * Hook genérico para obtener listas de media (movies o series) con paginación
 */
export function useMediaList<T extends MediaItem>(
  mediaType: 'movie' | 'tv',
  category: MediaCategory = 'popular'
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Función para obtener el endpoint correcto basado en tipo y categoría
  const getEndpoint = (type: 'movie' | 'tv', cat: MediaCategory): string => {
    if (type === 'movie') {
      const movieEndpoints = {
        popular: TMDB_ENDPOINTS.popularMovies,
        top_rated: TMDB_ENDPOINTS.topRatedMovies,
        upcoming: TMDB_ENDPOINTS.upcomingMovies,
      };
      return movieEndpoints[cat];
    } else {
      const seriesEndpoints = {
        popular: TMDB_ENDPOINTS.popularSeries,
        top_rated: TMDB_ENDPOINTS.topRatedSeries,
        upcoming: TMDB_ENDPOINTS.popularSeries, // Fallback, series no tiene upcoming
      };
      return seriesEndpoints[cat];
    }
  };

  const fetchItems = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = getEndpoint(mediaType, category);
      const data = await fetchAPI<TMDBResponse<T>>(endpoint, { page: pageNum });

      if (reset) {
        setItems(data.results);
      } else {
        setItems((prev) => {
          // Eliminar duplicados basado en ID
          const existingIds = new Set(prev.map((item) => item.id));
          const unique = data.results.filter((item) => !existingIds.has(item.id));
          return [...prev, ...unique];
        });
      }

      setHasMore(pageNum < data.total_pages);
    } catch {
      setError(`Error loading ${mediaType === 'movie' ? 'movies' : 'series'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar datos cuando cambia la categoría
  useEffect(() => {
    setPage(1);
    setItems([]);
    fetchItems(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, category]);

  // Función para cargar más elementos (infinite scroll)
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchItems(nextPage);
    }
  };

  return { 
    items, 
    loading, 
    error, 
    loadMore, 
    hasMore 
  };
}