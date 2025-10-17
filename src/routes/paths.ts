export const PATHS = {
  HOME: '/',
  AUTH: '/auth',
  MOVIES: '/movies',
  MOVIE_DETAILS: '/movie/:id',
  SERIES: '/series',
  SERIES_DETAILS: '/series/:id',
  ACTOR_DETAILS: '/actor/:id',
} as const;

export const buildPath = {
  movieDetails: (id: number) => `/movie/${id}`,
  seriesDetails: (id: number) => `/series/${id}`,
  actorDetails: (id: number) => `/actor/${id}`,
};