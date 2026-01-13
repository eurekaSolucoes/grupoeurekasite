'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

type CounterProps = {
  value: number
  direction?: 'up' | 'down'
  className?: string
}

function getDecimalPlaces(num: number): number {
  const str = num.toString()
  const decimalIndex = str.indexOf('.')
  return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1
}

export function Counter({ value, direction = 'up', className }: Readonly<CounterProps>) {
  const decimalPlaces = getDecimalPlaces(value)
  const initialValue = direction === 'down' ? value : 0
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(initialValue)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    // Subscription primeiro
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(latest)
      }
    })

    // Depois dispara a animação se já estiver em view
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value)
    }

    return unsubscribe
  }, [springValue, decimalPlaces, isInView, motionValue, direction, value])

  const formattedInitial = Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(initialValue)

  return (
    <span className={className} ref={ref}>
      {formattedInitial}
    </span>
  )
}
