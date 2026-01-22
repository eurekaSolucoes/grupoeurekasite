import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProductById, getRelatedProducts } from '@/services/products'
import { ProductDetailHeroBlock } from '@/blocks/ProductDetail/HeroBlock/Component'
import { ProductDetailSpecificationsBlock } from '@/blocks/ProductDetail/SpecificationsBlock/Component'
import { ProductDetailRelatedProductsBlock } from '@/blocks/ProductDetail/RelatedProductsBlock/Component'
import { getServerSideURL } from '@/utilities/getURL'

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

  const description =
    product.description?.slice(0, 160) || `Conheça ${product.title} do Grupo Eureka.`
  const ogImage = product.mockupURL || product.coverURL || `${getServerSideURL()}/website-template-OG.webp`

  return {
    title: `${product.title} | Grupo Eureka`,
    description,
    openGraph: {
      title: product.title,
      description,
      images: [{ url: ogImage }],
      siteName: 'Grupo Eureka',
      type: 'website',
      locale: 'pt_BR',
    },
    alternates: {
      canonical: `${getServerSideURL()}/obras/${id}`,
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
    <main id="main-content">
      <article>
        <ProductDetailHeroBlock product={product} />
        <ProductDetailSpecificationsBlock product={product} />
      </article>
      <ProductDetailRelatedProductsBlock products={relatedProducts} />
    </main>
  )
}
