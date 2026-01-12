/**
 * Entidades do domínio de produtos (API Eureka Digital)
 */

export interface SchoolCycle {
  _id: string
  label: string
  name: string
}

export interface Category {
  _id: string
  label: string
  name: string
}

export interface ProductType {
  _id: string
  label: string
}

export interface Product {
  _id: string
  title: string
  isFeatured: boolean
  featuredTitle?: string
  coverURL?: string
  mockupURL?: string
  schoolCycles: SchoolCycle[]
  categories: Category[]
  productType: ProductType | string // API pode retornar ID direto (string) ou objeto populado
  products?: Product[] // Para coleções
  technicalSpecifications?: ProductSpecification[] // Para volumes dentro de coleções
  unitPrices?: ProductSpecification[] // Para volumes dentro de coleções
}

/**
 * Justificativa do produto (PDF)
 */
export interface ProductJustification {
  justificationURL: string
  date: string
}

/**
 * Especificação técnica ou preço unitário
 */
export interface ProductSpecification {
  label: string
  value: string
}

/**
 * Status do produto
 */
export interface ProductStatus {
  _id: string
  label: string
}

/**
 * Detalhes completos do produto (endpoint /api/products/product)
 */
export interface ProductDetail {
  _id: string
  name: string // Slug do produto
  title: string
  featuredTitle?: string
  description: string
  coverURL?: string
  mockupURL?: string
  videoURL?: string
  freePreviewURL?: string

  productType: ProductType
  schoolCycles: SchoolCycle[]
  categories: Category[]

  // Arrays estruturados
  technicalSpecifications: ProductSpecification[]
  unitPrices: ProductSpecification[]
  justifications: ProductJustification[]
  products: Product[] // Volumes (coleções) ou relacionados

  // Flags de recursos
  hasTraining: boolean
  hasDigitalPlatform: boolean
  hasLiteraverse: boolean
  // NOTE: Typo intencional - a API retorna "Poduction" ao invés de "Production"
  hasContinuousDigitalPoduction: boolean
  hasMaterialCustomization: boolean
  hasImplementation: boolean

  isFeatured: boolean
  status: ProductStatus

  createdAt: string
  updatedAt: string
}
