import { Link } from 'react-router-dom';
import type { Cast } from '../../config/types';

interface CastCardProps {
  person: Cast;
}

export default function CastCard({ person }: CastCardProps) {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : 'https://via.placeholder.com/500x750?text=No+Photo';

  return (
    <Link
      to={`/actors/${person.id}`}
      className="group card-glass overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-3">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {person.name}
        </h3>
        
        <p className="text-gray-400 text-xs line-clamp-2">
          {person.character}
        </p>
      </div>
    </Link>
  );
}