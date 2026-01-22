import { cn } from '@/utilities/ui'

interface SkipLinkProps {
  className?: string
}

export function SkipLink({ className }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:left-4 focus:top-4 focus:z-[100]',
        'focus:rounded-md focus:bg-primary focus:px-4 focus:py-2',
        'focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring',
        className,
      )}
    >
      Pular para conteúdo principal
    </a>
  )
}
