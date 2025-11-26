import { Footer } from '@/Footer/Component'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="relative z-10">{children}</main>
      <Footer className="sticky bottom-0 z-0" />
    </>
  )
}
