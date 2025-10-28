import { buildApiUrl } from '../utils/formatters';
import { tmdbConfig } from '../config/tmdb';

export async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const defaultParams = {
    api_key: tmdbConfig.apiKey,
    language: 'en-US',
    ...params
  };
  
  const url = buildApiUrl(tmdbConfig.baseUrl, endpoint, defaultParams);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// TODO: Migrate to use fetchTmdbAPI from api/tmdbHelpers.ts for better separation of concerns
