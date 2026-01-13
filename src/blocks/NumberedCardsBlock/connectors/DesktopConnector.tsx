'use client'

import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useId, useRef } from 'react'

interface DesktopConnectorProps {
  className?: string
}

// Path reversed to animate from top to bottom
const DESKTOP_PATH =
  'M826.129 1.50012L789.921 50.6712C773.267 73.2872 773.267 104.108 789.921 126.724L808.648 152.156C818.438 165.451 816.074 184.089 803.274 194.518C779.122 214.197 795.886 253.208 826.786 249.229L841.646 247.315L387.598 339.116C302.618 356.297 275.343 464.213 341.955 519.708L379.483 550.972C438.164 599.859 406.528 695.344 330.266 699.522C135.601 710.186 38.2909 940.678 162.567 1090.89C202.537 1139.2 260.327 1170.51 322.687 1177.07L349.739 1179.92C377.249 1182.81 404.02 1190.6 428.789 1202.91C588.99 1282.57 602.587 1505.91 453.233 1604.41L443.221 1611.02C415.599 1629.23 384.495 1641.52 351.878 1647.09L134.62 1684.18C53.6256 1698.01 -3.75176 1770.91 1.83298 1852.89L3.44533 1876.55C8.26061 1947.24 67.0007 2002.11 137.847 2002.11H181.739C233.611 2002.11 275.241 2044.95 273.759 2096.8C272.065 2156.08 326.039 2201.47 384.148 2189.63L422.094 2181.91C496.761 2166.7 567.102 2222.47 569.321 2298.64L572.477 2406.97C573.898 2455.73 534.751 2496.04 485.964 2496.04H480.933C442.881 2496.04 410.045 2522.73 402.269 2559.97C395.48 2592.49 369.387 2617.48 336.608 2622.85L316.755 2626.11C206.709 2644.15 190.667 2795.82 294.502 2836.49L329.381 2850.15C395.696 2876.12 439.328 2940.07 439.328 3011.29V3171.71'

export function DesktopConnector({ className }: Readonly<DesktopConnectorProps>) {
  const maskId = useId()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.5', 'end 0.6'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smoothPathLength = useSpring(pathLength, { stiffness: 80, damping: 30 })

  return (
    <motion.svg
      ref={ref}
      width="842"
      height="3174"
      viewBox="0 0 842 3174"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <motion.path
            d={DESKTOP_PATH}
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
        d={DESKTOP_PATH}
        stroke="#F37700"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="10 10"
        preserveAspectRatio="none"
        fill="none"
        mask={`url(#${maskId})`}
      />
    </motion.svg>
  )
}
