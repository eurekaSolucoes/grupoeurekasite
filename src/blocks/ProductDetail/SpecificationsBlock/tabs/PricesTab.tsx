'use client'

import type { ProductDetail } from '@/services/products'
import { buildPriceRows, formatPrice, isProductCollection } from '../utils'

interface PricesTabProps {
  product: ProductDetail
}

export function PricesTab({ product }: PricesTabProps) {
  const { rows, total } = buildPriceRows(product)
  const isCollection = isProductCollection(product)

  if (rows.length === 0) {
    return <p className="text-muted-foreground">Nenhum valor disponível.</p>
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
              <th className="pr-6 pb-4 text-left text-base font-normal text-muted-foreground">
                Preço
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-muted-foreground/30">
                <td className="py-5 pr-6 text-base text-foreground">{row.title}</td>
                <td className="py-5 pr-6 text-base text-foreground">{row.price}</td>
              </tr>
            ))}
          </tbody>
          {isCollection && total > 0 && (
            <tfoot>
              <tr>
                <td className="pt-6 pr-6 text-lg font-bold text-foreground">
                  Valor da coleção completa
                </td>
                <td className="pt-6 pr-6 text-lg font-bold text-foreground">
                  {formatPrice(total)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile: Cards */}
      <div className="flex flex-col lg:hidden">
        {rows.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-3 py-4 ${index < rows.length - 1 ? 'border-b border-muted-foreground/30' : ''}`}
          >
            <p className="text-sm font-bold text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.price}</p>
          </div>
        ))}
        {isCollection && total > 0 && (
          <div className="flex flex-col gap-1 border-t border-muted-foreground/30 pt-4">
            <p className="text-sm font-bold text-foreground">Valor da coleção completa</p>
            <p className="text-sm font-bold text-foreground">{formatPrice(total)}</p>
          </div>
        )}
      </div>
    </>
  )
}
