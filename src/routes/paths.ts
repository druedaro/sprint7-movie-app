export const paths = {
  home: '/',
  auth: '/auth',
  
  movies: '/movies',
  movieDetails: (id: string | number = ':id') => `/movies/${id}`,
  series: '/series',
  seriesDetails: (id: string | number = ':id') => `/series/${id}`,
  actors: '/actors',
  actorDetails: (id: string | number = ':id') => `/actors/${id}`,
} as const;