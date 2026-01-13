import { SearchX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProductListEmptyProps {
  hasFilters: boolean
}

export function ProductListEmpty({ hasFilters }: Readonly<ProductListEmptyProps>) {
  return (
    <div className="flex size-full flex-col items-center justify-center py-16 text-center">
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-10 text-muted-foreground" />
      </div>

      <h3 className="mb-2 typography-subheading">Nenhum produto encontrado</h3>

      <p className="mb-6 max-w-md typography-body text-muted-foreground">
        {hasFilters
          ? 'Não encontramos produtos com os filtros selecionados. Tente ajustar sua busca.'
          : 'Não há produtos disponíveis no momento.'}
      </p>

      {hasFilters && (
        <Button asChild variant="secondary" size="lg">
          <Link href="/obras">Limpar filtros</Link>
        </Button>
      )}
    </div>
  )
}
