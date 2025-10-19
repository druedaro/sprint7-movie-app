import { Link } from 'react-router-dom';
import type { Series } from '../../config/types';
import { formatYear, formatRating } from '../../utils/format';

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const imageUrl = series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link
      to={`/series/${series.id}`}
      className="group card-glass overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={series.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {series.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-primary-400 font-bold text-sm">
              ⭐ {formatRating(series.vote_average)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {series.name}
        </h3>
        
        <p className="text-gray-400 text-sm">
          {series.first_air_date ? formatYear(series.first_air_date) : 'N/A'}
        </p>
      </div>
    </Link>
  );
}