'use client'
import { cn } from '@/utilities/ui'
import type { ReactNode } from 'react'
import { HeaderTheme, useHeaderTheme } from '@/providers/HeaderTheme'
import { Theme } from '@/providers/Theme/types'

interface NavContainerProps {
  children: ReactNode
  className?: string
}

const headerThemeMap: Record<Theme, string> = {
  default: 'bg-[#bbb]/30',
  secondary: 'bg-secondary/80',
}

/**
 * NavContainer Component
 *
 * Container da navegação do header (desktop/mobile + botões de ação).
 * Estilo: fundo vermelho, arredondado, espaçamento interno.
 */
export function NavContainer({ children, className }: Readonly<NavContainerProps>) {
  const { headerTheme } = useHeaderTheme()

  const bgColor = headerThemeMap[headerTheme?.theme ?? 'default']

  return (
    <div
      className={cn(
        'progressive-blur flex items-center gap-x-4 rounded-[calc((infinity*1px)-1px)] border-t border-white/50 p-2 lg:gap-x-2.5 lg:p-2.5',
        className,
        bgColor,
      )}
    >
      {children}
    </div>
  )
}
