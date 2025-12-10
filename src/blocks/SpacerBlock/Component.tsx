import { cn } from '@/utilities/ui'

type SpacerSize = 'xs' | 'sm' | 'md' | 'lg'

export interface SpacerBlockProps {
  size?: SpacerSize
  className?: string
}

const sizeClasses: Record<SpacerSize, string> = {
  xs: 'h-2.5 md:h-5', // 10px mobile, 20px desktop
  sm: 'h-5 md:h-10', // 20px mobile, 40px desktop
  md: 'h-10 md:h-20', // 40px mobile, 80px desktop
  lg: 'h-15 md:h-30', // 60px mobile, 120px desktop
}

export function SpacerBlock({ size = 'md', className }: SpacerBlockProps) {
  return (
    <div
      className={cn(sizeClasses[size], 'last:bg-linear-to-t last:from-input', className)}
      aria-hidden="true"
    />
  )
}
