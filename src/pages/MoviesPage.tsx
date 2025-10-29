import MediaListPage from '../components/templates/MediaListPage';
import MovieCard from '../components/molecules/MovieCard';
import { buildPath } from '../routes/paths';
import type { Movie } from '../config/interfaces';

export default function MoviesPage() {
  return (
    <MediaListPage<Movie>
      mediaType="movie"
      title="Movies"
      renderCard={(movie, onClick) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onClick}
        />
      )}
      getItemYear={(movie) => 
        movie.release_date ? new Date(movie.release_date).getFullYear() : null
      }
      getDetailsPath={(id) => buildPath.movieDetails(id)}
    />
  );
}