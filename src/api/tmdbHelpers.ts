import { buildImageUrl, buildApiUrl } from '../utils/formatters';
import { tmdbConfig } from '../config/tmdb';

// ========================================
// TMDB-specific API utilities
// ========================================

export const buildTmdbImageUrl = (path: string | null, size: string = 'original'): string => {
  return buildImageUrl(
    tmdbConfig.imageBaseUrl,
    path,
    size,
    'https://via.placeholder.com/500x750?text=No+Image'
  );
};

export const buildTmdbApiUrl = (
  endpoint: string,
  params: Record<string, string | number> = {}
): string => {
  const defaultParams = {
    api_key: tmdbConfig.apiKey,
    language: 'en-US',
    ...params
  };
  
  return buildApiUrl(tmdbConfig.baseUrl, endpoint, defaultParams);
};

export const fetchTmdbAPI = async <T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> => {
  const url = buildTmdbApiUrl(endpoint, params);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};