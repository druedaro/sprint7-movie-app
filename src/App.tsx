import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';
import { PATHS } from './routes/paths';
import { useScrollToTop } from './hooks/useScrollToTop';

import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';

import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeriesDetailsPage from './pages/SeriesDetailsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';

function AppContent() {
  useScrollToTop();

  return (
    <Routes>
      <Route path={PATHS.HOME} element={<WelcomePage />} />
      <Route path={PATHS.AUTH} element={<AuthPage />} />

      <Route 
        path={PATHS.MOVIES} 
        element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PATHS.SERIES} 
        element={
          <ProtectedRoute>
            <SeriesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PATHS.MOVIE_DETAILS} 
        element={
          <ProtectedRoute>
            <MovieDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PATHS.SERIES_DETAILS} 
        element={
          <ProtectedRoute>
            <SeriesDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PATHS.ACTOR_DETAILS} 
        element={
          <ProtectedRoute>
            <ActorDetailsPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;