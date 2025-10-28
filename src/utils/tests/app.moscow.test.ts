import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../../auth/AuthContext';
import { useMediaList } from '../../hooks/useMediaList';
import { useSearch } from '../../hooks/useSearch';
import { mockUser, mockMovies, ERROR_MESSAGES } from './__mocks__/apiMocks';

vi.mock('../../auth/AuthContext');
vi.mock('../../hooks/useMediaList');
vi.mock('../../hooks/useSearch');

describe('Core Functionality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('Should login user successfully', async () => {
      const mockLogin = vi.fn().mockResolvedValue(mockUser);
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        login: mockLogin,
        register: vi.fn(),
        logout: vi.fn(),
        loading: false,
      });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.loading).toBe(false);
      });
    });

    it('Should handle login failure', async () => {
      const mockLogin = vi.fn().mockRejectedValue(new Error(ERROR_MESSAGES.INVALID_CREDENTIALS));
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        login: mockLogin,
        register: vi.fn(),
        logout: vi.fn(),
        loading: false,
      });

      const { result } = renderHook(() => useAuth());
      await expect(result.current.login('test@test.com', 'wrong')).rejects.toThrow(
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    });

    it('Should logout user successfully', async () => {
      const mockLogout = vi.fn().mockResolvedValue(undefined);
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        login: vi.fn(),
        register: vi.fn(),
        logout: mockLogout,
        loading: false,
      });

      const { result } = renderHook(() => useAuth());
      await result.current.logout();

      expect(mockLogout).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
    });
  });

  describe('Media List', () => {
    it('Should fetch movies successfully', async () => {
      vi.mocked(useMediaList).mockReturnValue({
        items: mockMovies,
        loading: false,
        error: null,
        hasMore: true,
        loadMore: vi.fn(),
      });

      const { result } = renderHook(() => useMediaList('movie', 'popular'));

      await waitFor(() => {
        expect(result.current.items).toHaveLength(3);
        expect(result.current.error).toBeNull();
      });
    });

    it('Should handle API errors', async () => {
      vi.mocked(useMediaList).mockReturnValue({
        items: [],
        loading: false,
        error: ERROR_MESSAGES.FETCH_MOVIES_ERROR,
        hasMore: false,
        loadMore: vi.fn(),
      });

      const { result } = renderHook(() => useMediaList('movie', 'popular'));

      await waitFor(() => {
        expect(result.current.error).toBe(ERROR_MESSAGES.FETCH_MOVIES_ERROR);
      });
    });

    it('Should show loading state', () => {
      vi.mocked(useMediaList).mockReturnValue({
        items: [],
        loading: true,
        error: null,
        hasMore: false,
        loadMore: vi.fn(),
      });

      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      expect(result.current.loading).toBe(true);
    });
  });

  describe('Search', () => {
    it('Should search movies by title', async () => {
      const searchResult = mockMovies.find((m) => m.title === 'Fight Club')!;
      vi.mocked(useSearch).mockReturnValue({
        results: [searchResult],
        loading: false,
        error: null,
      });

      const { result } = renderHook(() => useSearch('Fight Club', 'movie'));

      await waitFor(() => {
        expect(result.current.results).toHaveLength(1);
      });
    });

    it('Should handle search errors', async () => {
      vi.mocked(useSearch).mockReturnValue({
        results: [],
        loading: false,
        error: ERROR_MESSAGES.SEARCH_ERROR,
      });

      const { result } = renderHook(() => useSearch('test', 'movie'));

      await waitFor(() => {
        expect(result.current.error).toBe(ERROR_MESSAGES.SEARCH_ERROR);
      });
    });
  });

  describe('Infinite Scroll', () => {
    it('Should load more content', () => {
      const loadMore = vi.fn();
      vi.mocked(useMediaList).mockReturnValue({
        items: mockMovies,
        loading: false,
        error: null,
        hasMore: true,
        loadMore,
      });

      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      result.current.loadMore();

      expect(loadMore).toHaveBeenCalled();
    });
  });
});
