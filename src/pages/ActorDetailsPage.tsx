import { useParams, useNavigate } from 'react-router-dom';
import { usePersonDetails } from '../hooks/usePersonDetails';
import { getImageUrl, IMAGE_SIZES } from '../config/tmdb';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MovieCard from '../components/atoms/MovieCard';
import SeriesCard from '../components/atoms/SeriesCard';
import Button from '../components/atoms/Button';

export default function ActorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { person, movieCredits, tvCredits, loading, error } = usePersonDetails(Number(id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-app">
        <div className="animate-spin rounded-full h-12 w-12 border-2 spinner-lime"></div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-app">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-300 mb-4">{error || 'Person not found'}</p>
            <Button 
              onClick={() => navigate(-1)}
              className="btn-primary"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const profileUrl = getImageUrl(person.profile_path, IMAGE_SIZES.profile.large);
  const age = person.birthday 
    ? new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null;

  const popularMovies = movieCredits?.cast
    .filter((movie, index, self) => 
      index === self.findIndex((m) => m.id === movie.id)
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12) || [];

  const popularSeries = tvCredits?.cast
    .filter((series, index, self) => 
      index === self.findIndex((s) => s.id === series.id)
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-app">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card-glass p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img 
                src={profileUrl} 
                alt={person.name}
                className="w-64 rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                {person.name}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400">Known for</p>
                  <p className="font-semibold text-white">{person.known_for_department}</p>
                </div>
                {person.birthday && (
                  <div>
                    <p className="text-sm text-gray-400">Age</p>
                    <p className="font-semibold text-white">{age} years old</p>
                  </div>
                )}
                {person.place_of_birth && (
                  <div>
                    <p className="text-sm text-gray-400">Place of birth</p>
                    <p className="font-semibold text-white">{person.place_of_birth}</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Biography</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {person.biography || 'No biography available.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {popularMovies.length > 0 && (
          <div className="card-glass p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Popular Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {popularSeries.length > 0 && (
          <div className="card-glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Popular Series
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularSeries.map((series) => (
                <SeriesCard
                  key={series.id}
                  series={series}
                  onClick={() => navigate(`/series/${series.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
