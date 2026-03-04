export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Top bar shimmer */}
      <div className="h-[56px] md:h-[60px] bg-white border-b border-neutral-02" />

      {/* Hero skeleton */}
      <div className="mx-auto max-w-[1750px] px-5 md:px-10 xl:px-12 pt-16 pb-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="h-3 w-24 rounded bg-neutral-02" />
          <div className="h-10 w-72 rounded bg-neutral-03" />
          <div className="h-3 w-48 rounded bg-neutral-02" />
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="mx-auto max-w-[1750px] px-5 md:px-10 xl:px-12 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Image */}
              <div className="aspect-[5/6] rounded-sm bg-neutral-02" />
              {/* Name */}
              <div className="h-3 w-3/4 rounded bg-neutral-02" />
              {/* Price */}
              <div className="h-3 w-1/3 rounded bg-neutral-02" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
