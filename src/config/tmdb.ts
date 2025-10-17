
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original'
  }
};

export const getImageUrl = (path: string | null, size: string = 'original'): string => {
  if (!path) return '/placeholder.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};


export const TMDB_ENDPOINTS = {
  popularMovies: `${TMDB_BASE_URL}/movie/popular`,
  topRatedMovies: `${TMDB_BASE_URL}/movie/top_rated`,
  upcomingMovies: `${TMDB_BASE_URL}/movie/upcoming`,
  movieDetails: (id: number) => `${TMDB_BASE_URL}/movie/${id}`,
  movieCredits: (id: number) => `${TMDB_BASE_URL}/movie/${id}/credits`,
  movieVideos: (id: number) => `${TMDB_BASE_URL}/movie/${id}/videos`,
  searchMovies: `${TMDB_BASE_URL}/search/movie`,
  movieGenres: `${TMDB_BASE_URL}/genre/movie/list`,
  

  popularSeries: `${TMDB_BASE_URL}/tv/popular`,
  topRatedSeries: `${TMDB_BASE_URL}/tv/top_rated`,
  seriesDetails: (id: number) => `${TMDB_BASE_URL}/tv/${id}`,
  seriesCredits: (id: number) => `${TMDB_BASE_URL}/tv/${id}/credits`,
  seriesVideos: (id: number) => `${TMDB_BASE_URL}/tv/${id}/videos`,
  searchSeries: `${TMDB_BASE_URL}/search/tv`,
  tvGenres: `${TMDB_BASE_URL}/genre/tv/list`,
  
  
  personDetails: (id: number) => `${TMDB_BASE_URL}/person/${id}`,
  personMovieCredits: (id: number) => `${TMDB_BASE_URL}/person/${id}/movie_credits`,
  personTvCredits: (id: number) => `${TMDB_BASE_URL}/person/${id}/tv_credits`,
};