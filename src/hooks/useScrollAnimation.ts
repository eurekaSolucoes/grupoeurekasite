'use client'

import { useRef } from 'react'
import { useScroll, useSpring, useTransform, MotionValue } from 'motion/react'
import type { RefObject } from 'react'

/**
 * Spring physics configuration for smooth animations
 */
export interface SpringConfig {
  stiffness?: number
  damping?: number
  restDelta?: number
}

/**
 * Options for useScrollAnimation hook
 */
export interface UseScrollAnimationOptions {
  /** Initial width before animation starts */
  initialWidth?: string | number
  /** Final width when animation completes */
  finalWidth?: string | number
  /** Initial border radius for top corners (in pixels) */
  initialBorderRadius?: number
  /** Final border radius for top corners (in pixels) */
  finalBorderRadius?: number
  /** Scroll progress range where animation occurs [start, end] */
  scrollRange?: [number, number]
  /** Scroll offset for tracking ['start position', 'end position'] */
  scrollOffset?: [string, string]
  /** Optional spring physics configuration for smooth animations */
  springConfig?: SpringConfig
}

/**
 * Return type for useScrollAnimation hook
 */
export interface UseScrollAnimationReturn {
  /** Ref to attach to the scroll container element */
  containerRef: RefObject<HTMLDivElement | null>
  /** Scroll progress from 0 to 1 based on container position */
  scrollYProgress: MotionValue<number>
  /** Absolute scroll Y position */
  scrollY: MotionValue<number>
  /** Animated width value */
  width: MotionValue<string | number>
  /** Animated border radius value (with spring physics) */
  borderRadius: MotionValue<number>
}

const defaultSpringConfig: SpringConfig = {
  stiffness: 50,
  damping: 20,
  restDelta: 0.001,
}

/**
 * Hook for scroll-based animations with width and border-radius transforms.
 * Returns MotionValues that can be used with motion components.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { containerRef, scrollYProgress, width, borderRadius } = useScrollAnimation({
 *     initialBorderRadius: 32,
 *     finalBorderRadius: 0,
 *   })
 *
 *   return (
 *     <motion.div
 *       ref={containerRef}
 *       style={{ width, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
 *     >
 *       Content
 *     </motion.div>
 *   )
 * }
 * ```
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {},
): UseScrollAnimationReturn {
  const {
    initialWidth = '50vw',
    finalWidth = '100vw',
    initialBorderRadius = 50,
    finalBorderRadius = 0,
    scrollRange = [0, 0.3],
    scrollOffset = ['start end', 'end end'],
    springConfig = defaultSpringConfig,
  } = options

  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll tracking for the container
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: scrollOffset as ['start end', 'end end'],
  })

  // Transform width from initial to final based on scroll progress
  const width = useTransform(scrollYProgress, scrollRange, [initialWidth, finalWidth])

  // Transform border-radius from initial to final (with spring physics)
  const rawBorderRadius = useTransform(scrollYProgress, scrollRange, [
    initialBorderRadius,
    finalBorderRadius,
  ])
  const borderRadius = useSpring(rawBorderRadius, { ...defaultSpringConfig, ...springConfig })

  return {
    containerRef,
    scrollYProgress,
    scrollY,
    width,
    borderRadius,
  }
}
