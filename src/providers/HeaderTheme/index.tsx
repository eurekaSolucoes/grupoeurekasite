'use client'

import React, { createContext, useCallback, use, useState, useMemo } from 'react'

import canUseDOM from '@/utilities/canUseDOM'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'

/** Visual theme for the header - controls styling/colors */
export type HeaderThemeVariant = 'secondary' | 'default'

export type HeaderTheme = {
  theme?: HeaderThemeVariant
  logoTheme: {
    mobile: EurekaLogoVariants | null
    desktop: EurekaLogoVariants | null
  } | null
}

export interface ContextType {
  headerTheme?: HeaderTheme | null
  changeHeaderTheme: (theme: HeaderTheme | null) => void
}

const initialContext: ContextType = {
  headerTheme: null,
  changeHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme | undefined | null>(
    canUseDOM
      ? {
          theme: document.documentElement.dataset.headerTheme as HeaderThemeVariant | undefined,
          logoTheme: {
            mobile:
              (document.documentElement.dataset.logoThemeMobile as EurekaLogoVariants) ?? null,
            desktop:
              (document.documentElement.dataset.logoThemeDesktop as EurekaLogoVariants) ?? null,
          },
        }
      : null,
  )

  const changeHeaderTheme = useCallback((themeToChange: HeaderTheme | null) => {
    setHeaderTheme(themeToChange)
  }, [])

  const value = useMemo(
    () => ({ headerTheme, changeHeaderTheme }),
    [headerTheme, changeHeaderTheme],
  )

  return <HeaderThemeContext value={value}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
