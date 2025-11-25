'use client'

import { cn } from '@/utilities/ui'
import { ArrowRight } from '@/components/Icons/ArrowRight'

export interface HoverScaleCardProps {
  /** Content to render inside the card */
  children: React.ReactNode
  /** Additional CSS classes for the container */
  className?: string
  /** Whether to show the arrow icon on hover (default: true) */
  showArrow?: boolean
  /** Position of the arrow icon */
  arrowPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Additional CSS classes for the arrow */
  arrowClassName?: string
}

const arrowPositionClasses = {
  'bottom-right': 'right-4 bottom-0 translate-y-1/2',
  'bottom-left': 'left-4 bottom-0 translate-y-1/2',
  'top-right': 'right-4 top-0 -translate-y-1/2',
  'top-left': 'left-4 top-0 -translate-y-1/2',
}

/**
 * Reusable wrapper component that applies hover scale effect and animated arrow icon.
 * Used for interactive cards throughout the homepage sections.
 *
 * @example
 * ```tsx
 * <HoverScaleCard>
 *   <div className="p-4">Card content</div>
 * </HoverScaleCard>
 * ```
 */
export function HoverScaleCard({
  children,
  className,
  showArrow = true,
  arrowPosition = 'bottom-right',
  arrowClassName,
}: Readonly<HoverScaleCardProps>) {
  return (
    <div
      className={cn(
        'group relative hover:z-40 lg:transition-transform lg:duration-300 lg:hover:scale-110',
        className,
      )}
    >
      {children}
      {showArrow && (
        <ArrowRight
          className={cn(
            'absolute z-30 shadow-[0_6.857px_13.714px_0_rgba(0,0,0,0.40)]',
            'animate-out duration-300 fill-mode-forwards zoom-out-90 fade-out slide-out-to-left-4',
            'group-hover:animate-in group-hover:zoom-in-90 group-hover:fade-in group-hover:slide-in-from-left-4',
            arrowPositionClasses[arrowPosition],
            arrowClassName,
          )}
        />
      )}
    </div>
  )
}
