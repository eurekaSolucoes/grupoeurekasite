'use client'
import { cn } from '@/utilities/ui'
import type { ReactNode } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface NavContainerProps {
  children: ReactNode
  className?: string
}

/**
 * NavContainer Component
 *
 * Container da navegação do header (desktop/mobile + botões de ação).
 * Estilo: fundo vermelho, arredondado, espaçamento interno.
 */
export function NavContainer({ children, className }: Readonly<NavContainerProps>) {
  const { headerTheme, changeHeaderTheme } = useHeaderTheme()

  return (
    <nav
      className={cn(
        'progressive-blur flex items-center space-x-4 rounded-[calc((infinity*1px)-1px)] border-t border-white/50 bg-[#bbb]/30 p-2',
        className,
      )}
    >
      {children}
    </nav>
  )
}
