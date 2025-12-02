'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollDirection() {
  const lastY = useRef(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setDirection(currentY > lastY.current ? 'down' : 'up')
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
