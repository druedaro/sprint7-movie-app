import { getImageUrl, IMAGE_SIZES } from '../../config/tmdb';
import { formatYear, formatRating } from '../../utils/format';
import type { SeriesCardProps } from '../../config/types';

export default function SeriesCard({ series, onClick }: SeriesCardProps) {
  const imageUrl = getImageUrl(series.poster_path, IMAGE_SIZES.poster.medium);
  const year = formatYear(series.first_air_date);
  const rating = formatRating(series.vote_average);

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer card-glass card-glass-hover"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
        <img 
          src={imageUrl} 
          alt={series.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white line-clamp-1 group-hover:text-primary-400 transition-colors">
          {series.name}
        </h3>
        <p className="text-sm text-gray-400 mt-1">{year}</p>
      </div>
    </div>
  );
}
