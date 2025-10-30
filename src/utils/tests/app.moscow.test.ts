import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useMediaList } from '../../hooks/useMediaList';
import { useSearch } from '../../hooks/useSearch';
import { mockMovies } from './__mocks__/apiMocks';
import { fetchAPI } from '../../api/apiClient';
import type { TMDBResponse } from '../../types/common';
vi.mock('../../api/apiClient');

const neverResolve = () => new Promise(() => {});

describe('Core Functionality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Media List - Success & Failure Cases', () => {
    it('Success: Should fetch movies successfully', async () => {
      const mockResponse: TMDBResponse<typeof mockMovies[0]> = {
        page: 1,
        results: mockMovies,
        total_pages: 10,
        total_results: 100,
      };
      vi.mocked(fetchAPI).mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      expect(result.current.loading).toBe(true);
      expect(result.current.items).toHaveLength(0);
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      expect(result.current.items).toHaveLength(3);
      expect(result.current.error).toBeNull();
      expect(result.current.hasMore).toBe(true);
    });

    it('Failure: Should handle API errors gracefully', async () => {
      vi.mocked(fetchAPI).mockRejectedValueOnce(new Error('API Error'));
      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      expect(result.current.error).toBe('Error loading movies. Please try again.');
      expect(result.current.items).toHaveLength(0);
    });

    it('Failure: Should handle network errors', async () => {
      vi.mocked(fetchAPI).mockRejectedValueOnce(new Error('Network error'));
      const { result } = renderHook(() => useMediaList('tv', 'popular'));
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      expect(result.current.error).toBe('Error loading series. Please try again.');
      expect(result.current.items).toHaveLength(0);
    });

    it('Should show loading state while fetching', () => {
      vi.mocked(fetchAPI).mockImplementation(neverResolve);
      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      expect(result.current.loading).toBe(true);
      expect(result.current.items).toHaveLength(0);
      expect(result.current.error).toBeNull();
    });

    it('Success: Should load more content with pagination', async () => {
      const mockResponse: TMDBResponse<typeof mockMovies[0]> = {
        page: 1,
        results: mockMovies,
        total_pages: 10,
        total_results: 100,
      };
      vi.mocked(fetchAPI).mockResolvedValue(mockResponse);
      const { result } = renderHook(() => useMediaList('movie', 'popular'));
      await waitFor(() => {
        expect(result.current.items).toHaveLength(3);
      });
      await act(async () => {
        result.current.loadMore();
      });
      await waitFor(() => {
        expect(fetchAPI).toHaveBeenCalledTimes(2);
      });
      expect(result.current.hasMore).toBe(true);
    });
  });

  describe('Search - Success & Failure Cases', () => {
    it('Success: Should search movies successfully', async () => {
      const searchResult = mockMovies.find((m) => m.title === 'Fight Club')!;
      const mockResponse: TMDBResponse<typeof searchResult> = {
        page: 1,
        results: [searchResult],
        total_pages: 1,
        total_results: 1,
      };
      vi.mocked(fetchAPI).mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => useSearch('Fight Club', 'movie'));
      await waitFor(
        () => {
          expect(result.current.results).toHaveLength(1);
        },
        { timeout: 1000 }
      );
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    it('Failure: Should handle search API errors', async () => {
      vi.mocked(fetchAPI).mockRejectedValueOnce(new Error('Search API Error'));
      const { result } = renderHook(() => useSearch('test query', 'movie'));
      await waitFor(
        () => {
          expect(result.current.error).toBe('Error searching. Please try again.');
        },
        { timeout: 1000 }
      );
      expect(result.current.results).toHaveLength(0);
      expect(result.current.loading).toBe(false);
    });

    it('Failure: Should return empty results for empty query', async () => {
      const { result } = renderHook(() => useSearch('', 'movie'));
      expect(result.current.results).toHaveLength(0);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      await waitFor(() => {
        expect(fetchAPI).not.toHaveBeenCalled();
      });
    });
  });
});
