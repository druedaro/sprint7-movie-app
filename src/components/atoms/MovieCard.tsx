import { Link } from 'react-router-dom';
import type { Movie } from '../../config/types';
import { formatYear, formatRating } from '../../utils/format';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group card-glass overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-primary-400 font-bold text-sm">
              ⭐ {formatRating(movie.vote_average)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-gray-400 text-sm">
          {movie.release_date ? formatYear(movie.release_date) : 'N/A'}
        </p>
      </div>
    </Link>
  );
}