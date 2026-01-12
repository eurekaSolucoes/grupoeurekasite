import type { ProductSpecification, ProductDetail, Product } from '@/services/products'

/**
 * Extrai valor de uma especificação pelo label
 */
export function getSpecValue(specs: ProductSpecification[] | undefined, label: string): string {
  if (!specs) return '-'
  const spec = specs.find((s) => s.label.toLowerCase() === label.toLowerCase())
  return spec?.value || '-'
}

/**
 * Converte string de preço para número
 * Exemplo: "R$ 1.234,56" → 1234.56
 */
export function parsePriceToNumber(priceStr: string): number {
  const cleaned = priceStr
    .replace(/R\$\s*/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim()
  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}

/**
 * Formata número como preço em reais
 * Exemplo: 1234.56 → "R$ 1.234,56"
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/**
 * Verifica se o produto é uma coleção (possui volumes)
 */
export function isProductCollection(product: ProductDetail | Product): boolean {
  return !!(product.products && product.products.length > 0)
}

/**
 * Interface para linhas de tabela de especificações
 */
export interface SpecTableRow {
  title: string
  specs: ProductSpecification[]
}

/**
 * Interface para linhas de tabela de preços
 */
export interface PriceTableRow {
  title: string
  price: string
}

/**
 * Monta linhas de especificações técnicas
 */
export function buildSpecRows(product: ProductDetail): SpecTableRow[] {
  if (isProductCollection(product)) {
    return product.products
      .filter((p) => p.technicalSpecifications && p.technicalSpecifications.length > 0)
      .map((p) => ({
        title: p.title,
        specs: p.technicalSpecifications || [],
      }))
  }

  if (product.technicalSpecifications && product.technicalSpecifications.length > 0) {
    return [
      {
        title: product.title,
        specs: product.technicalSpecifications,
      },
    ]
  }

  return []
}

/**
 * Monta linhas de preços e calcula total
 */
export function buildPriceRows(product: ProductDetail): {
  rows: PriceTableRow[]
  total: number
} {
  let total = 0

  if (isProductCollection(product)) {
    const rows = product.products
      .filter((p) => p.unitPrices && p.unitPrices.length > 0)
      .map((p) => {
        const priceValue = p.unitPrices?.[0]?.value || '-'
        total += parsePriceToNumber(priceValue)
        return {
          title: p.title,
          price: priceValue,
        }
      })
    return { rows, total }
  }

  if (product.unitPrices && product.unitPrices.length > 0) {
    return {
      rows: [
        {
          title: product.title,
          price: product.unitPrices[0]?.value || '-',
        },
      ],
      total: 0,
    }
  }

  return { rows: [], total: 0 }
}

/**
 * Gera label para botão de justificativa
 */
export function getJustificationLabel(
  justificationsCount: number,
  index: number,
  date?: string,
): string {
  if (justificationsCount === 1) return 'Ver justificativa'
  return date
    ? `Ver justificativa - ${new Date(date).toLocaleDateString('pt-BR')}`
    : `Ver justificativa ${index + 1}`
}
