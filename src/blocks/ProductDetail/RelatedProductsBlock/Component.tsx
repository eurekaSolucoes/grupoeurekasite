import type { Product } from '@/services/products'
import { ProductCard } from '@/components/Obras/ProductCard'

interface ProductDetailRelatedProductsBlockProps {
  products: Product[]
  title?: string
}

export function ProductDetailRelatedProductsBlock({
  products,
  title = 'Você também pode gostar',
}: ProductDetailRelatedProductsBlockProps) {
  if (!products || products.length === 0) {
    return null
  }

  // Limita a 4 produtos
  const displayProducts = products.slice(0, 4)

  return (
    <section
      aria-labelledby="related-products-heading"
      className="bg-linear-to-t from-input to-transparent pb-20 pt-12 lg:pt-16"
    >
      <div className="container">
        <h2
          id="related-products-heading"
          className="mb-8 font-display text-2xl font-normal text-foreground lg:mb-12 lg:text-[32px]"
        >
          {title}
        </h2>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
