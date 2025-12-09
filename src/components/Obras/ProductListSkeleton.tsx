import { Skeleton } from '@/components/ui/skeleton'

function ProductCardSkeleton() {
  return (
    <div>
      <div className="h-[253px] w-full rounded-b-[20px] bg-muted" />
      <div className="mt-6 space-y-2 px-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function ProductListSkeleton() {
  return (
    <section className="w-full animate-in space-y-15 pb-8 duration-300 fade-in">
      <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}
