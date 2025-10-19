import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Series, TMDBResponse, SeriesCategory } from '../config/types';

export function useSeries(category: SeriesCategory = 'popular') {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getEndpoint = (cat: SeriesCategory) => ({
    popular: TMDB_ENDPOINTS.popularSeries,
    top_rated: TMDB_ENDPOINTS.topRatedSeries,
  }[cat]);

  const fetchSeries = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAPI<TMDBResponse<Series>>(getEndpoint(category), { page: pageNum });

      if (reset) {
        setSeries(data.results);
      } else {
        setSeries((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const unique = data.results.filter((s) => !existingIds.has(s.id));
          return [...prev, ...unique];
        });
      }

      setHasMore(pageNum < data.total_pages);
    } catch {
      setError('Error loading series. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setSeries([]);
    fetchSeries(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSeries(nextPage);
    }
  };

  return { series, loading, error, loadMore, hasMore };
}
