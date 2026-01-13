import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer className="sticky bottom-0 z-0" />
    </>
  )
}
