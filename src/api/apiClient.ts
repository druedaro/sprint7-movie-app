import { tmdbConfig } from '../config/tmdb';

export async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const url = new URL(`${tmdbConfig.baseUrl}${endpoint}`);
  url.searchParams.append('api_key', tmdbConfig.apiKey);
  url.searchParams.append('language', 'en-US');
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
