'use client'

import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useId, useRef } from 'react'

interface FirstConnectorProps {
  className?: string
}

const FIRST_PATH =
  'M206.5 1.50037L219.6 31.7127C224.002 41.8645 224.002 53.3862 219.6 63.538L213.4 77.8377C208.998 87.9895 208.998 99.5112 213.4 109.663L219.6 123.963C224.002 134.115 224.002 145.636 219.6 155.788L213.4 170.088C208.998 180.24 208.998 191.761 213.4 201.913L219.6 216.213C224.002 226.365 224.002 237.886 219.6 248.038L212.277 264.928C208.669 273.247 209.473 282.822 214.417 290.423C224.928 306.584 215.631 328.238 196.675 331.747L1.5 367.875'

export function FirstConnector({ className }: Readonly<FirstConnectorProps>) {
  const maskId = useId()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.5'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smoothPathLength = useSpring(pathLength, { stiffness: 50, damping: 20 })

  return (
    <motion.svg
      ref={ref}
      width="225"
      height="100%"
      viewBox="0 0 225 370"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <motion.path
            d={FIRST_PATH}
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
        d={FIRST_PATH}
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
