'use client'

import { useEffect, useState, useTransition } from 'react'
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs'
import { FilterToggleGroup } from './FilterToggleGroup'
import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { GetFilterOptionsResponse } from '@/services/products'

interface FilterDrawerFormProps {
  options: GetFilterOptionsResponse
}

export function FilterDrawerForm({ options }: FilterDrawerFormProps) {
  const [isPending, startTransition] = useTransition()

  // nuqs para sincronizar com URL
  const [urlFilters, setUrlFilters] = useQueryStates(
    {
      ciclos: parseAsArrayOf(parseAsString).withDefault([]),
      categorias: parseAsArrayOf(parseAsString).withDefault([]),
    },
    { shallow: false, startTransition },
  )

  // Estado local para seleções (antes de aplicar)
  const [localSchoolCycles, setLocalSchoolCycles] = useState<string[]>(urlFilters.ciclos)
  const [localCategories, setLocalCategories] = useState<string[]>(urlFilters.categorias)

  // Sincronizar estado local quando URL muda externamente
  useEffect(() => {
    setLocalSchoolCycles(urlFilters.ciclos)
    setLocalCategories(urlFilters.categorias)
  }, [urlFilters.ciclos, urlFilters.categorias])

  const handleApply = () => {
    setUrlFilters({
      ciclos: localSchoolCycles.length > 0 ? localSchoolCycles : null,
      categorias: localCategories.length > 0 ? localCategories : null,
    })
  }

  const handleClear = () => {
    setLocalSchoolCycles([])
    setLocalCategories([])
    setUrlFilters({ ciclos: null, categorias: null })
  }

  return (
    <>
      {/* Conteúdo scrollável */}
      <ScrollArea className="min-h-0 flex-1 overflow-auto">
        <div className="flex flex-col gap-6 px-5 py-6">
          {options.schoolCycles.length > 0 && (
            <FilterToggleGroup
              title="Segmentos"
              options={options.schoolCycles}
              value={localSchoolCycles}
              onValueChange={setLocalSchoolCycles}
            />
          )}
          {options.categories.length > 0 && (
            <FilterToggleGroup
              title="Componente curricular"
              options={options.categories}
              value={localCategories}
              onValueChange={setLocalCategories}
            />
          )}
        </div>
      </ScrollArea>
      {/* Footer fixo */}
      <DrawerFooter className="flex flex-row gap-2 border-t bg-background p-5 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)]">
        <DrawerClose asChild>
          <Button
            variant="outline"
            className="h-10 flex-1 bg-input hover:bg-input/80"
            onClick={handleClear}
            disabled={isPending}
          >
            Limpar filtros
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button
            variant="secondary"
            className="h-10 flex-1"
            onClick={handleApply}
            disabled={isPending}
          >
            {isPending ? 'Aplicando...' : 'Aplicar'}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  )
}
