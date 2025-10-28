import MediaDetailsPage from '../components/templates/MediaDetailsPage';
import type { MovieDetails } from '../config/types';

export default function MovieDetailsPage() {
  const config = {
    mediaType: 'movie' as const,
    getTitle: (movie: MovieDetails) => movie.title,
    getReleaseInfo: (movie: MovieDetails) => new Date(movie.release_date).getFullYear().toString(),
    getAdditionalInfo: (movie: MovieDetails) => `${movie.runtime} min`,
    backPath: '/movies',
    backLabel: 'Movies'
  };

  return <MediaDetailsPage config={config} />;
}
