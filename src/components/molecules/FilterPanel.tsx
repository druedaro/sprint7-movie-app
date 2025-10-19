import type { Genre } from '../../config/types';

interface FilterPanelProps {
  genres: Genre[];
  selectedGenre: number | undefined;
  onSelectGenre: (genreId: number | undefined) => void;
}

export default function FilterPanel({ genres, selectedGenre, onSelectGenre }: FilterPanelProps) {
  return (
    <div className="card-glass p-4">
      <h3 className="text-white font-semibold mb-3">Genres</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectGenre(undefined)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedGenre === undefined
              ? 'bg-primary-400 text-black'
              : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
          }`}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedGenre === genre.id
                ? 'bg-primary-400 text-black'
                : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}