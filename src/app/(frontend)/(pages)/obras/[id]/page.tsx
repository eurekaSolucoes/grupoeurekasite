import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProductById, getRelatedProducts } from '@/services/products'
import { ProductDetailHeroBlock } from '@/blocks/ProductDetail/HeroBlock/Component'
import { ProductDetailSpecificationsBlock } from '@/blocks/ProductDetail/SpecificationsBlock/Component'
import { ProductDetailRelatedProductsBlock } from '@/blocks/ProductDetail/RelatedProductsBlock/Component'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'Produto não encontrado | Grupo Eureka',
    }
  }

  return {
    title: `${product.title} | Grupo Eureka`,
    description: product.description?.slice(0, 160) || `Conheça ${product.title} do Grupo Eureka.`,
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: product.mockupURL || product.coverURL ? [{ url: product.mockupURL || product.coverURL || '' }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Busca produtos relacionados
  const relatedProducts = await getRelatedProducts(product, 4)

  return (
    <main>
      <article>
        <ProductDetailHeroBlock product={product} />
        <ProductDetailSpecificationsBlock product={product} />
      </article>
      <ProductDetailRelatedProductsBlock products={relatedProducts} />
    </main>
  )
}
