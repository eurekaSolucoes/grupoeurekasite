import type { ProductDetail } from './types'
import { clientEnv } from '@/lib/env'

const API_BASE = clientEnv.NEXT_PUBLIC_PRODUCT_DETAILS_API_URL

/**
 * Busca um produto pelo ID
 * @param id - ID do produto (ObjectId do MongoDB)
 * @returns Detalhes completos do produto ou null se não encontrado
 */
export async function getProductById(id: string): Promise<ProductDetail | null> {
  if (!id) {
    console.error('Product ID is required')
    return null
  }

  try {
    const url = `${API_BASE}/api/products/product?id=${id}`
    const response = await fetch(url, {
      next: { revalidate: 60 }, // ISR: revalida a cada 60 segundos
    })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}
