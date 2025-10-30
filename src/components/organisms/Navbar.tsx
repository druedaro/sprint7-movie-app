import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PATHS } from '../../routes/paths';
import Button from '../atoms/Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATHS.HOME, { replace: true });
    } catch {
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <Link to={PATHS.HOME} className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="/logo-header-light.svg" 
                alt="The Corner Database" 
                className="h-5 sm:h-6 md:h-8 w-auto"
              />
            </Link>

            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to={PATHS.MOVIES} 
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Movies
                </Link>
                <Link 
                  to={PATHS.SERIES} 
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Series
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}

            {user ? (
              <>
                <span className="hidden sm:block text-sm text-gray-300">
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to={PATHS.AUTH}>
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {user && mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to={PATHS.MOVIES}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-2 hover:bg-white/5 rounded-lg"
              >
                🎬 Movies
              </Link>
              <Link 
                to={PATHS.SERIES}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-2 hover:bg-white/5 rounded-lg"
              >
                📺 Series
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
