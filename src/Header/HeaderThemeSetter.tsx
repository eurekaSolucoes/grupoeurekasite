'use client'

import { useHeaderTheme, HeaderTheme } from '@/providers/HeaderTheme'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import { PropsWithChildren, useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import type { Theme } from '@/providers/Theme/types'

interface HeaderThemeSetterProps {
  /** General theme (affects overall styling) */
  theme?: Theme
  /** Logo variant for mobile screens */
  logoMobile?: EurekaLogoVariants
  /** Logo variant for desktop screens */
  logoDesktop?: EurekaLogoVariants
}

export function HeaderThemeSetter({
  theme,
  logoMobile,
  logoDesktop,
  children,
}: PropsWithChildren<HeaderThemeSetterProps>) {
  const { changeHeaderTheme } = useHeaderTheme()
  const { ref } = useIntersectionObserver({
    threshold: 0.9,
    onChange: handleIntersection,
  })

  function handleIntersection(isIntersecting: boolean) {
    if (isIntersecting) {
      const newTheme: HeaderTheme = {
        theme,
        logoTheme:
          logoMobile || logoDesktop
            ? {
                mobile: logoMobile ?? null,
                desktop: logoDesktop ?? null,
              }
            : null,
      }
      changeHeaderTheme(newTheme)
    }
  }

  return (
    <>
      <div ref={ref} className="absolute inset-x-0 h-screen" />
      {children}
    </>
  )
}
