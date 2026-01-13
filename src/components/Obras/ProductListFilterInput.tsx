'use client'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import { ChangeEvent, KeyboardEvent, useTransition } from 'react'

function Loader({ className }: { className?: string }) {
  return <span className={cn('loader-spinner text-accent', className)} />
}

export function ProductListFilterInput() {
  const [isLoading, startTransition] = useTransition()
  const [search, setSearch] = useQueryState(
    'busca',
    parseAsString.withDefault('').withOptions({ startTransition, shallow: false }),
  )

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value === '' ? undefined : debounce(500),
    })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') setSearch(e.currentTarget.value)
  }

  return (
    <form className="relative flex-1">
      <Input
        name="busca"
        type="text"
        placeholder="Buscar por..."
        value={search}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
        className="h-16 pr-12 pl-4"
      />
      {isLoading ? (
        <Loader className="absolute top-1/2 right-4 -translate-y-1/2" />
      ) : (
        <Search className="absolute top-1/2 right-4 -translate-y-1/2 text-accent" />
      )}
    </form>
  )
}
