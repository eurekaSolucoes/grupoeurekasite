import { Footer } from '@/Footer/Component'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
