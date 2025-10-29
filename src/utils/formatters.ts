export const formatYear = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear().toString();
};


export const formatRating = (rating: number | null | undefined, decimals = 1): string => {
  if (rating === null || rating === undefined) return 'N/A';
  return rating.toFixed(decimals);
};


export const buildApiUrl = (
  baseUrl: string,
  endpoint: string,
  params: Record<string, string | number> = {}
): string => {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(base + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
};