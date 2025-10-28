import { useParams, useNavigate } from 'react-router-dom';
import { useMediaDetails } from '../../hooks/useMediaDetails';
import { getImageUrl, IMAGE_SIZES } from '../../config/tmdb';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CastCard from '../molecules/CastCard';
import Button from '../atoms/Button';
import type { MovieDetails, SeriesDetails } from '../../config/interfaces';

type MediaDetailsItem = MovieDetails | SeriesDetails;

interface MediaDetailsConfig<T extends MediaDetailsItem> {
  mediaType: 'movie' | 'tv';
  getTitle: (item: T) => string;
  getReleaseInfo: (item: T) => string;
  getAdditionalInfo: (item: T) => string;
  backPath: string;
  backLabel: string;
}

interface MediaDetailsPageProps<T extends MediaDetailsItem> {
  config: MediaDetailsConfig<T>;
}

export default function MediaDetailsPage<T extends MediaDetailsItem>({
  config
}: MediaDetailsPageProps<T>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item, credits, videos, loading, error } = useMediaDetails<T>(config.mediaType, Number(id));

  const handleActorClick = (actorId: number) => {
    navigate(`/person/${actorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-app">
        <div className="animate-spin rounded-full h-12 w-12 border-2 spinner-lime"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-app">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-300 mb-4">{error || `${config.backLabel} not found`}</p>
            <Button 
              onClick={() => navigate(config.backPath)}
              variant="primary"
            >
              Back to {config.backLabel}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const backdropUrl = getImageUrl(item.backdrop_path, IMAGE_SIZES.backdrop.large);
  const posterUrl = getImageUrl(item.poster_path, IMAGE_SIZES.poster.large);
  const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-app">
      <Navbar />

      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-64 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={config.getTitle(item)}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-2">{config.getTitle(item)}</h1>
            <p className="text-gray-300 mb-4">{item.tagline}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold">{item.vote_average.toFixed(1)}</span>
              </span>
              <span>{config.getReleaseInfo(item)}</span>
              <span>{config.getAdditionalInfo(item)}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">{item.overview}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.genres.map((genre) => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-primary-400/20 backdrop-blur-sm border border-primary-400/50 rounded-full text-sm text-primary-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {trailer && (
              <a 
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="primary" 
                  size="lg"
                  className="btn-primary"
                >
                  ▶️ Watch Trailer
                </Button>
              </a>
            )}
          </div>
        </div>

        {credits && credits.cast.length > 0 && (
          <div className="card-glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.cast.slice(0, 12).map((actor) => (
                <CastCard
                  key={actor.id}
                  cast={actor}
                  onClick={() => handleActorClick(actor.id)}
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