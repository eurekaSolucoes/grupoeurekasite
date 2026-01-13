import { Footer } from '@/Footer/Component'

export default function PagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
