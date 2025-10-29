import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';

import type { MovieDetails, SeriesDetails, Credits, Video } from '../config/interfaces';

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

        const detailsEndpoint = mediaType === 'movie' 
          ? TMDB_ENDPOINTS.movieDetails(id)
          : TMDB_ENDPOINTS.seriesDetails(id);
          
        const creditsEndpoint = mediaType === 'movie'
          ? TMDB_ENDPOINTS.movieCredits(id)
          : TMDB_ENDPOINTS.seriesCredits(id);
          
        const videosEndpoint = mediaType === 'movie'
          ? TMDB_ENDPOINTS.movieVideos(id)
          : TMDB_ENDPOINTS.seriesVideos(id);

        const [itemData, creditsData, videosData] = await Promise.all([
          fetchAPI<T>(detailsEndpoint),
          fetchAPI<Credits>(creditsEndpoint),
          fetchAPI<{ results: Video[] }>(videosEndpoint),
        ]);

        setItem(itemData);
        setCredits(creditsData);
        setVideos(videosData.results);
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