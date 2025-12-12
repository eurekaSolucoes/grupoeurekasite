// Tipos de fundo do header (extensível para novas cores)
export type BgTheme = 'blue' | null

// Config de cada bgTheme
export const bgThemeConfig = {
  blue: {
    className: 'bg-[linear-gradient(315deg,#162A6B_31.39%,#233E94_80.12%)]',
    navTheme: 'default' as const,
    logoDesktop: 'full' as const,
    logoMobile: 'icon-white' as const,
  },
}
