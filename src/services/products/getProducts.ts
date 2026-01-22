import type { Product } from './types'
import type { PaginatedResponse, PaginationParams } from '@/types/api'
import { clientEnv } from '@/lib/env'

const API_BASE = clientEnv.NEXT_PUBLIC_API_URL

/**
 * Parâmetros para busca de produtos
 */
export interface GetProductsParams extends PaginationParams {
  query?: string
  categories?: string[]
  schoolCycles?: string[]
}

/**
 * Resposta da busca de produtos
 */
export type GetProductsResponse = PaginatedResponse<Product>

/**
 * Busca produtos com filtros e paginação
 */
export async function getProducts(params: GetProductsParams = {}): Promise<GetProductsResponse> {
  const { query = '', page = 1, categories = [], schoolCycles = [], limit = 12 } = params

  const urlParams = new URLSearchParams()

  if (query) {
    urlParams.set('query', query)
  }

  urlParams.set('offset', String(page))
  urlParams.set('limit', String(limit))

  if (categories.length > 0) {
    urlParams.set('categories', categories.join(','))
  }

  if (schoolCycles.length > 0) {
    urlParams.set('schoolCycles', schoolCycles.join(','))
  }

  try {
    const response = await fetch(`${API_BASE}/api/products?${urlParams.toString()}`, {
      next: { revalidate: 60 }, // ISR: revalida a cada 60 segundos
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    // Retorna estado vazio em caso de erro
    return {
      list: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      limit,
    }
  }
}
