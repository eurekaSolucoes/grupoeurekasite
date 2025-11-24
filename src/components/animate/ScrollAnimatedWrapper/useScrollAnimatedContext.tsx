'use client'

import { useContext } from 'react'
import { ScrollContext, type ScrollContextValue } from './ScrollContext'

/**
 * Hook to access scroll animation context from ScrollAnimatedWrapper.
 *
 * @throws {Error} If used outside of ScrollAnimatedWrapper component
 * @returns {ScrollContextValue} Object containing scrollYProgress, scrollY, and containerRef
 *
 * @example
 * ```tsx
 * function AnimatedChild() {
 *   const { scrollYProgress } = useScrollAnimatedContext()
 *   const y = useTransform(scrollYProgress, [0, 1], [0, -100])
 *   return <motion.div style={{ y }} />
 * }
 * ```
 */
export function useScrollAnimatedContext(): ScrollContextValue {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error(
      'useScrollAnimatedContext must be used within a ScrollAnimatedWrapper component',
    )
  }

  return context
}
