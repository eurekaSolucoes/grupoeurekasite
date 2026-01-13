'use client'

import { useTransition } from 'react'
import { X } from 'lucide-react'
import { useQueryStates } from 'nuqs'
import { Accordion } from '@/components/ui/accordion'
import { FilterAccordionItem } from './FilterAccordionItem'
import type { Category, SchoolCycle } from '@/services/products/types'
import { searchParamsParser, urlKeys } from '@/app/(frontend)/(pages)/obras/searchParams'

interface FilterAccordionProps {
  categories: Category[]
  schoolCycles: SchoolCycle[]
}

export function FilterAccordion({ categories, schoolCycles }: FilterAccordionProps) {
  const [isPending, startTransition] = useTransition()

  // Estado dos filtros sincronizado com URL
  const [filters, setFilters] = useQueryStates(searchParamsParser, {
    shallow: false,
    startTransition,
    urlKeys,
  })

  const activeFilterCount = filters.schoolCycles.length + filters.categories.length

  const handleCiclosChange = (selected: string[]) => {
    setFilters({ schoolCycles: selected.length > 0 ? selected : null })
  }

  const handleCategoriasChange = (selected: string[]) => {
    setFilters({ categories: selected.length > 0 ? selected : null })
  }

  const handleClearFilters = () => {
    setFilters(null)
  }

  return (
    <div className="hidden md:grid md:gap-4">
      <Accordion type="multiple" defaultValue={['segmentos']} className="flex flex-col gap-4">
        {schoolCycles.length > 0 && (
          <FilterAccordionItem
            value="segmentos"
            title="Segmentos"
            options={schoolCycles}
            selected={filters.schoolCycles}
            onSelectionChange={handleCiclosChange}
          />
        )}
        {categories.length > 0 && (
          <FilterAccordionItem
            value="categorias"
            title="Componente curricular"
            options={categories}
            selected={filters.categories}
            onSelectionChange={handleCategoriasChange}
          />
        )}
      </Accordion>

      {activeFilterCount > 0 && (
        <button
          onClick={handleClearFilters}
          disabled={isPending}
          className="flex items-center gap-1 typography-body text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <X className="size-4" />
          <span>Limpar filtros</span>
        </button>
      )}
    </div>
  )
}
