/**
 * Interfaces genéricas para APIs externas
 */

/**
 * Resposta paginada padrão da API
 */
export interface PaginatedResponse<T> {
  list: T[]
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}

/**
 * Parâmetros de paginação padrão
 */
export interface PaginationParams {
  page?: number
  limit?: number
}
