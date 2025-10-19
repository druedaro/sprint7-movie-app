import { useState, useCallback } from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MovieCard from '../components/atoms/MovieCard';
import SearchBar from '../components/molecules/SearchBar';
import FilterPanel from '../components/molecules/FilterPanel';
import { useMovies } from '../hooks/useMovies';
import { useGenres } from '../hooks/useGenres';
import { useSearch } from '../hooks/useSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { Movie } from '../config/types';
import SkeletonGrid from '../components/molecules/SkeletonGrid';

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

  const { movies, loading: moviesLoading } = useMovies(page, selectedGenre);
  const { genres } = useGenres('movie');
  const { results: searchResults, loading: searchLoading } = useSearch(searchQuery, 'movie');

  const isSearching = searchQuery.trim() !== '';
  const displayMovies: Movie[] = isSearching ? searchResults as Movie[] : movies;
  const loading = isSearching ? searchLoading : moviesLoading;

  const lastMovieRef = useInfiniteScroll({
    onLoadMore: () => setPage(prev => prev + 1),
    hasMore: !isSearching && displayMovies.length > 0,
    loading
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleGenreSelect = (genreId: number | undefined) => {
    setSelectedGenre(genreId);
    setPage(1);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎬 Movies</h1>
          <p className="text-gray-300">Explore thousands of movies</p>
        </div>

        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search movies..."
          />
        </div>

        {!isSearching && (
          <div className="mb-8">
            <FilterPanel
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={handleGenreSelect}
            />
          </div>
        )}

        {displayMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {displayMovies.map((movie, index) => (
              <div
                key={movie.id}
                ref={index === displayMovies.length - 1 ? lastMovieRef : null}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : loading ? (
          <SkeletonGrid count={20} type="card" />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              {isSearching ? 'No movies found' : 'No movies available'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}