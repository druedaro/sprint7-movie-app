// ========================================
// Date/Time Formatters
// ========================================

export const formatYear = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear().toString();
};

// ========================================
// Number/Rating Formatters
// ========================================

export const formatRating = (rating: number | null | undefined, decimals = 1): string => {
  if (rating === null || rating === undefined) return 'N/A';
  return rating.toFixed(decimals);
};

// ========================================
// URL Builders
// ========================================

export const buildImageUrl = (
  baseUrl: string,
  path: string | null,
  size: string = '',
  fallbackUrl?: string
): string => {
  if (!path) {
    return fallbackUrl || 'https://via.placeholder.com/500x750?text=No+Image';
  }
  const separator = size ? '/' : '';
  return `${baseUrl}${separator}${size}${path}`;
};

export const buildApiUrl = (
  baseUrl: string,
  endpoint: string,
  params: Record<string, string | number> = {}
): string => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
};