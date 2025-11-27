import Image from 'next/image'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Media as MediaType } from '@/payload-types'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageBannerProps {
  title: string
  backgroundImage?: MediaType | string | null
  breadcrumbs?: BreadcrumbItem[]
}

export function PageBanner({ title, backgroundImage, breadcrumbs }: Readonly<PageBannerProps>) {
  const imageUrl = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.url

  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-primary pt-32 pb-16 lg:min-h-[60vh] lg:pt-40">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
      )}

      {/* Diagonal Overlay */}
      <div
        className="absolute -right-1/4 top-0 z-[1] h-full w-3/4 skew-x-[-15deg] bg-primary"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList className="text-white/70">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                  <BreadcrumbItem key={item.label}>
                    {!isLast && item.href ? (
                      <>
                        <BreadcrumbLink asChild className="text-white/70 hover:text-white">
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator className="text-white/50" />
                      </>
                    ) : (
                      <BreadcrumbPage className="text-white">{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title */}
        <h1 className="typography-display font-bold text-white">{title}</h1>
      </div>
    </section>
  )
}
