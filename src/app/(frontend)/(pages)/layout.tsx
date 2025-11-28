import { Footer } from '@/Footer/Component'

export default function PagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <div className="h-15 bg-linear-to-t from-input lg:h-30" />
      <Footer />
    </>
  )
}
