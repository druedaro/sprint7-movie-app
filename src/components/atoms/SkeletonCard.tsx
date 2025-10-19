export default function SkeletonCard() {
  return (
    <div className="card-glass overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-slate-700/50" />
      
      <div className="p-4 space-y-2">
        <div className="h-5 bg-slate-700/50 rounded w-4/5" />
        <div className="h-4 bg-slate-700/50 rounded w-2/3" />
      </div>
    </div>
  );
}