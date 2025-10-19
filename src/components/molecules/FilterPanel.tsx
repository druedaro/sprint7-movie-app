import type { FilterProps } from '../../config/types';

export default function FilterPanel({
  genres,
  selectedGenre,
  selectedYear,
  onGenreChange,
  onYearChange,
}: FilterProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="card-glass p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Genre
          </label>
          <select
            value={selectedGenre || ''}
            onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-primary-400/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Year
          </label>
          <select
            value={selectedYear || ''}
            onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-primary-400/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(selectedGenre || selectedYear) && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              onGenreChange(undefined);
              onYearChange(undefined);
            }}
            className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
