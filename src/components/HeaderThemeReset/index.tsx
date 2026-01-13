'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export function HeaderThemeReset() {
  const pathname = usePathname()
  const { changeHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    changeHeaderTheme(null)
  }, [pathname, changeHeaderTheme])

  return null
}
