import { Header } from '@/Header/Component'

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header defaultMobileVariant="icon-white" />
      {children}
    </>
  )
}
