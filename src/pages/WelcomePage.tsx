import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function WelcomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            🎬 The Corner Database
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Ultimate Movie & Series Discovery Platform
          </p>
          
          {user ? (
            <Link
              to="/movies"
              className="inline-block bg-primary-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-primary-300 transition-colors"
            >
              🚀 Go to Movies
            </Link>
          ) : (
            <Link
              to="/auth"
              className="inline-block bg-primary-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-primary-300 transition-colors"
            >
              🎬 Get Started
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}