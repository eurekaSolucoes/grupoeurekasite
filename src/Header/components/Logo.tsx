'use client'

import Link from 'next/link'
import { EurekaLogo, EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import { cn } from '@/utilities/ui'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface HeaderLogoProps {
  href?: string
  className?: string
}

/**
 * HeaderLogo Component
 *
 * Logo do header com renderização responsiva.
 * Desktop: altura padrão (69px)
 * Mobile: altura reduzida (64px)
 */

const DEFAULT_MOBILE_VARIANT: EurekaLogoVariants = 'icon-blue'
const DEFAULT_DESKTOP_VARIANT: EurekaLogoVariants = 'full'
export function Logo({ href = '/', className }: Readonly<HeaderLogoProps>) {
  const { headerTheme } = useHeaderTheme()
  const mobileVariant = headerTheme?.logoTheme?.mobile ?? DEFAULT_MOBILE_VARIANT
  const desktopVariant = headerTheme?.logoTheme?.desktop ?? DEFAULT_DESKTOP_VARIANT

  return (
    <Link href={href} className={cn('flex items-center', className)}>
      <span className="hidden xl:block">
        <EurekaLogo variant={desktopVariant} />
      </span>
      <span className="block xl:hidden">
        <EurekaLogo variant={mobileVariant} height={64} />
      </span>
    </Link>
  )
}
