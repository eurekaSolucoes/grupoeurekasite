'use client'

import Link from 'next/link'
import { EurekaLogo } from '@/components/animate/EurekaLogo'
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

const DEFAULT_VARIANT = 'icon-blue'
export function Logo({ href = '/', className }: Readonly<HeaderLogoProps>) {
  const { headerTheme } = useHeaderTheme()
  const logoTheme = headerTheme?.logoTheme ?? DEFAULT_VARIANT
  return (
    <Link href={href} className={cn('flex items-center', className)}>
      <span className="hidden md:block">
        <EurekaLogo variant={logoTheme} />
      </span>
      <span className="block md:hidden">
        <EurekaLogo variant={logoTheme} height={64} />
      </span>
    </Link>
  )
}
