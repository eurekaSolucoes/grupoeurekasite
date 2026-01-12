'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import type { ProductDetail } from '@/services/products'
import { getProductTypeConfig } from '@/services/products'
import { Badge } from '@/components/ui/badge'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

interface ProductDetailHeroBlockProps {
  product: ProductDetail
}

export function ProductDetailHeroBlock({ product }: ProductDetailHeroBlockProps) {
  const typeConfig = getProductTypeConfig(product)
  const badgeLabel = typeConfig.getBadgeLabel(product)
  const imageUrl = product.mockupURL || product.coverURL
  const schoolCycleLabel = product.schoolCycles?.[0]?.label

  return (
    <section className="relative overflow-hidden">
      {/* Hero - fundo azul */}
      <HeaderThemeSetter
        theme="default"
        logoMobile="icon-white"
        logoDesktop="full"
        downThreshold={0.5}
        upThreshold={0.6}
        className="relative rounded-b-[1.875rem] bg-secondary px-5 pb-[12.5rem] pt-[9.125rem] lg:min-h-[26.8125rem] lg:px-0 lg:pb-0 lg:pt-0"
      >
        {/* Elementos decorativos */}
        <div className="absolute -right-16 top-20 size-48 rounded-full bg-accent/40 blur-[5rem] lg:-right-20 lg:-top-20 lg:size-[25rem] lg:bg-accent/30 lg:blur-[6.25rem]" />
        <div className="absolute -left-20 top-40 size-32 rounded-full bg-secondary/60 blur-[3.75rem] lg:-left-32 lg:top-20 lg:size-[18.75rem] lg:bg-brand-dark-blue/50 lg:blur-[5rem]" />
        <div className="absolute bottom-0 right-1/4 hidden size-[12.5rem] rounded-full bg-accent/20 blur-[3.75rem] lg:block" />

        <div className="lg:container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:pt-[10.625rem]">
            {/* Coluna imagem - posição absoluta no desktop para overflow */}
            {imageUrl && (
              <div className="relative hidden lg:block">
                <div className="absolute -bottom-[18.75rem] left-0 h-[32.4375rem] w-[32.4375rem]">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(min-width: 1024px) 32.4375rem, 22.5rem"
                  />
                </div>
              </div>
            )}

            {/* Coluna conteúdo */}
            <div className="relative z-10 lg:pb-12">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-[0.8125rem] text-white/70">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <ChevronRight className="size-3" />
                <Link href="/obras" className="transition-colors hover:text-white">
                  Projetos
                </Link>
                <ChevronRight className="size-3" />
                <span>{product.productType?.label || 'Obras'}</span>
              </nav>

              {/* Título */}
              <h1 className="font-display text-[2.375rem] font-bold leading-none tracking-tight text-white lg:mb-8 lg:max-w-[40.1875rem] lg:text-[3.375rem] lg:leading-[1.2]">
                {product.title}
              </h1>

              {/* Badges mobile - inline */}
              <div className="mt-6 flex flex-col gap-3 lg:hidden">
                <Badge variant="accent" size="sm" className="w-fit">
                  {badgeLabel}
                </Badge>
                {schoolCycleLabel && (
                  <Badge variant="accent" size="sm" className="w-fit font-bold">
                    {schoolCycleLabel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Badges desktop - overflow na borda do hero */}
        <div className="absolute bottom-0 left-0 right-0 hidden translate-y-1/2 lg:block">
          <div className="container">
            <div className="grid grid-cols-2 gap-12">
              {/* Espaço da coluna da imagem */}
              <div />
              {/* Badges alinhadas com conteúdo */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="accent" size="sm" className="px-5 py-3 text-base">
                  {badgeLabel}
                </Badge>
                {schoolCycleLabel && (
                  <Badge variant="accent" size="sm" className="px-5 py-3 text-base font-bold">
                    {schoolCycleLabel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </HeaderThemeSetter>

      {/* Imagem mobile - sobreposta */}
      {imageUrl && (
        <div className="relative -mt-[11.25rem] flex justify-center px-5 lg:hidden">
          <div className="relative aspect-square w-full max-w-[22.5rem]">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain"
              priority
              sizes="22.5rem"
            />
          </div>
        </div>
      )}

      {/* Descrição - fundo branco */}
      <HeaderThemeSetter
        downThreshold={0.3}
        upThreshold={0.5}
        theme="secondary"
        logoMobile="icon-blue"
        logoDesktop="icon-blue"
        className="bg-white px-5 py-10 lg:px-0 lg:pt-16 lg:pb-16"
      >
        <div className="lg:container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Espaço para overflow da imagem no desktop */}
            <div className="hidden h-[18.75rem] lg:block" />

            {/* Descrição + categorias */}
            <div className="lg:pt-8">
              {product.description && (
                <div className="mb-8 text-base leading-[1.6] text-foreground lg:mb-10 lg:max-w-[46.0625rem] lg:text-lg lg:leading-[1.4]">
                  {product.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Disciplinas (categorias) */}
              {product.categories && product.categories.length > 0 && (
                <ul className="space-y-2">
                  {product.categories.map((category) => (
                    <li
                      key={category._id}
                      className="flex items-center gap-1 text-base text-foreground lg:text-lg lg:leading-[1.4]"
                    >
                      <Check className="size-3 text-accent" />
                      <span>{category.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </HeaderThemeSetter>
    </section>
  )
}
