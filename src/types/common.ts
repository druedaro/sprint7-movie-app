import type { ReactNode } from 'react';

// API Response types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Application types
export type MediaType = 'movie' | 'tv';

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export type SeriesCategory = 'popular' | 'top_rated';

export type AuthMode = 'login' | 'register';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

// Auth types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Import User from domain types
import type { User } from './domain';

// Protected Route types
export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}
