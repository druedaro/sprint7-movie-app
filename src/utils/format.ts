export function formatYear(date: string): string {
  return new Date(date).getFullYear().toString();
}

export function formatRating(rating: number): string {
  return (Math.round(rating * 10) / 10).toFixed(1);
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}