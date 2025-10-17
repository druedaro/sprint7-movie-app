
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export interface Movie {
  id: number;
  title: string;
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
  original_title: string;
  video: boolean;
}

export interface Series {
  id: number;
  name: string;
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
  original_name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MediaType = 'movie' | 'tv';

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export type SeriesCategory = 'popular' | 'top_rated';

export type AuthMode = 'login' | 'register';

export interface ProtectedRouteProps {
  children: ReactNode;
}