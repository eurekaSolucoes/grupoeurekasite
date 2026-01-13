import { cn } from '@/utilities/ui'
import { HTMLAttributes } from 'react'
import { ArrowRightIcon } from 'lucide-react'

export function ArrowRight({ className, ...rest }: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground',
        className,
      )}
      {...rest}
    >
      <ArrowRightIcon className="text-current" />
    </div>
  )
}
