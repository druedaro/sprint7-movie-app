import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import CastCard from '../components/atoms/CastCard';
import { useSeriesDetails } from '../hooks/useSeriesDetails';
import { formatYear, formatRating } from '../utils/format';

export default function SeriesDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { series, cast, videos, loading, error } = useSeriesDetails(id!);

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

  if (error || !series) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Series not found</h1>
            <Link to="/series" className="text-primary-400 hover:text-primary-300">
              ← Back to series
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const backdropUrl = series.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${series.backdrop_path}`
    : null;

  const posterUrl = series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const averageRuntime = series.episode_run_time.length > 0 
    ? Math.round(series.episode_run_time.reduce((a, b) => a + b, 0) / series.episode_run_time.length)
    : null;

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
                  alt={series.name}
                  className="w-80 max-w-full mx-auto lg:mx-0 rounded-lg shadow-2xl"
                />
              </div>

              <div className="flex-1 text-white">
                <div className="mb-4">
                  <Link to="/series" className="text-gray-300 hover:text-white text-sm">
                    Series
                  </Link>
                  <span className="text-gray-500 text-sm mx-2">/</span>
                  <span className="text-sm">{series.name}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {series.name}
                </h1>

                {series.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">
                    "{series.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">⭐</span>
                    <span>{formatRating(series.vote_average)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">📅</span>
                    <span>
                      {series.first_air_date ? formatYear(series.first_air_date) : 'N/A'}
                      {series.status !== 'Ended' && series.in_production && ' - Present'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">📺</span>
                    <span>{series.number_of_seasons} Season{series.number_of_seasons !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">🎬</span>
                    <span>{series.number_of_episodes} Episodes</span>
                  </div>
                  
                  {averageRuntime && (
                    <div className="flex items-center gap-2">
                      <span className="text-primary-400">⏱️</span>
                      <span>~{averageRuntime}m per episode</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    series.status === 'Ended' 
                      ? 'bg-red-500/20 text-red-400'
                      : series.in_production
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {series.status}
                  </span>
                </div>

                {series.genres && series.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {series.genres.map((genre) => (
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
                    {series.overview || 'No overview available.'}
                  </p>
                </div>

                {series.created_by && series.created_by.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Created by</h2>
                    <div className="flex flex-wrap gap-2">
                      {series.created_by.map((creator) => (
                        <span key={creator.id} className="text-primary-400">
                          {creator.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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