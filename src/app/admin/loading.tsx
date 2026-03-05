export default function AdminLoading() {
  return (
    <div className="animate-pulse p-6 space-y-6">
      {/* Page title skeleton */}
      <div className="h-8 w-48 rounded bg-neutral-100" />

      {/* Toolbar skeleton (search + button) */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-9 w-64 rounded bg-neutral-100" />
        <div className="h-9 w-32 rounded bg-neutral-100" />
      </div>

      {/* Table header */}
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 flex-1 rounded bg-neutral-200" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-t border-neutral-100">
          {Array.from({ length: 5 }).map((_, j) => (
            <div
              key={j}
              className="h-4 flex-1 rounded bg-neutral-100"
              style={{ opacity: 1 - j * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
