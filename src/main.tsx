import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { paths } from './routes/paths';

import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <WelcomePage />,
  },
  {
    path: paths.auth,
    element: <AuthPage />,
  },
  {
    path: paths.movies,
    element: (
      <ProtectedRoute>
        <MoviesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.movieDetails(),
    element: (
      <ProtectedRoute>
        <MovieDetailsPage />
      </ProtectedRoute>
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