export const formatYear = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear().toString();
};


export const formatRating = (rating: number | null | undefined, decimals = 1): string => {
  if (rating === null || rating === undefined) return 'N/A';
  return rating.toFixed(decimals);
};
