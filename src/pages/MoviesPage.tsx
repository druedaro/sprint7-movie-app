import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useGenres } from '../hooks/useGenres';
import { useSearch } from '../hooks/useSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { buildPath } from '../routes/paths';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MovieCard from '../components/atoms/MovieCard';
import SearchBar from '../components/molecules/SearchBar';
import FilterPanel from '../components/molecules/FilterPanel';
import type { Movie } from '../config/types';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const navigate = useNavigate();
  const { genres } = useGenres('movie');
  const { movies, loading, error, loadMore, hasMore } = useMovies('popular');
  const { results, loading: searchLoading } = useSearch(searchQuery, 'movie');
  const loaderRef = useInfiniteScroll(loadMore, hasMore && !isSearching, loading);

  const handleSearch = () => {
    setIsSearching(!!searchQuery);
  };

  const handleMovieClick = (movieId: number) => {
    navigate(buildPath.movieDetails(movieId));
  };

  const displayMovies = isSearching ? results : movies;
  const isLoading = isSearching ? searchLoading : loading;

  const filteredMovies = (displayMovies as Movie[])
    .filter((movie) => {
      if (selectedGenre && !movie.genre_ids.includes(selectedGenre)) {
        return false;
      }
      if (selectedYear) {
        const movieYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
        if (movieYear !== selectedYear) {
          return false;
        }
      }
      return true;
    })
    .filter((movie, index, self) => 
      index === self.findIndex((m) => m.id === movie.id)
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-app">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Movies {isSearching && '- Search Results'}
          </h1>
          <p className="text-gray-300">
            {isSearching 
              ? `${filteredMovies.length} results found`
              : 'Discover the most popular movies of the moment'
            }
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              if (!value) setIsSearching(false);
            }}
            onSearch={handleSearch}
            placeholder="Search movies..."
          />
        </div>

        <FilterPanel
          genres={genres}
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          onGenreChange={setSelectedGenre}
          onYearChange={setSelectedYear}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 spinner-lime"></div>
          </div>
        )}

        {!isLoading && hasMore && !isSearching && (
          <div ref={loaderRef} className="h-20 flex items-center justify-center">
            <p className="text-gray-400">Cargando más...</p>
          </div>
        )}

        {!hasMore && filteredMovies.length > 0 && !isSearching && (
          <p className="text-center text-gray-400 py-8">
            No hay más películas para mostrar
          </p>
        )}

        {!isLoading && filteredMovies.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {isSearching 
                ? 'No se encontraron resultados. Intenta con otra búsqueda.'
                : 'No se encontraron películas'
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
