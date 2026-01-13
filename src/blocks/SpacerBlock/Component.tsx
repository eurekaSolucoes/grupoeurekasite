import type { SpacerBlock as SpacerBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type SpacerBlockProps = Partial<Omit<SpacerBlockType, 'id' | 'blockName' | 'blockType'>> & {
  className?: string
}

const sizeClasses: Record<SpacerBlockType['size'], string> = {
  xs: 'h-2.5 md:h-5', // 10px mobile, 20px desktop
  sm: 'h-5 md:h-10', // 20px mobile, 40px desktop
  md: 'h-10 md:h-20', // 40px mobile, 80px desktop
  lg: 'h-15 md:h-30', // 60px mobile, 120px desktop
}

export function SpacerBlock({ size = 'md', className }: Readonly<SpacerBlockProps>) {
  return (
    <div
      className={cn(sizeClasses[size], 'last:bg-linear-to-t last:from-input', className)}
      aria-hidden="true"
    />
  )
}
