'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function FilterAccordionSkeleton({
  expanded = false,
  itemCount = 4,
}: {
  expanded?: boolean
  itemCount?: number
}) {
  return (
    <div className="rounded-xl bg-input">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="size-5 rounded" />
      </div>

      {/* Content - checkboxes */}
      {expanded && (
        <div className="flex flex-col gap-3 px-5 pb-4 pt-0">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-4.5 rounded" />
              <Skeleton className="h-4 w-24" style={{ width: `${60 + Math.random() * 40}%` }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function FilterSidebarSkeleton() {
  return (
    <aside className="hidden w-86 shrink-0 flex-col gap-4 md:sticky md:top-30 md:flex">
      {/* Search input skeleton */}
      <Skeleton className="h-13 w-full rounded-lg" />

      {/* Accordions */}
      <div className="flex flex-col gap-4">
        <FilterAccordionSkeleton expanded itemCount={3} />
        <FilterAccordionSkeleton expanded itemCount={5} />
      </div>
    </aside>
  )
}
