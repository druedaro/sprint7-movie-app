import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { seriesService } from '../services/seriesService';
import type { MovieDetails, SeriesDetails, Credits, Video } from '../types/domain';

type MediaDetailsItem = MovieDetails | SeriesDetails;

export function useMediaDetails<T extends MediaDetailsItem>(
  mediaType: 'movie' | 'tv',
  id: number | undefined
) {
  const [item, setItem] = useState<T | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMediaData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (mediaType === 'movie') {
          const [itemData, creditsData, videosData] = await Promise.all([
            movieService.getMovieDetails(id),
            movieService.getMovieCredits(id),
            movieService.getMovieVideos(id),
          ]);
          setItem(itemData as T);
          setCredits(creditsData);
          setVideos(videosData);
        } else {
          const [itemData, creditsData, videosData] = await Promise.all([
            seriesService.getSeriesDetails(id),
            seriesService.getSeriesCredits(id),
            seriesService.getSeriesVideos(id),
          ]);
          setItem(itemData as T);
          setCredits(creditsData);
          setVideos(videosData);
        }
      } catch {
        setError(`Error loading ${mediaType === 'movie' ? 'movie' : 'series'} details.`);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [id, mediaType]);

  return { item, credits, videos, loading, error };
}