const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

if (!TMDB_API_KEY || !TMDB_BASE_URL || !TMDB_IMAGE_BASE_URL) {
  throw new Error(
    'Missing TMDB environment variables. ' +
    'Please check your .env.local file.'
  );
}

export const tmdbConfig = {
  apiKey: TMDB_API_KEY,
  baseUrl: TMDB_BASE_URL,
  imageBaseUrl: TMDB_IMAGE_BASE_URL,
};

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
};


export function getImageUrl(path: string | null, size: string = 'original'): string {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// TODO: Migrate to use buildTmdbImageUrl from api/tmdbHelpers.ts for better separation of concerns



export const TMDB_ENDPOINTS = {
  popularMovies: '/movie/popular',
  topRatedMovies: '/movie/top_rated',
  upcomingMovies: '/movie/upcoming',
  movieDetails: (id: number) => `/movie/${id}`,
  movieCredits: (id: number) => `/movie/${id}/credits`,
  movieVideos: (id: number) => `/movie/${id}/videos`,
  searchMovies: '/search/movie',
  
  popularSeries: '/tv/popular',
  topRatedSeries: '/tv/top_rated',
  seriesDetails: (id: number) => `/tv/${id}`,
  seriesCredits: (id: number) => `/tv/${id}/credits`,
  seriesVideos: (id: number) => `/tv/${id}/videos`,
  searchSeries: '/search/tv',
  
  personDetails: (id: number) => `/person/${id}`,
  personMovieCredits: (id: number) => `/person/${id}/movie_credits`,
  personTvCredits: (id: number) => `/person/${id}/tv_credits`,
  
  movieGenres: '/genre/movie/list',
  tvGenres: '/genre/tv/list',
};
