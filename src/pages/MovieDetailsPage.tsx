import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import CastCard from '../components/atoms/CastCard';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { formatYear, formatRating } from '../utils/format';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { movie, cast, videos, loading, error } = useMovieDetails(id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="spinner-lime" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Movie not found</h1>
            <Link to="/movies" className="text-primary-400 hover:text-primary-300">
              ← Back to movies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div
          className="relative bg-cover bg-center bg-no-repeat"
          style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
        >
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-80 max-w-full mx-auto lg:mx-0 rounded-lg shadow-2xl"
                />
              </div>

              <div className="flex-1 text-white">
                <div className="mb-4">
                  <Link to="/movies" className="text-gray-300 hover:text-white text-sm">
                    Movies
                  </Link>
                  <span className="text-gray-500 text-sm mx-2">/</span>
                  <span className="text-sm">{movie.title}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">
                    "{movie.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">⭐</span>
                    <span>{formatRating(movie.vote_average)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">📅</span>
                    <span>{movie.release_date ? formatYear(movie.release_date) : 'N/A'}</span>
                  </div>
                  
                  {movie.runtime && (
                    <div className="flex items-center gap-2">
                      <span className="text-primary-400">⏱️</span>
                      <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                    </div>
                  )}
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-primary-400/20 text-primary-400 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>

                {videos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Trailers</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {videos.map((video) => (
                        <a
                          key={video.id}
                          href={`https://www.youtube.com/watch?v=${video.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          ▶️ {video.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cast.map((person) => (
                <CastCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}