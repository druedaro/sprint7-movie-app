import type { Movie, User } from '../../../config/interfaces';

// ========================================
// Mock User Data
// ========================================

export const mockUser: User = {
  id: '123',
  email: 'david@test.com',
  created_at: '2024-01-01T00:00:00Z',
  user_metadata: {
    full_name: 'David Test User',
  },
};

// ========================================
// Mock Movie Data
// ========================================

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    original_title: 'Test Movie 1',
    poster_path: '/test1.jpg',
    backdrop_path: '/backdrop1.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 500,
    overview: 'This is a test movie overview',
    genre_ids: [28, 12],
    original_language: 'en',
    popularity: 1000,
    video: false,
    adult: false,
  },
  {
    id: 2,
    title: 'Test Movie 2',
    original_title: 'Test Movie 2',
    poster_path: '/test2.jpg',
    backdrop_path: '/backdrop2.jpg',
    release_date: '2024-02-01',
    vote_average: 7.2,
    vote_count: 350,
    overview: 'Another test movie',
    genre_ids: [35, 18],
    original_language: 'en',
    popularity: 800,
    video: false,
    adult: false,
  },
  {
    id: 3,
    title: 'Fight Club',
    original_title: 'Fight Club',
    poster_path: '/test3.jpg',
    backdrop_path: '/backdrop3.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
    vote_count: 25000,
    overview: 'A ticking-time-bomb insomniac...',
    genre_ids: [18],
    original_language: 'en',
    popularity: 50.5,
    video: false,
    adult: false,
  },
];

// ========================================
// Error Messages
// ========================================

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please check your connection and try again',
  FETCH_MOVIES_ERROR: 'Failed to fetch movies. Please try again.',
  SEARCH_ERROR: 'Error searching. Please try again.',
};

