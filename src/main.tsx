import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ScrollToTop from './components/utils/ScrollToTop';
import { paths } from './routes/paths';

import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeriesPage from './pages/SeriesPage';
import SeriesDetailsPage from './pages/SeriesDetailsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: (
      <>
        <ScrollToTop />
        <WelcomePage />
      </>
    ),
  },
  {
    path: paths.auth,
    element: (
      <>
        <ScrollToTop />
        <AuthPage />
      </>
    ),
  },
  {
    path: paths.movies,
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute>
          <MoviesPage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: paths.movieDetails(),
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute>
          <MovieDetailsPage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: paths.series,
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute>
          <SeriesPage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: paths.seriesDetails(),
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute>
          <SeriesDetailsPage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: paths.actorDetails(),
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute>
          <ActorDetailsPage />
        </ProtectedRoute>
      </>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);