import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/atoms/Button';
import Footer from '../components/organisms/Footer';
import { paths } from '../routes/paths';

export default function WelcomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <span className="font-bold text-white text-xl">
              MovieApp
            </span>
          </div>
          
          {!user && (
            <Link to={paths.auth}>
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Amazing
              <span className="text-gradient-lime-white block">
                Movies & Series
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore thousands of movies and TV series. Get detailed information, 
              watch trailers, and discover your next favorite content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card-glass p-6">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Movies</h3>
              <p className="text-gray-300">
                Browse popular movies, search by title, and filter by genre
              </p>
            </div>
            
            <div className="card-glass p-6">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-xl font-semibold text-white mb-2">TV Series</h3>
              <p className="text-gray-300">
                Discover trending series, seasons, and episode information
              </p>
            </div>
            
            <div className="card-glass p-6">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-white mb-2">Actors</h3>
              <p className="text-gray-300">
                Learn about your favorite actors and their filmography
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link to={paths.movies}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    🎬 Explore Movies
                  </Button>
                </Link>
                <Link to={paths.series}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    📺 Browse Series
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={paths.auth}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}