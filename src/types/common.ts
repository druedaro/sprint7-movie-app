import type { ReactNode } from 'react';

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MediaType = 'movie' | 'tv';

export type MovieCategory = 'popular';

export type SeriesCategory = 'popular';

export type AuthMode = 'login' | 'register';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

import type { User } from './domain';

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}
