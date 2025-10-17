import { TMDB_API_KEY } from '../config/tmdb';

export async function fetchAPI<T>(url: string, params?: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...params,
  });

  const response = await fetch(`${url}?${searchParams}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}