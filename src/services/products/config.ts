import type { Product } from './types'

// IDs reais da API Eureka Digital
export const PRODUCT_TYPE_IDS = {
  BOOK: '643558e19900697552678b44',
  COLLECTION: '64355a169900697552678b45',
  PROJECT: '6493a0497ea1f7753234d078',
} as const

export type ProductTypeKey = 'book' | 'collection' | 'project' | 'unknown'
export type BadgeVariant = 'accent' | 'blue' | 'default' | 'secondary' | 'destructive' | 'outline'

export interface ProductTypeConfig {
  key: ProductTypeKey
  getBadgeLabel: (product: Product) => string
  badgeVariant: BadgeVariant
}

const configById: Record<string, ProductTypeConfig> = {
  [PRODUCT_TYPE_IDS.BOOK]: {
    key: 'book',
    getBadgeLabel: () => 'Livro',
    badgeVariant: 'accent',
  },
  [PRODUCT_TYPE_IDS.COLLECTION]: {
    key: 'collection',
    getBadgeLabel: (product) => `Coleção • ${product.products?.length || 0} volumes`,
    badgeVariant: 'blue',
  },
  [PRODUCT_TYPE_IDS.PROJECT]: {
    key: 'project',
    getBadgeLabel: () => 'Projeto',
    badgeVariant: 'default',
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
  key: 'book',
  getBadgeLabel: () => 'Livro',
  badgeVariant: 'accent',
}

/**
 * Obtém a configuração de um tipo de produto
 * Prioridade: ID (string ou objeto) > Label Pattern > Default (livro)
 */
export function getProductTypeConfig(product: Product): ProductTypeConfig {
  const productType = product.productType

  // 1. productType é string (ID direto) - caso dos volumes de coleções
  if (typeof productType === 'string' && configById[productType]) {
    return configById[productType]
  }

  // 2. productType é objeto com _id (null check explícito pois typeof null === 'object')
  if (productType && typeof productType === 'object' && productType !== null) {
    if (productType._id && configById[productType._id]) {
      return configById[productType._id]
    }

    // 3. Por label pattern (fallback para objetos sem ID conhecido)
    if (productType.label) {
      for (const { pattern, config } of configByLabelPattern) {
        if (pattern.test(productType.label)) {
          return config
        }
      }
    }
  }

  // 4. Default: assume livro (cor laranja consistente)
  return defaultConfig
}

// Helpers para verificação de tipo específico
export const isCollection = (product: Product) => getProductTypeConfig(product).key === 'collection'
export const isBook = (product: Product) => getProductTypeConfig(product).key === 'book'
export const isProject = (product: Product) => getProductTypeConfig(product).key === 'project'
