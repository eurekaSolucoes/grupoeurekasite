'use client'

import { useHeaderTheme, HeaderTheme, HeaderThemeVariant } from '@/providers/HeaderTheme'
import { EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ComponentPropsWithoutRef,
  useMemo,
} from 'react'
import { useScroll, useTransform } from 'motion/react'

type ValidTags = 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'

interface HeaderThemeSetterOwnProps<T extends ValidTags = 'div'> {
  /** Tag HTML do wrapper (default: 'div') */
  as?: T
  /** Visual theme for header styling (secondary/default) */
  theme?: HeaderThemeVariant
  /** Logo variant for mobile screens */
  logoMobile?: EurekaLogoVariants
  /** Logo variant for desktop screens */
  logoDesktop?: EurekaLogoVariants
  children: React.ReactNode
  downThreshold?: number
  upThreshold?: number
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
  downThreshold = 0.45,
  upThreshold = 0.9,
  ...rest
}: HeaderThemeSetterProps<T>) {
  const Component = (as || 'div') as ElementType
  const { changeHeaderTheme } = useHeaderTheme()
  const ref = useRef<HTMLElement>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [hasScrolled, setHasScrolled] = useState(false)

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

  // Track scroll direction and mark when user has actually scrolled
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      const previous = scrollY.getPrevious()
      if (previous !== undefined) {
        const diff = current - previous
        if (Math.abs(diff) > 0) {
          setHasScrolled(true)
        }
        setScrollDirection(diff > 0 ? 'down' : 'up')
      }
    })

    return () => unsubscribe()
  }, [scrollY])

  // Change theme based on visibility and scroll direction (only after user has scrolled)
  useEffect(() => {
    const unsubscribe = visibility.on('change', (value) => {
      if (!hasScrolled) return

      if (
        (scrollDirection === 'down' && value > downThreshold) ||
        (scrollDirection === 'up' && value > upThreshold)
      ) {
        changeHeaderTheme(newTheme)
      }
    })

    return () => unsubscribe()
  }, [visibility, scrollDirection, newTheme, changeHeaderTheme, hasScrolled, downThreshold, upThreshold])

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
