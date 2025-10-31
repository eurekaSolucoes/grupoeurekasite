'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useState, useMemo } from 'react'

import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerTheme?: Theme | null
  changeHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  changeHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM ? (document.documentElement.dataset.theme as Theme) : undefined,
  )

  const changeHeaderTheme = useCallback((themeToChange: Theme | null) => {
    setThemeState(themeToChange)
  }, [])

  const value = useMemo(
    () => ({ headerTheme, changeHeaderTheme }),
    [headerTheme, changeHeaderTheme],
  )

  return <HeaderThemeContext value={value}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
