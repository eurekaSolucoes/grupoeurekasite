import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'

import { searchParamsCache } from './searchParams'

import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { ProductList } from '@/components/Obras/ProductList'
import { ProductListSkeleton } from '@/components/Obras/ProductListSkeleton'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SearchFilterBar } from '@/components/Obras/SearchFilterBar'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Nossas Obras | Grupo Eureka',
  description:
    'Conheça as obras e coleções do Grupo Eureka. Materiais didáticos para transformar a educação pública brasileira.',
}

interface ObrasPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ObrasPage({ searchParams }: Readonly<ObrasPageProps>) {
  const { query, categories, schoolCycles, page } = await searchParamsCache.parse(searchParams)

  // Key dinâmica para forçar Suspense a mostrar fallback quando params mudam
  const suspenseKey = `${query}-${categories.join(',')}-${schoolCycles.join(',')}-${page}`

  return (
    <div>
      <main className="container">
        <HeaderThemeSetter
          downThreshold={0.6}
          theme="secondary"
          logoMobile="icon-blue"
          logoDesktop="icon-blue"
        >
          <section className="space-y-2 pb-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projetos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="typography-heading">Nossas obras</h1>
          </section>
        </HeaderThemeSetter>

        <div className="relative mt-5 flex flex-col gap-y-14 md:flex-row md:gap-7">
          <SearchFilterBar />

          <Suspense key={suspenseKey} fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </main>
      <SpacerBlock size="lg" />
    </div>
  )
}
