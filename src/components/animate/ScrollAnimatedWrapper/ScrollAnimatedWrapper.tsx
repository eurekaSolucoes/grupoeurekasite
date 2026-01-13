'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { UseScrollAnimationReturn } from '@/hooks/useScrollAnimation'

/**
 * Props for ScrollAnimatedWrapper component
 */
export interface ScrollAnimatedWrapperProps {
  /** Content to render inside the wrapper */
  children: React.ReactNode

  /** Scroll animation values from useScrollAnimation hook (required) */
  scrollAnimation: UseScrollAnimationReturn

  /** Background color/class for the outer section */
  background?: string

  /** Additional CSS classes for the outer section */
  className?: string

  /** Additional CSS classes for the inner animated div */
  innerClassName?: string

  /** Additional inline styles for the outer section */
  style?: React.CSSProperties

  /** Additional inline styles for the inner animated div */
  innerStyle?: React.CSSProperties
}

/**
 * Animated wrapper component with customizable background.
 * The inner div grows in width and reduces border-radius based on scroll.
 * Provides scroll context to children without causing re-renders (uses MotionValues).
 *
 * MUST be used with useScrollAnimation hook.
 *
 * @example
 * ```tsx
 * const scrollAnimation = useScrollAnimation({
 *   initialBorderRadius: 32,
 *   finalBorderRadius: 0,
 * })
 *
 * <ScrollAnimatedWrapper
 *   scrollAnimation={scrollAnimation}
 *   background="bg-brand-dark-blue"
 *   innerClassName="bg-white"
 * >
 *   <Content />
 * </ScrollAnimatedWrapper>
 * ```
 */
export function ScrollAnimatedWrapper({
  children,
  scrollAnimation,
  background,
  className,
  innerClassName,
  style,
  innerStyle,
}: Readonly<ScrollAnimatedWrapperProps>) {
  const { containerRef, width, borderRadius } = scrollAnimation

  return (
    <div
      className={cn('relative z-10 flex w-full justify-center', background, className)}
      style={style}
    >
      <motion.div
        ref={containerRef}
        className={cn('relative overflow-clip', innerClassName)}
        style={{
          width,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          ...innerStyle,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
          restDelta: 0.001,
        }}
      >
        <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>{children}</div>
      </motion.div>
    </div>
  )
}
