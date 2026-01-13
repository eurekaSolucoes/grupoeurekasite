'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import { Fragment } from 'react'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

type PageBannerBlockProps = Page['hero']

export function PageBannerBlock({
  title,
  backgroundImage,
  breadcrumbs,
}: Readonly<PageBannerBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      logoMobile="full"
      logoDesktop="full"
      theme="default"
      className="relative flex h-[362px] items-end overflow-hidden rounded-b-[30px] pb-10 lg:h-[450px] lg:pb-12"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Media
            resource={backgroundImage}
            fill
            priority
            size="100vw"
            imgClassName="rounded-b-[30px] object-cover object-center"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-1 rounded-b-[30px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(1, 15, 59, 0) 35.862%, rgba(1, 15, 59, 0.9) 100%),
            linear-gradient(250.859deg, rgba(243, 112, 33, 0.45) 7.0175%, rgba(35, 62, 148, 0.45) 38.717%, rgba(35, 62, 148, 0.45) 59.408%, rgba(1, 15, 59, 0.45) 76.983%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container space-y-5.5">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList className="text-white/70">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                  <Fragment key={item.label}>
                    <BreadcrumbItem>
                      {!isLast && item.href ? (
                        <BreadcrumbLink asChild className="text-white/70 hover:text-white">
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-white/70">{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/50 last:hidden [&>svg]:h-3 [&>svg]:w-3" />
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title */}
        <h1 className="typography-heading text-white">{title}</h1>
      </div>
    </HeaderThemeSetter>
  )
}
