import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/services/products'
import { getProductTypeConfig, getProductImageUrl, getSchoolCyclesLabel } from '@/services/products'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const typeConfig = getProductTypeConfig(product)
  const imageUrl = getProductImageUrl(product)
  const schoolCycles = getSchoolCyclesLabel(product)

  return (
    <Link href={`/obras/${product._id}`} className="group block" title={product.title}>
      <article>
        <div className="relative h-[253px] w-full rounded-b-[20px] bg-linear-to-t from-input">
          {imageUrl && (
            <div className="flex size-full items-center justify-center overflow-hidden">
              <Image
                src={imageUrl}
                alt={product.title}
                width={200}
                height={250}
                className="-mt-5 max-h-70 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          )}
          <Badge
            variant={typeConfig.badgeVariant}
            size="sm"
            className="absolute bottom-0 left-3 translate-y-1/2 font-bold"
          >
            {typeConfig.getBadgeLabel(product)}
          </Badge>
        </div>

        <div className="mt-6 space-y-2 px-3">
          <h3 className="text-xl font-bold text-balance text-foreground">{product.title}</h3>
          {schoolCycles && (
            <p className="typography-body text-muted-foreground">{schoolCycles}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
