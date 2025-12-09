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
  productType: ProductType
  products?: Product[] // Para coleções
}
