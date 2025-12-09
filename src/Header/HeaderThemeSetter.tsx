'use client'

import { useHeaderTheme, HeaderTheme } from '@/providers/HeaderTheme'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ComponentPropsWithoutRef,
  useMemo,
} from 'react'
import type { Theme } from '@/providers/Theme/types'
import { useScroll, useTransform } from 'motion/react'

type ValidTags = 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'

interface HeaderThemeSetterOwnProps<T extends ValidTags = 'div'> {
  /** Tag HTML do wrapper (default: 'div') */
  as?: T
  /** General theme (affects overall styling) */
  theme?: Theme
  /** Logo variant for mobile screens */
  logoMobile?: EurekaLogoVariants
  /** Logo variant for desktop screens */
  logoDesktop?: EurekaLogoVariants
  children: React.ReactNode
}

type HeaderThemeSetterProps<T extends ValidTags = 'div'> = HeaderThemeSetterOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeaderThemeSetterOwnProps<T>>

export function HeaderThemeSetter<T extends ValidTags = 'div'>({
  as,
  theme,
  logoMobile,
  logoDesktop,
  children,
  className,
  ...rest
}: HeaderThemeSetterProps<T>) {
  const Component = (as || 'div') as ElementType
  const { changeHeaderTheme } = useHeaderTheme()
  const ref = useRef<HTMLElement>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

  const { scrollY } = useScroll()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const newTheme: HeaderTheme = useMemo(
    () => ({
      theme,
      logoTheme:
        logoMobile || logoDesktop
          ? { mobile: logoMobile ?? null, desktop: logoDesktop ?? null }
          : null,
    }),
    [theme, logoMobile, logoDesktop],
  )

  const visibility = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Track scroll direction
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      const previous = scrollY.getPrevious()
      if (previous !== undefined) {
        const diff = current - previous
        setScrollDirection(diff > 0 ? 'down' : 'up')
      }
    })

    return () => unsubscribe()
  }, [scrollY])

  // Change theme based on visibility and scroll direction
  useEffect(() => {
    const unsubscribe = visibility.on('change', (value) => {
      const downThreshold = 0.45
      const upThreshold = 0.9

      if (
        (scrollDirection === 'down' && value > downThreshold) ||
        (scrollDirection === 'up' && value > upThreshold)
      ) {
        changeHeaderTheme(newTheme)
      }
    })

    return () => unsubscribe()
  }, [visibility, scrollDirection, newTheme, changeHeaderTheme])

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
