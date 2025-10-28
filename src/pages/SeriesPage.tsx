import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaList } from '../hooks/useMediaList';
import { useGenres } from '../hooks/useGenres';
import { useSearch } from '../hooks/useSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { buildPath } from '../routes/paths';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import SeriesCard from '../components/atoms/SeriesCard';
import SearchBar from '../components/molecules/SearchBar';
import FilterPanel from '../components/molecules/FilterPanel';
import type { Series } from '../config/types';

export default function SeriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const navigate = useNavigate();
  const { genres } = useGenres('tv');
  const { items: series, loading, error, loadMore, hasMore } = useMediaList<Series>('tv', 'popular');
  const { results, loading: searchLoading } = useSearch(searchQuery, 'tv');
  const loaderRef = useInfiniteScroll(loadMore, hasMore && !isSearching, loading);

  const handleSearch = () => {
    setIsSearching(!!searchQuery);
  };

  const handleSeriesClick = (seriesId: number) => {
    navigate(buildPath.seriesDetails(seriesId));
  };


  const displaySeries = isSearching ? results : series;
  const isLoading = isSearching ? searchLoading : loading;

  const filteredSeries = (displaySeries as Series[])
    .filter((show) => {
      if (selectedGenre && !show.genre_ids.includes(selectedGenre)) {
        return false;
      }
      if (selectedYear) {
        const showYear = show.first_air_date ? new Date(show.first_air_date).getFullYear() : null;
        if (showYear !== selectedYear) {
          return false;
        }
      }
      return true;
    })

    .filter((show, index, self) => 
      index === self.findIndex((s) => s.id === show.id)
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-app">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Series {isSearching && '- Search Results'}
          </h1>
          <p className="text-gray-300">
            {isSearching 
              ? `${filteredSeries.length} results found`
              : 'Discover the most popular series of the moment'
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
            placeholder="Search series..."
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
          {filteredSeries.map((s) => (
            <SeriesCard
              key={s.id}
              series={s}
              onClick={() => handleSeriesClick(s.id)}
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
            <p className="text-gray-400">Loading more...</p>
          </div>
        )}

        {!hasMore && filteredSeries.length > 0 && !isSearching && (
          <p className="text-center text-gray-400 py-8">
            No more series to show
          </p>
        )}

        {!isLoading && filteredSeries.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {isSearching 
                ? 'No se encontraron resultados. Intenta con otra búsqueda.'
                : 'No se encontraron series'
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
