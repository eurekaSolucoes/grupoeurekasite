'use client'

import { useHeaderTheme, HeaderTheme } from '@/providers/HeaderTheme'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import type { Theme } from '@/providers/Theme/types'
import { useMotionValueEvent, useScroll } from 'motion/react'

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
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState('down')

  useMotionValueEvent(scrollY, 'change', (current: number) => {
    const diff = current - (scrollY.getPrevious() ?? 0)
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })
  const { changeHeaderTheme } = useHeaderTheme()

  const threshold = scrollDirection === 'down' ? 0.8 : 0.1
  const { ref } = useIntersectionObserver({
    threshold,
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
