'use client'

import Link from 'next/link'
import type { ProductDetail } from '@/services/products'

interface CollectionTabProps {
  product: ProductDetail
}

export function CollectionTab({ product }: CollectionTabProps) {
  if (!product.products || product.products.length === 0) {
    return <p className="text-muted-foreground">Nenhum volume disponível.</p>
  }

  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-muted-foreground/30">
              <th className="pr-6 pb-4 text-left text-base font-normal text-muted-foreground">
                Título
              </th>
              <th className="pb-4 text-right text-base font-normal text-muted-foreground" />
            </tr>
          </thead>
          <tbody>
            {product.products.map((item, index) => (
              <tr
                key={item._id || index}
                className="border-b border-muted-foreground/30 last:border-0"
              >
                <td className="py-5 pr-6 text-base text-foreground">{item.title}</td>
                <td className="py-5 text-right">
                  <Link
                    href={`/obras/${item._id}`}
                    title={`Ver detalhes de ${item.title}`}
                    className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Veja o livro
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Cards */}
      <div className="flex flex-col lg:hidden">
        {product.products.map((item, index) => (
          <div
            key={item._id || index}
            className={`flex flex-col gap-3 py-4 ${index < product.products.length - 1 ? 'border-b border-muted-foreground/30' : ''}`}
          >
            <p className="text-sm font-bold text-foreground">{item.title}</p>
            <Link
              href={`/obras/${item._id}`}
              title={`Ver detalhes de ${item.title}`}
              className="inline-flex w-fit items-center justify-center rounded-full bg-secondary px-5 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Veja o livro
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
