// Requisições
export { getProducts, type GetProductsParams, type GetProductsResponse } from './getProducts'
export { getFilterOptions, type GetFilterOptionsResponse } from './getFilterOptions'

// Types
export type * from './types'

// Config
export {
  PRODUCT_TYPE_IDS,
  getProductTypeConfig,
  isCollection,
  isBook,
  isProject,
  type ProductTypeKey,
  type ProductTypeConfig,
} from './config'
