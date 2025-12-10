'use client'

import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useId, useRef } from 'react'

interface MiddleConnectorProps {
  className?: string
}

const MIDDLE_PATH =
  'M1.5 1.50024L206.039 31.9723C224.967 34.7922 234.63 56.2506 224.196 72.2928C219.39 79.6819 218.609 88.9883 222.115 97.0753L229.6 114.338C234.002 124.489 234.002 136.011 229.6 146.163L223.4 160.463C218.998 170.614 218.998 182.136 223.4 192.288L229.6 206.588C234.002 216.739 234.002 228.261 229.6 238.413L223.4 252.713C218.998 262.864 218.998 274.386 223.4 284.538L229.6 298.838C234.002 308.989 234.002 320.511 229.6 330.663L222.277 347.553C218.669 355.872 219.473 365.446 224.417 373.048C234.928 389.209 225.631 410.863 206.675 414.372L11.5 450.5'

export function MiddleConnector({ className }: Readonly<MiddleConnectorProps>) {
  const maskId = useId()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smoothPathLength = useSpring(pathLength, { stiffness: 50, damping: 20 })

  return (
    <motion.svg
      ref={ref}
      width="235"
      height="100%"
      viewBox="0 0 235 452"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <motion.path
            d={MIDDLE_PATH}
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            style={{ pathLength: smoothPathLength }}
          />
        </mask>
      </defs>
      <path
        d={MIDDLE_PATH}
        stroke="#F37700"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 8"
        fill="none"
        mask={`url(#${maskId})`}
      />
    </motion.svg>
  )
}
