import { fetchAPI } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import type { Person, MovieCredits, SeriesCredits } from '../types/domain';

export const personService = {
  async getPersonDetails(id: number): Promise<Person> {
    return fetchAPI<Person>(TMDB_ENDPOINTS.personDetails(id));
  },

  async getPersonMovieCredits(id: number): Promise<MovieCredits> {
    return fetchAPI<MovieCredits>(TMDB_ENDPOINTS.personMovieCredits(id));
  },

  async getPersonTvCredits(id: number): Promise<SeriesCredits> {
    return fetchAPI<SeriesCredits>(TMDB_ENDPOINTS.personTvCredits(id));
  },
};
