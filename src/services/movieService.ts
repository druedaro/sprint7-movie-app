import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Movie, MovieDetails, Credits, Video } from '../types/domain';
import type { TMDBResponse } from '../types/common';

export type MovieCategory = 'popular';


export const movieService = {
  async getMovies(page = 1): Promise<TMDBResponse<Movie>> {
    const endpoint = TMDB_ENDPOINTS.popularMovies;
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
