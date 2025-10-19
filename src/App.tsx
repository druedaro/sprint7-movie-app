import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { PATHS } from './routes/paths';
import ScrollToTop from './components/utils/ScrollToTop';

import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';

import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeriesDetailsPage from './pages/SeriesDetailsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={PATHS.HOME} element={<WelcomePage />} />
          <Route path={PATHS.AUTH} element={<AuthPage />} />

            <Route 
              path={PATHS.MOVIES} 
              element={
                <ProtectedRoute>
                  <ScrollToTop />
                  <MoviesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={PATHS.SERIES} 
              element={
                <ProtectedRoute>
                  <ScrollToTop />
                  <SeriesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={PATHS.MOVIE_DETAILS} 
              element={
                <ProtectedRoute>
                  <ScrollToTop />
                  <MovieDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={PATHS.SERIES_DETAILS} 
              element={
                <ProtectedRoute>
                  <ScrollToTop />
                  <SeriesDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={PATHS.ACTOR_DETAILS} 
              element={
                <ProtectedRoute>
                  <ScrollToTop />
                  <ActorDetailsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;