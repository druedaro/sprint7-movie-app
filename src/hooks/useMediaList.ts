import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { seriesService } from '../services/seriesService';
import type { Movie, Series } from '../types/domain';

type MediaItem = Movie | Series;

export function useMediaList<T extends MediaItem>(
  mediaType: 'movie' | 'tv'
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = mediaType === 'movie'
        ? await movieService.getMovies(pageNum)
        : await seriesService.getSeries(pageNum);

      if (reset) {
        setItems(data.results as T[]);
      } else {
        setItems((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const unique = data.results.filter((item) => !existingIds.has(item.id));
          return [...prev, ...unique] as T[];
        });
      }

      setHasMore(pageNum < data.total_pages);
    } catch {
      setError(`Error loading ${mediaType === 'movie' ? 'movies' : 'series'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setItems([]);
    const fetchInitialItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = mediaType === 'movie'
          ? await movieService.getMovies(1)
          : await seriesService.getSeries(1);

        setItems(data.results as T[]);
        setHasMore(1 < data.total_pages);
      } catch {
        setError(`Error loading ${mediaType === 'movie' ? 'movies' : 'series'}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialItems();
  }, [mediaType]);

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