'use client'

import { useMemo, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { ScrollContext } from './ScrollContext'

/**
 * Spring physics configuration for smooth animations
 */
interface SpringConfig {
  stiffness?: number
  damping?: number
  restDelta?: number
}

/**
 * Props for ScrollAnimatedWrapper component
 */
export interface ScrollAnimatedWrapperProps {
  /** Content to render inside the wrapper */
  children: React.ReactNode

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

  /** Additional CSS classes */
  className?: string

  /** Additional inline styles */
  style?: React.CSSProperties
}

const defaultSpringConfig: SpringConfig = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
}

/**
 * Animated wrapper component that grows in width and reduces border-radius based on scroll.
 * Provides scroll context to children without causing re-renders (uses MotionValues).
 *
 * @example
 * ```tsx
 * <ScrollAnimatedWrapper
 *   initialWidth="80vw"
 *   finalWidth="100vw"
 *   initialBorderRadius={50}
 *   className="bg-blue-500"
 * >
 *   <div>My content</div>
 * </ScrollAnimatedWrapper>
 * ```
 *
 * @example With child using scroll context
 * ```tsx
 * <ScrollAnimatedWrapper>
 *   <AnimatedCircle />
 * </ScrollAnimatedWrapper>
 *
 * function AnimatedCircle() {
 *   const { scrollYProgress } = useScrollAnimatedContext()
 *   const y = useTransform(scrollYProgress, [0, 1], [0, -100])
 *   return <motion.div style={{ y }} />
 * }
 * ```
 */
export function ScrollAnimatedWrapper({
  children,
  initialWidth = '80vw',
  finalWidth = '100vw',
  initialBorderRadius = 50,
  finalBorderRadius = 0,
  scrollRange = [0, 0.3],
  scrollOffset = ['start end', 'end end'],
  springConfig = defaultSpringConfig,
  className,
  style,
}: ScrollAnimatedWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Single scroll tracking for the entire component tree
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: scrollOffset,
  })

  // Transform width from initial to final based on scroll progress
  const rawWidth = useTransform(scrollYProgress, scrollRange, [initialWidth, finalWidth])
  const width = useSpring(rawWidth, { ...defaultSpringConfig, ...springConfig })

  // Transform border-radius from initial to final (top corners only)
  const rawBorderRadius = useTransform(
    scrollYProgress,
    scrollRange,
    [initialBorderRadius, finalBorderRadius],
  )
  const borderRadius = useSpring(rawBorderRadius, { ...defaultSpringConfig, ...springConfig })

  // Memoized context value - never changes reference, preventing re-renders
  // MotionValues update the DOM directly without triggering React renders
  const scrollContextValue = useMemo(
    () => ({
      scrollYProgress,
      scrollY,
      containerRef,
    }),
    [], // Empty deps - context object is stable
  )

  return (
    <ScrollContext.Provider value={scrollContextValue}>
      <motion.div
        ref={containerRef}
        className={cn('relative', className)}
        style={{
          width,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          ...style,
        }}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  )
}
