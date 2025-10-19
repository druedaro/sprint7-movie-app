import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { SeriesDetails, Cast, Video } from '../config/types';

interface UseSeriesDetailsResult {
  series: SeriesDetails | null;
  cast: Cast[];
  videos: Video[];
  loading: boolean;
  error: string | null;
}

export function useSeriesDetails(seriesId: string): UseSeriesDetailsResult {
  const [series, setSeries] = useState<SeriesDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      if (!seriesId) return;

      setLoading(true);
      setError(null);

      try {
        const [seriesData, creditsData, videosData] = await Promise.all([
          tmdb.get(`/tv/${seriesId}`),
          tmdb.get(`/tv/${seriesId}/credits`),
          tmdb.get(`/tv/${seriesId}/videos`)
        ]);

        setSeries(seriesData);
        setCast(creditsData.cast.slice(0, 10)); 
        setVideos(videosData.results.filter((video: Video) => 
          video.type === 'Trailer' && video.site === 'YouTube'
        ).slice(0, 3)); 

      } catch (err) {
        setError('Error loading series details. Please try again.');
        console.error('Error fetching series details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [seriesId]);

  return { series, cast, videos, loading, error };
}