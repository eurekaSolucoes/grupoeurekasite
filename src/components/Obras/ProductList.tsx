import { searchParamsCache } from '@/app/(frontend)/(pages)/obras/searchParams'
import { ProductCard, ProductsPagination } from '@/components/Obras'
import { ProductListEmpty } from './ProductListEmpty'
import { getProducts } from '@/services/products'

export async function ProductList() {
  const productListParams = searchParamsCache.all()
  const { query, categories, schoolCycles } = productListParams
  const { list, totalPages } = await getProducts(productListParams)

  const hasProducts = list.length > 0
  const activeFilterCount = categories.length + schoolCycles.length
  const hasAnyTypeOfFilterSet = activeFilterCount > 0 || !!query

  return (
    <section className="w-full space-y-15 pb-8">
      {hasProducts ? (
        <ul className="grid gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {list.map((product, i) => (
            <li
              key={product._id}
              className="animate-in duration-700 fill-mode-backwards fade-in"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <ProductListEmpty hasFilters={hasAnyTypeOfFilterSet} />
      )}
      {totalPages > 1 && <ProductsPagination totalPages={totalPages} />}
    </section>
  )
}
