import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Movie, MovieDetails, Credits, Video } from '../types/domain';
import type { TMDBResponse } from '../types/common';

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

const ENDPOINTS_MAP: Record<MovieCategory, string> = {
  popular: TMDB_ENDPOINTS.popularMovies,
  top_rated: TMDB_ENDPOINTS.topRatedMovies,
  upcoming: TMDB_ENDPOINTS.upcomingMovies,
};

export const movieService = {
  async getMovies(category: MovieCategory = 'popular', page = 1): Promise<TMDBResponse<Movie>> {
    const endpoint = ENDPOINTS_MAP[category];
    return fetchAPI<TMDBResponse<Movie>>(endpoint, { page });
  },

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return fetchAPI<MovieDetails>(TMDB_ENDPOINTS.movieDetails(id));
  },

  async getMovieCredits(id: number): Promise<Credits> {
    return fetchAPI<Credits>(TMDB_ENDPOINTS.movieCredits(id));
  },

  async getMovieVideos(id: number): Promise<Video[]> {
    const data = await fetchAPI<{ results: Video[] }>(TMDB_ENDPOINTS.movieVideos(id));
    return data.results;
  },

  async searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
    return fetchAPI<TMDBResponse<Movie>>(TMDB_ENDPOINTS.searchMovies, { query, page });
  },
};
