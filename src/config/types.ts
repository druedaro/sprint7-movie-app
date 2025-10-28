// ========================================
// Media Types
// ========================================

export type MediaType = 'movie' | 'tv';

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export type SeriesCategory = 'popular' | 'top_rated';

// ========================================
// Authentication Types
// ========================================

export type AuthMode = 'login' | 'register';

// ========================================
// Component Variant Types
// ========================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

// ========================================
// Utility Types
// ========================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
