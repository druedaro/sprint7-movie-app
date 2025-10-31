import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Series, SeriesDetails, Credits, Video } from '../types/domain';
import type { TMDBResponse } from '../types/common';

export type SeriesCategory = 'popular';


export const seriesService = {
  async getSeries(page = 1): Promise<TMDBResponse<Series>> {
    const endpoint = TMDB_ENDPOINTS.popularSeries;
    return fetchAPI<TMDBResponse<Series>>(endpoint, { page });
  },

  async getSeriesDetails(id: number): Promise<SeriesDetails> {
    return fetchAPI<SeriesDetails>(TMDB_ENDPOINTS.seriesDetails(id));
  },

  async getSeriesCredits(id: number): Promise<Credits> {
    return fetchAPI<Credits>(TMDB_ENDPOINTS.seriesCredits(id));
  },

  async getSeriesVideos(id: number): Promise<Video[]> {
    const data = await fetchAPI<{ results: Video[] }>(TMDB_ENDPOINTS.seriesVideos(id));
    return data.results;
  },

  async searchSeries(query: string, page = 1): Promise<TMDBResponse<Series>> {
    return fetchAPI<TMDBResponse<Series>>(TMDB_ENDPOINTS.searchSeries, { query, page });
  },
};
