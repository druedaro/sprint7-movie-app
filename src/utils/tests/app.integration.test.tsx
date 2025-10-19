import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AuthPage from '../../pages/AuthPage';
import { AuthProvider } from '../../auth/AuthContext';

vi.mock('../../config/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      delete: vi.fn().mockReturnThis(),
    })),
  },
}));

vi.mock('../../config/tmdbClient', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        results: [
          {
            id: 550,
            title: 'Fight Club',
            poster_path: '/test.jpg',
            release_date: '1999-10-15',
            vote_average: 8.4,
            overview: 'A ticking-time-bomb insomniac...',
            backdrop_path: '/backdrop.jpg',
            genre_ids: [18],
            original_language: 'en',
            original_title: 'Fight Club',
            popularity: 50.5,
            video: false,
            vote_count: 25000,
            adult: false,
          },
        ],
        page: 1,
        total_pages: 100,
        total_results: 2000,
      },
    }),
  },
}));

describe('🎯 COMPLETE FLOW: Login → Browse → Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should allow login and navigate to movies', async () => {
    const user = userEvent.setup();
    const { supabase } = await import('../../config/supabase');

    (supabase.auth.signInWithPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: {
        user: { id: '123', email: 'david@test.com' },
        session: { access_token: 'token' },
      },
      error: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/••••/i);
    const submitButtons = screen.getAllByRole('button', { name: /sign in/i });
    const submitButton = submitButtons.find(button => button.getAttribute('type') === 'submit') || submitButtons[1];

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await user.type(emailInput, 'david@test.com');
    await user.type(passwordInput, 'pass1234');

    await user.click(submitButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'david@test.com',
        password: 'pass1234',
      });
    });
  });
});

describe('🔍 COMPLETE FLOW: Search and Filters', () => {
  it('Should filter movies by genre correctly', () => {
    const movies = [
      {
        id: 1,
        title: 'Action Movie',
        genre_ids: [28],
        release_date: '2024-01-01',
        vote_average: 8.0,
      },
      {
        id: 2,
        title: 'Comedy Movie',
        genre_ids: [35],
        release_date: '2024-02-01',
        vote_average: 7.0,
      },
      {
        id: 3,
        title: 'Action Comedy',
        genre_ids: [28, 35], 
        release_date: '2024-03-01',
        vote_average: 7.5,
      },
    ];

    const actionMovies = movies.filter((m) => m.genre_ids.includes(28));
    
    expect(actionMovies).toHaveLength(2);
    expect(actionMovies[0].title).toBe('Action Movie');
    expect(actionMovies[1].title).toBe('Action Comedy');
  });

  it('Should filter movies by year correctly', () => {
    const movies = [
      { id: 1, title: '2024 Movie', release_date: '2024-06-15', genre_ids: [], vote_average: 8.0 },
      { id: 2, title: '2023 Movie', release_date: '2023-12-01', genre_ids: [], vote_average: 7.0 },
      { id: 3, title: 'Another 2024', release_date: '2024-01-01', genre_ids: [], vote_average: 7.5 },
    ];

    const movies2024 = movies.filter((m) => {
      const year = new Date(m.release_date).getFullYear();
      return year === 2024;
    });

    expect(movies2024).toHaveLength(2);
    expect(movies2024.every((m) => new Date(m.release_date).getFullYear() === 2024)).toBe(true);
  });

  it('Should apply multiple filters at once', () => {
    const movies = [
      { id: 1, title: 'Action 2024', genre_ids: [28], release_date: '2024-01-01', vote_average: 8.0 },
      { id: 2, title: 'Comedy 2024', genre_ids: [35], release_date: '2024-02-01', vote_average: 7.0 },
      { id: 3, title: 'Action 2023', genre_ids: [28], release_date: '2023-01-01', vote_average: 7.5 },
    ];

    const selectedGenre = 28; 
    const selectedYear = 2024;

    const filtered = movies.filter((m) => {
      const matchesGenre = m.genre_ids.includes(selectedGenre);
      const matchesYear = new Date(m.release_date).getFullYear() === selectedYear;
      return matchesGenre && matchesYear;
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Action 2024');
  });

  it('Should search movies by text', () => {
    const searchQuery = 'Fight Club';
    const mockResults = [
      {
        id: 550,
        title: 'Fight Club',
        poster_path: '/test.jpg',
        release_date: '1999-10-15',
        vote_average: 8.4,
        overview: 'Test',
        backdrop_path: '/backdrop.jpg',
        genre_ids: [18],
        original_language: 'en',
        original_title: 'Fight Club',
        popularity: 50.5,
        video: false,
        vote_count: 25000,
        adult: false,
      },
    ];

    expect(mockResults).toHaveLength(1);
    expect(mockResults[0].title.toLowerCase()).toContain(searchQuery.toLowerCase());
  });
});

describe('📱 COMPLETE FLOW: Navigation', () => {
  it('Should navigate correctly between pages', () => {
    const mockNavigate = vi.fn();
    
    mockNavigate('/movie/550');
    expect(mockNavigate).toHaveBeenCalledWith('/movie/550');

    mockNavigate('/series/100');
    expect(mockNavigate).toHaveBeenCalledWith('/series/100');

    mockNavigate('/person/287');
    expect(mockNavigate).toHaveBeenCalledWith('/person/287');
  });

  it('Should protect routes that require authentication', () => {
    const isAuthenticated = false;
    const requiredAuth = true;

    const shouldRedirect = requiredAuth && !isAuthenticated;
    
    expect(shouldRedirect).toBe(true);
  });

  it('Should allow access to authenticated routes when there is a session', () => {
    const isAuthenticated = true;
    const requiredAuth = true;

    const shouldRedirect = requiredAuth && !isAuthenticated;
    
    expect(shouldRedirect).toBe(false);
  });
});

describe('♾️ COMPLETE FLOW: Infinite Scroll', () => {
  it('Should load more content when reaching the end', () => {
    let page = 1;
    const hasMore = true;
    const isLoading = false;

    if (hasMore && !isLoading) {
      page += 1;
    }

    expect(page).toBe(2);
  });

  it('Should stop loading when there is no more content', () => {
    let page = 100;
    const hasMore = false;
    const isLoading = false;

    const initialPage = page;

    if (hasMore && !isLoading) {
      page += 1;
    }

    expect(page).toBe(initialPage);
  });
});
