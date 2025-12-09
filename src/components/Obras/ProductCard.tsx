import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/services/products'
import { getProductTypeConfig } from '@/services/products'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Obtém configuração do tipo de produto (por ID ou fallback por label)
  const typeConfig = getProductTypeConfig(product)
  const badgeLabel = typeConfig.getBadgeLabel(product)
  const badgeColor = typeConfig.badgeClassName

  // Pega o primeiro ciclo escolar para exibir
  const schoolCycleLabel = product.schoolCycles?.map((sc) => sc.label).join(', ') || ''

  // URL da imagem (mockup ou cover)
  const imageUrl = product.mockupURL || product.coverURL

  return (
    <Link href={`/obras/${product._id}`} className="group block" title={product.title}>
      <article>
        {/* Container com gradiente */}
        <div className="relative h-[253px] w-full rounded-b-[20px] bg-linear-to-t from-input">
          {/* Imagem do produto */}
          {imageUrl && (
            <div className="flex size-full max-h-full max-w-full items-center justify-center overflow-hidden">
              <Image
                src={imageUrl}
                alt={product.title}
                width={200}
                height={250}
                className="-mt-5 max-h-70 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          )}
          {/* Badge do tipo */}
          <span
            className={cn(
              'absolute bottom-0 left-3 inline-flex h-6 translate-y-1/2 items-center rounded-full px-3 py-1.5 font-bold',
              badgeColor,
            )}
          >
            {badgeLabel}
          </span>
        </div>

        {/* Informações do produto */}
        <footer className="mt-6 space-y-2 px-3">
          {/* Título */}
          <h3 className="text-xl font-bold text-balance text-foreground">{product.title}</h3>

          {/* Ciclo escolar */}
          {schoolCycleLabel && (
            <p className="text-body text-muted-foreground">{schoolCycleLabel}</p>
          )}
        </footer>
      </article>
    </Link>
  )
}
