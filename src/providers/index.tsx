import { HeaderThemeProvider } from './HeaderTheme'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <NuqsAdapter>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </NuqsAdapter>
  )
}
