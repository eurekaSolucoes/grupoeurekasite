'use client'

import { createContext } from 'react'
import type { MotionValue } from 'motion/react'

/**
 * Context value type containing Motion values for scroll-based animations.
 * MotionValues don't trigger React re-renders when they change.
 */
export interface ScrollContextValue {
  /** Scroll progress from 0 to 1 based on container position */
  scrollYProgress: MotionValue<number>
  /** Absolute scroll Y position */
  scrollY: MotionValue<number>
  /** Ref to the scroll container element */
  containerRef: React.RefObject<HTMLDivElement>
}

/**
 * Context for sharing scroll animation state without causing re-renders.
 * Uses MotionValues which update the DOM directly without triggering React renders.
 */
export const ScrollContext = createContext<ScrollContextValue | undefined>(undefined)
