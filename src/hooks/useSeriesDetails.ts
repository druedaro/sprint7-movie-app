import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { SeriesDetails, Credits, Video } from '../config/types';

export function useSeriesDetails(seriesId: number | undefined) {
  const [series, setSeries] = useState<SeriesDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId) return;

    const fetchSeriesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [seriesData, creditsData, videosData] = await Promise.all([
          fetchAPI<SeriesDetails>(TMDB_ENDPOINTS.seriesDetails(seriesId)),
          fetchAPI<Credits>(TMDB_ENDPOINTS.seriesCredits(seriesId)),
          fetchAPI<{ results: Video[] }>(TMDB_ENDPOINTS.seriesVideos(seriesId)),
        ]);

        setSeries(seriesData);
        setCredits(creditsData);
        setVideos(videosData.results);
      } catch {
        setError('Error loading series details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [seriesId]);

  return { series, credits, videos, loading, error };
}
