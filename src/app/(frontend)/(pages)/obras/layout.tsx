import { Header } from '@/Header/Component'

export default function ObrasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header bgTheme="blue" />
      {children}
    </>
  )
}
