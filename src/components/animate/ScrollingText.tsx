'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

interface ScrollingTextProps {
  text: string
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export const ScrollingText = ({ text, tag: Tag = 'p', className }: ScrollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textWidth, setTextWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (textRef.current) {
        const tWidth = textRef.current.scrollWidth
        const vWidth = window.innerWidth

        setTextWidth(tWidth)
        setViewportWidth(vWidth)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    setTimeout(updateDimensions, 100)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [text])

  useEffect(() => {
    setShouldAnimate(textWidth > viewportWidth)
  }, [textWidth, viewportWidth])

  // Deslocamento = quanto o texto excede a tela
  const maxTranslate = shouldAnimate ? -(textWidth - viewportWidth) : 0

  // Animação: scroll 0 → mostra início (x=0), scroll 1 → mostra final (x=maxTranslate negativo)
  const xRaw = useTransform(scrollYProgress, [0.3, 0.7], [0, maxTranslate])

  // Suaviza com spring physics - mais inércia para movimento orgânico
  const x = useSpring(xRaw, {
    stiffness: 50,
    damping: 20,
    mass: 2,
  })

  return (
    <div ref={containerRef} className={cn('flex items-center overflow-hidden', className)}>
      <div className="w-full">
        <motion.div
          ref={textRef}
          style={{
            x: shouldAnimate ? x : 0,
          }}
          className="inline-block whitespace-nowrap"
        >
          <Tag className="px-8 text-6xl font-black whitespace-nowrap text-white md:text-8xl xl:text-[200px]">
            {text}
          </Tag>
        </motion.div>
      </div>
    </div>
  )
}
