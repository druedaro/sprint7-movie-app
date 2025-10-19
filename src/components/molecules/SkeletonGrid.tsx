import SkeletonCard from '../atoms/SkeletonCard';

interface SkeletonGridProps {
  count?: number;
  type?: 'card' | 'cast';
}

export default function SkeletonGrid({ count = 20, type = 'card' }: SkeletonGridProps) {
  const gridCols = type === 'cast' 
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}