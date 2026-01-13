'use client'

import type { ProductDetail } from '@/services/products'
import { buildSpecRows, getSpecValue } from '../utils'
import { SPEC_COLUMNS } from '../config'

interface SpecificationsTabProps {
  product: ProductDetail
}

export function SpecificationsTab({ product }: SpecificationsTabProps) {
  const rows = buildSpecRows(product)

  if (rows.length === 0) {
    return <p className="text-muted-foreground">Nenhuma especificação disponível.</p>
  }

  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-muted-foreground/30">
              {SPEC_COLUMNS.map((label) => (
                <th
                  key={label}
                  className="pr-6 pb-4 text-left text-base font-normal text-muted-foreground"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-muted-foreground/30 last:border-0">
                <td className="py-5 pr-6 text-base text-foreground">{row.title}</td>
                <td className="py-5 pr-6 text-base text-foreground">
                  {getSpecValue(row.specs, 'ISBN')}
                </td>
                <td className="py-5 pr-6 text-base text-foreground">
                  {getSpecValue(row.specs, 'Tamanho')}
                </td>
                <td className="py-5 pr-6 text-base text-foreground">
                  {getSpecValue(row.specs, 'Páginas')}
                </td>
                <td className="py-5 pr-6 text-base text-foreground">
                  {getSpecValue(row.specs, 'Acabamento')}
                </td>
                <td className="py-5 pr-6 text-base text-foreground">
                  {getSpecValue(row.specs, 'Cor')}
                </td>
              </tr>
            ))}
          </tbody>
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
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>ISBN: {getSpecValue(item.specs, 'ISBN')}</p>
              <p>{getSpecValue(item.specs, 'Tamanho')}</p>
              <p>
                {(() => {
                  const value = getSpecValue(item.specs, 'Páginas')
                  return value === '-' ? '-' : `${value} páginas`
                })()}
              </p>
              <p>Acabamento: {getSpecValue(item.specs, 'Acabamento')}</p>
              <p>{getSpecValue(item.specs, 'Cor')}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
