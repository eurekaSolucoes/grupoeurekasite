import type { Category, SchoolCycle } from './types'
import { clientEnv } from '@/lib/env'

const API_BASE = clientEnv.NEXT_PUBLIC_API_URL

/**
 * Resposta das opções de filtro
 */
export interface GetFilterOptionsResponse {
  categories: Category[]
  schoolCycles: SchoolCycle[]
  products: Array<{
    _id: string
    label: string
    productType: string
  }>
}

/**
 * Busca opções de filtro (categorias, ciclos escolares)
 */
export async function getFilterOptions(): Promise<GetFilterOptionsResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/products/options`, {
      next: { revalidate: 300 }, // ISR: revalida a cada 5 minutos (filtros mudam menos)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching filter options:', error)
    // Retorna estado vazio em caso de erro
    return {
      categories: [],
      schoolCycles: [],
      products: [],
    }
  }
}
