'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useState, useMemo } from 'react'

import canUseDOM from '@/utilities/canUseDOM'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'

export type HeaderTheme = {
  theme?: Theme
  logoTheme: EurekaLogoVariants | null
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
          theme: document.documentElement.dataset.theme as Theme,
          logoTheme: (document.documentElement.dataset.logoTheme as EurekaLogoVariants) ?? null,
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
