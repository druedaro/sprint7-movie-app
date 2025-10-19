export default function SkeletonCast() {
  return (
    <div className="card-glass overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-slate-700/50" />
      
      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-700/50 rounded w-4/5" />
        <div className="h-3 bg-slate-700/50 rounded w-3/4" />
      </div>
    </div>
  );
}