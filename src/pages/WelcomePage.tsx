import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { PATHS } from '../routes/paths';
import Button from '../components/atoms/Button';
import Footer from '../components/organisms/Footer';

export default function WelcomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-app">
      <nav className="nav-glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="/logo-header-light.svg" 
                alt="The Corner Database" 
                className="h-5 sm:h-6 md:h-8 w-auto"
              />
            </Link>
            <div className="flex gap-2 sm:gap-3">
              {user ? (
                <Link to={PATHS.MOVIES}>
                  <Button variant="primary" className="btn-primary" size="sm">
                    Go to App
                  </Button>
                </Link>
              ) : (
                <Link to={PATHS.AUTH}>
                  <Button variant="primary" className="btn-primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-white font-medium">Powered by TMDB API</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Ultimate
              <br />
              <span className="text-gradient-lime-white">
                Movie & Series
              </span>
              <br />
              Discovery Platform
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Explore thousands of movies and TV shows, get detailed information about actors, 
              watch trailers, and curate your personal watchlist.
            </p>

            <Link to={user ? PATHS.MOVIES : PATHS.AUTH}>
              <Button 
                size="lg"
                className="btn-primary px-12 py-4 text-lg font-semibold shadow-2xl shadow-primary-400/50 transform hover:scale-105 transition-all duration-200"
              >
                {user ? "🚀 Launch App" : "🎬 Start Exploring"}
              </Button>
            </Link>

            {!user && (
              <p className="mt-4 text-gray-400 text-sm">
                Free forever. No credit card required.
              </p>
            )}
          </div>
        </section>

        <section className="mt-13 md:mt-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-primary-400/10 to-secondary-800/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 to-secondary-900/0 group-hover:from-primary-400/10 group-hover:to-secondary-900/10 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="text-5xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Vast Library
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Access an extensive collection of movies from classics to the latest blockbusters.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-primary-400/10 to-secondary-800/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 to-secondary-900/0 group-hover:from-primary-400/10 group-hover:to-secondary-900/10 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="text-5xl mb-4">📺</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  TV Series
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Binge-watch your favorite series with complete season and episode details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">5K+</div>
              <div className="text-gray-400">TV Shows</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Actors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-400">Entertainment</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
