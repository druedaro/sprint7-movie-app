export const PATHS = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/login',        
  REGISTER: '/register', 

  MOVIES: '/movies',
  SERIES: '/series',
  MOVIE_DETAILS: '/movie/:id',
  SERIES_DETAILS: '/series/:id',
  ACTOR_DETAILS: '/person/:id',
} as const;

export const buildPath = {
  movieDetails: (id: number) => `/movie/${id}`,
  seriesDetails: (id: number) => `/series/${id}`,
  actorDetails: (id: number) => `/person/${id}`,
};
