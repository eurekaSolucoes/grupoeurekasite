import type { Transition, TargetAndTransition } from 'motion/react'

export type FadeInVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fade'

export interface AnimationPreset {
  initial: TargetAndTransition
  animate: TargetAndTransition
  transition: Transition
}

const springTransition: Transition = {
  duration: 0.6,
  type: 'spring',
  stiffness: 50,
  damping: 20,
  restDelta: 0.001,
}

export const animationPresets: Record<FadeInVariant, AnimationPreset> = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: springTransition,
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: springTransition,
  },
  fadeLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: springTransition,
  },
  fadeRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: springTransition,
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
}
