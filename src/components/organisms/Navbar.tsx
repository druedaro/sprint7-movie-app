import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { PATHS } from '../../routes/paths';
import Button from '../atoms/Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(location.pathname, { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to={PATHS.HOME} className="flex items-center gap-2">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold text-white">The Corner Database</span>
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

          <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
}