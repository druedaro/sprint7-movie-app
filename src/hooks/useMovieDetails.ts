import { useState, useEffect } from 'react';
import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { MovieDetails, Credits, Video } from '../config/types';

export function useMovieDetails(movieId: number | undefined) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieData, creditsData, videosData] = await Promise.all([
          fetchAPI<MovieDetails>(TMDB_ENDPOINTS.movieDetails(movieId)),
          fetchAPI<Credits>(TMDB_ENDPOINTS.movieCredits(movieId)),
          fetchAPI<{ results: Video[] }>(TMDB_ENDPOINTS.movieVideos(movieId)),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData.results);
      } catch {
        setError('Error loading movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return { movie, credits, videos, loading, error };
}
