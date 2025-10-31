'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { PropsWithChildren, useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

type HeaderTheme = 'light' | 'dark'
interface HeaderThemeSetterProps {
  theme: HeaderTheme
}

export function HeaderThemeSetter({ theme, children }: PropsWithChildren<HeaderThemeSetterProps>) {
  const { changeHeaderTheme } = useHeaderTheme()
  const { isIntersecting, ref } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) changeHeaderTheme(theme)
  }, [isIntersecting, changeHeaderTheme, theme])

  return <div ref={ref}>{children}</div>
}
