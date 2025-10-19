import { getImageUrl, IMAGE_SIZES } from '../../config/tmdb';
import type { CastCardProps } from '../../config/types';

export default function CastCard({ cast, onClick }: CastCardProps) {
  const imageUrl = getImageUrl(cast.profile_path, IMAGE_SIZES.profile.medium);

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <img 
          src={imageUrl} 
          alt={cast.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors">
          {cast.name}
        </h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {cast.character}
        </p>
      </div>
    </div>
  );
}
