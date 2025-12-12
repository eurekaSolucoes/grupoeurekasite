'use client'

import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { bgThemeConfig, type BgTheme } from '../bgThemeConfig'
import { cn } from '@/utilities/ui'

interface HeaderBackgroundProps {
  bgTheme: BgTheme
}

export function HeaderBackground({ bgTheme }: HeaderBackgroundProps) {
  if (!bgTheme) return null

  const config = bgThemeConfig[bgTheme]
  if (!config) return null

  return (
    <HeaderThemeSetter
      theme={config.navTheme}
      logoMobile={config.logoMobile}
      logoDesktop={config.logoDesktop}
      aria-hidden
      className={cn('mb-7 h-28 rounded-b-3xl md:h-42', config.className)}
      children={null}
    />
  )
}
