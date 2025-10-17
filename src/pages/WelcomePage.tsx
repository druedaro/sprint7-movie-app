import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/atoms/Button';

export default function WelcomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-app">
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Ultimate
            <br />
            <span className="text-gradient-lime-white">
              Movie & Series
            </span>
            <br />
            Discovery Platform
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore thousands of movies and TV shows, get detailed information, 
            and curate your personal watchlist.
          </p>
          
          {user ? (
            <Link to="/movies">
              <Button variant="primary" size="lg" className="btn-primary">
                🚀 Go to Movies
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="primary" size="lg" className="btn-primary">
                🎬 Get Started
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}