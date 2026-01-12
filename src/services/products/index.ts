// Requisições
export { getProducts, type GetProductsParams, type GetProductsResponse } from './getProducts'
export { getFilterOptions, type GetFilterOptionsResponse } from './getFilterOptions'
export { getProductById } from './getProductById'
export { getRelatedProducts } from './getRelatedProducts'

// Types
export type * from './types'

// Utils
export { getProductImageUrl, getSchoolCyclesLabel } from './utils'

// Config
export {
  PRODUCT_TYPE_IDS,
  getProductTypeConfig,
  isCollection,
  isBook,
  isProject,
  type ProductTypeKey,
  type ProductTypeConfig,
  type BadgeVariant,
} from './config'
