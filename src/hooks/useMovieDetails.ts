import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { MovieDetails, Cast, Video } from '../config/types';

interface UseMovieDetailsResult {
  movie: MovieDetails | null;
  cast: Cast[];
  videos: Video[];
  loading: boolean;
  error: string | null;
}

export function useMovieDetails(movieId: string): UseMovieDetailsResult {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);

      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          tmdb.get(`/movie/${movieId}`),
          tmdb.get(`/movie/${movieId}/credits`),
          tmdb.get(`/movie/${movieId}/videos`)
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setVideos(videosData.results.filter((video: Video) => 
          video.type === 'Trailer' && video.site === 'YouTube'
        ).slice(0, 3));

      } catch (err) {
        setError('Error loading movie details. Please try again.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, cast, videos, loading, error };
}