import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}


export interface Series {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
}


export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

export interface SeriesDetails extends Series {
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}



export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
}


export interface Credits {
  id: number;
  cast: CastMember[];
}


export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  popularity: number;
  also_known_as: string[];
}


export interface MovieCredits {
  id: number;
  cast: Movie[];
}


export interface SeriesCredits {
  id: number;
  cast: Series[];
}


export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
}


export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}





export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  created_at: string;
}


export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export type MediaType = 'movie' | 'tv';







export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export interface SeriesCardProps {
  series: Series;
  onClick: () => void;
}

export interface CastCardProps {
  cast: CastMember;
  onClick?: () => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export interface FilterProps {
  genres: Genre[];
  selectedGenre?: number;
  selectedYear?: number;
  onGenreChange: (genreId?: number) => void;
  onYearChange: (year?: number) => void;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export type SeriesCategory = 'popular' | 'top_rated';

export type AuthMode = 'login' | 'register';
