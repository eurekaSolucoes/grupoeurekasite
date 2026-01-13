import type { Product, ProductDetail } from './types'

/**
 * Retorna URL da imagem do produto (mockup prioritário, fallback para cover)
 */
export function getProductImageUrl(product: Product | ProductDetail): string | undefined {
  return product.mockupURL || product.coverURL
}

/**
 * Retorna labels dos ciclos escolares formatados
 */
export function getSchoolCyclesLabel(product: Product | ProductDetail): string {
  return product.schoolCycles?.map((sc) => sc.label).join(', ') || ''
}
