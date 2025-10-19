import { useState, useCallback } from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import SeriesCard from '../components/atoms/SeriesCard';
import SearchBar from '../components/molecules/SearchBar';
import FilterPanel from '../components/molecules/FilterPanel';
import { useSeries } from '../hooks/useSeries';
import { useGenres } from '../hooks/useGenres';
import { useSearch } from '../hooks/useSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { Series } from '../config/types';

export default function SeriesPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

  const { series, loading: seriesLoading } = useSeries(page, selectedGenre);
  const { genres } = useGenres('tv');
  const { results: searchResults, loading: searchLoading } = useSearch(searchQuery, 'tv');

  const isSearching = searchQuery.trim() !== '';
  const displaySeries: Series[] = isSearching ? searchResults as Series[] : series;
  const loading = isSearching ? searchLoading : seriesLoading;

  const lastSeriesRef = useInfiniteScroll({
    onLoadMore: () => setPage(prev => prev + 1),
    hasMore: !isSearching && displaySeries.length > 0,
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
          <h1 className="text-4xl font-bold text-white mb-2">📺 Series</h1>
          <p className="text-gray-300">Explore thousands of TV series</p>
        </div>

        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search series..."
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

        {displaySeries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {displaySeries.map((seriesItem, index) => (
              <div
                key={seriesItem.id}
                ref={index === displaySeries.length - 1 ? lastSeriesRef : null}
              >
                <SeriesCard series={seriesItem} />
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner-lime" />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              {isSearching ? 'No series found' : 'No series available'}
            </p>
          </div>
        )}

        {loading && displaySeries.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="spinner-lime" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}