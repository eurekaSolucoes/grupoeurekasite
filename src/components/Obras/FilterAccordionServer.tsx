import { Suspense } from 'react'
import { getFilterOptions } from '@/services/products'
import { FilterAccordion } from './FilterAccordion'
import { FilterAccordionSkeleton } from './FilterSidebarSkeleton'

async function FilterAccordionData() {
  const { categories, schoolCycles } = await getFilterOptions()

  return <FilterAccordion categories={categories} schoolCycles={schoolCycles} />
}

function FilterAccordionFallback() {
  return (
    <div className="hidden md:flex md:flex-col md:gap-4">
      <FilterAccordionSkeleton expanded itemCount={3} />
      <FilterAccordionSkeleton expanded itemCount={5} />
    </div>
  )
}

export function FilterAccordionServer() {
  return (
    <Suspense fallback={<FilterAccordionFallback />}>
      <FilterAccordionData />
    </Suspense>
  )
}
