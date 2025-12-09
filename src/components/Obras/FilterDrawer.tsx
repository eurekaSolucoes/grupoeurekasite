'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Skeleton } from '@/components/ui/skeleton'
import { FilterDrawerForm } from './FilterDrawerForm'
import type { GetFilterOptionsResponse } from '@/services/products'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

export function FilterDrawer() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<GetFilterOptionsResponse | null>(null)

  // Ler filtros da URL para mostrar contador no botão
  const [urlFilters] = useQueryStates({
    ciclos: parseAsArrayOf(parseAsString).withDefault([]),
    categorias: parseAsArrayOf(parseAsString).withDefault([]),
  })

  const activeFilterCount = urlFilters.ciclos.length + urlFilters.categorias.length

  // Buscar opções de filtro
  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch(`${API_BASE}/api/products/options`)
        if (response.ok) {
          const data = await response.json()
          setOptions(data)
        }
      } catch (error) {
        console.error('Error fetching filter options:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOptions()
  }, [])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="flex h-16 items-center gap-2 rounded-lg bg-input p-4 disabled:opacity-50 md:hidden"
          disabled={isLoading}
        >
          {isLoading ? (
            <Skeleton className="h-7 w-10.5" />
          ) : (
            <>
              <span className="typography-body">Filtrar</span>
              {activeFilterCount > 0 && (
                <span className="flex size-5.5 items-center justify-center rounded bg-secondary typography-caption font-bold text-secondary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </>
          )}
        </button>
      </DrawerTrigger>
      {options && (
        <DrawerContent className="max-h-[85vh] rounded-t-3xl border-0">
          <DrawerHeader className="flex flex-row items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <DrawerTitle className="typography-subheading! font-normal">Filtros</DrawerTitle>
              {activeFilterCount > 0 && (
                <span className="flex size-5.5 items-center justify-center rounded bg-secondary typography-caption font-bold text-secondary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <DrawerClose asChild>
              <button className="p-2.5" aria-label="Fechar filtros">
                <X className="size-6" />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <FilterDrawerForm options={options} />
        </DrawerContent>
      )}
    </Drawer>
  )
}
