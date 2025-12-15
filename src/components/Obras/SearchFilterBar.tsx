import { FilterDrawer } from '@/components/Obras/FilterDrawer'
import { FilterAccordionServer } from '@/components/Obras/FilterAccordionServer'
import { ProductListFilterInput } from '@/components/Obras/ProductListFilterInput'

export function SearchFilterBar() {
  return (
    <div className="flex w-full shrink-0 items-center gap-2 md:sticky md:top-36 md:h-fit md:w-86 md:flex-col md:items-stretch md:gap-4">
      <ProductListFilterInput />
      <FilterDrawer />
      <FilterAccordionServer />
    </div>
  )
}
