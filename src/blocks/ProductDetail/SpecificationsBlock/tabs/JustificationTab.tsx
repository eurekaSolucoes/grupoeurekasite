'use client'

import type { ProductDetail } from '@/services/products'
import { getJustificationLabel } from '../utils'

interface JustificationTabProps {
  product: ProductDetail
}

export function JustificationTab({ product }: JustificationTabProps) {
  if (!product.justifications || product.justifications.length === 0) {
    return <p className="text-muted-foreground">Nenhuma justificativa disponível.</p>
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <p className="text-sm text-foreground lg:text-lg">
        Confira as justificativas do material – <span className="font-bold">{product.title}</span>
      </p>
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
        {product.justifications.map((justification, index) => {
          const buttonLabel = getJustificationLabel(
            product.justifications.length,
            index,
            justification.date,
          )

          return (
            <a
              key={index}
              href={justification.justificationURL}
              target="_blank"
              rel="noopener noreferrer"
              title={buttonLabel}
              className="inline-flex w-fit items-center justify-center rounded-full bg-secondary px-5 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 lg:px-6"
            >
              {buttonLabel}
            </a>
          )
        })}
      </div>
    </div>
  )
}
