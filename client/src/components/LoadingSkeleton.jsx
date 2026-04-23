// src/components/LoadingSkeleton.jsx — Reusable skeleton loaders
export function CardSkeleton() {
  return (
    <div className="card space-y-3 animate-pulse">
      <div className="skeleton h-40 rounded-lg" />
      <div className="skeleton h-4 w-1/3 rounded" />
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="card space-y-3 animate-pulse">
      <div className="skeleton h-48 rounded-lg" />
      <div className="skeleton h-3 w-1/4 rounded" />
      <div className="skeleton h-5 w-4/5 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-9 w-32 rounded-lg" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="skeleton h-10 rounded-lg" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="skeleton h-14 rounded-lg" />
      ))}
    </div>
  );
}

export function PageHeroSkeleton() {
  return (
    <div className="bg-navy-700 h-64 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4 w-full max-w-2xl px-4">
        <div className="skeleton h-8 w-1/3 mx-auto rounded" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <div className="skeleton h-5 w-2/3 mx-auto rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      </div>
    </div>
  );
}
