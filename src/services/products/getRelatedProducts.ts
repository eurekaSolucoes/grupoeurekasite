import type { Product, ProductDetail } from './types'
import { getProducts } from './getProducts'

/**
 * Busca produtos relacionados a um produto
 * Prioridade: Produtos da API > Produtos do mesmo ciclo escolar
 */
export async function getRelatedProducts(
  product: ProductDetail,
  limit: number = 4,
): Promise<Product[]> {
  // Se já tem produtos relacionados na API, usa eles
  if (product.products?.length) {
    return product.products.slice(0, limit)
  }

  // Busca produtos do mesmo ciclo escolar
  const firstCycleId = product.schoolCycles?.[0]?._id
  if (!firstCycleId) {
    return []
  }

  const { list } = await getProducts({
    schoolCycles: [firstCycleId],
    limit: limit + 1, // +1 para filtrar o próprio produto
  })

  // Filtra o produto atual e limita ao número desejado
  return list.filter((p) => p._id !== product._id).slice(0, limit)
}
