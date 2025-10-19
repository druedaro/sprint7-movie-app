import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MovieCard from '../components/atoms/MovieCard';
import SeriesCard from '../components/atoms/SeriesCard';
import { usePersonDetails } from '../hooks/usePersonDetails';
import { formatYear } from '../utils/format';
import type { Movie, Series } from '../config/types';

export default function ActorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { person, movieCredits, tvCredits, loading, error } = usePersonDetails(id!);

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

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Actor not found</h1>
            <Link to="/movies" className="text-primary-400 hover:text-primary-300">
              ← Back to movies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : 'https://via.placeholder.com/500x750?text=No+Photo';

  const age = person.birthday 
    ? new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null;

  const genderText = person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Not specified';

  const movieData: Movie[] = movieCredits.map(credit => ({
    id: credit.id,
    title: credit.title,
    poster_path: credit.poster_path,
    release_date: credit.release_date,
    vote_average: credit.vote_average,
    overview: credit.overview,
    adult: false,
    backdrop_path: null,
    genre_ids: credit.genre_ids,
    original_language: '',
    original_title: credit.title,
    popularity: credit.popularity,
    video: false,
    vote_count: 0
  }));

  const seriesData: Series[] = tvCredits.map(credit => ({
    id: credit.id,
    name: credit.name,
    poster_path: credit.poster_path,
    first_air_date: credit.first_air_date,
    vote_average: credit.vote_average,
    overview: credit.overview,
    adult: false,
    backdrop_path: null,
    genre_ids: credit.genre_ids,
    origin_country: [],
    original_language: '',
    original_name: credit.name,
    popularity: credit.popularity,
    vote_count: 0
  }));

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={profileUrl}
                alt={person.name}
                className="w-80 max-w-full mx-auto lg:mx-0 rounded-lg shadow-2xl"
              />
            </div>

            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {person.name}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-400">Known for:</span>
                  <p className="text-white font-medium">{person.known_for_department}</p>
                </div>

                <div>
                  <span className="text-gray-400">Gender:</span>
                  <p className="text-white font-medium">{genderText}</p>
                </div>

                {person.birthday && (
                  <div>
                    <span className="text-gray-400">Birthday:</span>
                    <p className="text-white font-medium">
                      {new Date(person.birthday).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {age && ` (${age} years old)`}
                    </p>
                  </div>
                )}

                {person.place_of_birth && (
                  <div>
                    <span className="text-gray-400">Place of birth:</span>
                    <p className="text-white font-medium">{person.place_of_birth}</p>
                  </div>
                )}

                {person.deathday && (
                  <div>
                    <span className="text-gray-400">Death:</span>
                    <p className="text-white font-medium">
                      {new Date(person.deathday).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {person.biography && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Biography</h2>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {person.biography.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {movieData.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Known for (Movies)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movieData.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {movieData.length > 12 && (
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  And {movieData.length - 12} more movies...
                </p>
              </div>
            )}
          </div>
        )}

        {seriesData.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Known for (TV Series)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {seriesData.slice(0, 12).map((series) => (
                <SeriesCard key={series.id} series={series} />
              ))}
            </div>
            {seriesData.length > 12 && (
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  And {seriesData.length - 12} more TV shows...
                </p>
              </div>
            )}
          </div>
        )}

        {person.imdb_id && (
          <div className="text-center">
            <a
              href={`https://www.imdb.com/name/${person.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>🎭</span>
              View on TMDB
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}