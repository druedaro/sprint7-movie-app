import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Button from '../atoms/Button';
import { paths } from '../../routes/paths';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? paths.movies : paths.home} className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="font-bold text-white text-lg hidden sm:block">
              MovieApp
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to={paths.movies}
                className={`font-medium transition-colors ${
                  isActive(paths.movies)
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
              </Link>
              <Link
                to={paths.series}
                className={`font-medium transition-colors ${
                  isActive(paths.series)
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Series
              </Link>
            </div>
          )}

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">
                  {user.email}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to={paths.auth}>
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-primary-400 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {user ? (
              <div className="space-y-4">
                <Link
                  to={paths.movies}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition-colors ${
                    isActive(paths.movies)
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Movies
                </Link>
                <Link
                  to={paths.series}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition-colors ${
                    isActive(paths.series)
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Series
                </Link>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-300 text-sm mb-3">{user.email}</p>
                  <Button
                    onClick={handleLogout}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <Link
                to={paths.auth}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}