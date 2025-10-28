import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaList } from '../../hooks/useMediaList';
import { useGenres } from '../../hooks/useGenres';
import { useSearch } from '../../hooks/useSearch';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import SearchBar from '../molecules/SearchBar';
import FilterPanel from '../molecules/FilterPanel';
import type { Movie, Series } from '../../config/interfaces';

type MediaItem = Movie | Series;

interface MediaListPageProps<T extends MediaItem> {
  mediaType: 'movie' | 'tv';
  title: string;
  renderCard: (item: T, onClick: () => void) => ReactElement;
  getItemYear: (item: T) => number | null;
  getDetailsPath: (id: number) => string;
}

export default function MediaListPage<T extends MediaItem>({
  mediaType,
  title,
  renderCard,
  getItemYear,
  getDetailsPath,
}: MediaListPageProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const navigate = useNavigate();
  const { genres } = useGenres(mediaType);
  const { items, loading, error, loadMore, hasMore } = useMediaList<T>(mediaType, 'popular');
  const { results, loading: searchLoading } = useSearch(searchQuery, mediaType);
  const loaderRef = useInfiniteScroll(loadMore, hasMore && !isSearching, loading);

  const handleSearch = () => {
    setIsSearching(!!searchQuery);
  };

  const handleItemClick = (itemId: number) => {
    navigate(getDetailsPath(itemId));
  };

  const displayItems = isSearching ? results : items;
  const isLoading = isSearching ? searchLoading : loading;

  const filteredItems = (displayItems as T[])
    .filter((item) => {
      // Filtro por género
      if (selectedGenre && !item.genre_ids.includes(selectedGenre)) {
        return false;
      }
      // Filtro por año
      if (selectedYear) {
        const itemYear = getItemYear(item);
        if (itemYear !== selectedYear) {
          return false;
        }
      }
      return true;
    })
    .filter((item, index, self) => 
      index === self.findIndex((i) => i.id === item.id)
    );

  return (
    <div className="min-h-screen bg-gradient-app">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and explore our collection of {title.toLowerCase()}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder={`Search ${title.toLowerCase()}...`}
          />

          <div className="mt-6">
            <FilterPanel
              genres={genres}
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              onGenreChange={setSelectedGenre}
              onYearChange={setSelectedYear}
            />
          </div>

          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {filteredItems.map((item) => 
              renderCard(item, () => handleItemClick(item.id))
            )}
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

          {!hasMore && filteredItems.length > 0 && !isSearching && (
            <p className="text-center text-gray-400 py-8">
              No more {title.toLowerCase()} to show
            </p>
          )}

          {!isLoading && filteredItems.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400">No {title.toLowerCase()} found.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}