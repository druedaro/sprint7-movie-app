import { buildApiUrl } from '../utils/formatters';
import { tmdbConfig } from '../config/tmdb';

export async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  try {
    const defaultParams = {
      api_key: tmdbConfig.apiKey,
      language: 'en-US',
      ...params
    };
    
    const url = buildApiUrl(tmdbConfig.baseUrl, endpoint, defaultParams);
    const response = await fetch(url);
    
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error('Invalid API key or unauthorized access');
        case 404:
          throw new Error('Resource not found');
        case 429:
          throw new Error('API rate limit exceeded. Please try again later');
        case 500:
          throw new Error('Server error. Please try again later');
        default:
          throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again');
  }
}
