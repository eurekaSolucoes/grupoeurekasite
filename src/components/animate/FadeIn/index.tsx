'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { animationPresets, type FadeInVariant } from './config'

type MotionDivProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'whileInView' | 'viewport' | 'transition'
>

export interface FadeInProps extends MotionDivProps {
  children: ReactNode
  variant?: FadeInVariant
  delay?: number
  viewportAmount?: number
}

/**
 * Wrapper component that animates children on viewport entry.
 *
 * @example
 * ```tsx
 * <FadeIn variant="fadeUp" delay={0.1}>
 *   <Media resource={image} />
 * </FadeIn>
 * ```
 */
export function FadeIn({
  children,
  variant = 'fadeUp',
  delay = 0,
  viewportAmount = 0.3,
  className,
  ...props
}: Readonly<FadeInProps>) {
  const preset = animationPresets[variant]

  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.animate}
      transition={{
        ...preset.transition,
        delay,
      }}
      viewport={{ amount: viewportAmount, once: true }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
