import type { Product } from './types'

// IDs reais da API Eureka Digital
export const PRODUCT_TYPE_IDS = {
  BOOK: '643558e19900697552678b44',
  COLLECTION: '64355a169900697552678b45',
  PROJECT: '6493a0497ea1f7753234d078',
} as const

export type ProductTypeKey = 'book' | 'collection' | 'project' | 'unknown'

export interface ProductTypeConfig {
  key: ProductTypeKey
  getBadgeLabel: (product: Product) => string
  badgeClassName: string
}

const configById: Record<string, ProductTypeConfig> = {
  [PRODUCT_TYPE_IDS.BOOK]: {
    key: 'book',
    getBadgeLabel: () => 'Livro',
    badgeClassName: 'bg-accent text-accent-foreground',
  },
  [PRODUCT_TYPE_IDS.COLLECTION]: {
    key: 'collection',
    getBadgeLabel: (product) => `Coleção • ${product.products?.length || 0} volumes`,
    badgeClassName: 'bg-secondary text-secondary-foreground',
  },
  [PRODUCT_TYPE_IDS.PROJECT]: {
    key: 'project',
    getBadgeLabel: () => 'Projeto',
    badgeClassName: 'bg-primary text-primary-foreground',
  },
}

// Fallback por label (regex para variações)
const configByLabelPattern: Array<{ pattern: RegExp; config: ProductTypeConfig }> = [
  {
    pattern: /^livro$/i,
    config: configById[PRODUCT_TYPE_IDS.BOOK],
  },
  {
    pattern: /col[eé][çc][ãa]o/i,
    config: configById[PRODUCT_TYPE_IDS.COLLECTION],
  },
  {
    pattern: /projeto/i,
    config: configById[PRODUCT_TYPE_IDS.PROJECT],
  },
]

const defaultConfig: ProductTypeConfig = {
  key: 'unknown',
  getBadgeLabel: (product) => product.productType?.label || 'Produto',
  badgeClassName: 'bg-muted text-muted-foreground',
}

/**
 * Obtém a configuração de um tipo de produto
 * Prioridade: ID > Label Pattern > Default
 */
export function getProductTypeConfig(product: Product): ProductTypeConfig {
  const productType = product.productType

  // 1. Por ID (prioritário - mais estável)
  if (productType?._id && configById[productType._id]) {
    return configById[productType._id]
  }

  // 2. Por label pattern (fallback)
  if (productType?.label) {
    for (const { pattern, config } of configByLabelPattern) {
      if (pattern.test(productType.label)) {
        return config
      }
    }
  }

  // 3. Default
  return defaultConfig
}

// Helpers para verificação de tipo específico
export const isCollection = (product: Product) => getProductTypeConfig(product).key === 'collection'
export const isBook = (product: Product) => getProductTypeConfig(product).key === 'book'
export const isProject = (product: Product) => getProductTypeConfig(product).key === 'project'
