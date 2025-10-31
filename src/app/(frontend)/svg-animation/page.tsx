'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function MergeDots() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const dots = [
    { id: 1, x: 10, y: 50, color: '#007AFF' },
    { id: 2, x: 30, y: 50, color: '#34C759' },
    { id: 3, x: 50, y: 50, color: '#FF9500' },
    { id: 4, x: 70, y: 50, color: '#FF2D55' },
    { id: 5, x: 90, y: 50, color: '#AF52DE', shouldStayVisible: true },
    { id: 6, x: 110, y: 50, color: '#5AC8FA' },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="120" height="100" viewBox="0 0 120 100">
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            r={6}
            fill={dot.color}
            animate={{
              cx: isCollapsed ? 60 : dot.x,
              cy: isCollapsed ? 50 : dot.y,
              opacity: isCollapsed && !dot.shouldStayVisible ? 0 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 12,
              delay: dot.id * 0.05, // leve atraso entre as bolinhas
            }}
          />
        ))}
      </svg>

      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="rounded bg-black px-3 py-1.5 text-white"
      >
        {isCollapsed ? 'Expandir' : 'Juntar'}
      </button>
    </div>
  )
}
