import * as React from 'react'
import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const getGridClass = () => {
    if (!width) return 'col-span-full'
    const w = Number(width)
    if (w <= 25) return 'col-span-1 lg:col-span-1' // 50% mobile, 25% desktop
    if (w <= 50) return 'col-span-full lg:col-span-2' // 100% mobile, 50% desktop
    return 'col-span-full lg:col-span-4' // 100% both
  }

  return <div className={cn(getGridClass(), className)}>{children}</div>
}
