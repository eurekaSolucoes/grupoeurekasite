import { Header, type BgTheme } from '@/Header/Component'
import { queryPageBySlug } from './queries'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug?: string }>
}

export default async function PageLayout({ children, params }: LayoutProps) {
  const { slug = 'home' } = await params
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug({ slug: decodedSlug })
  const bgTheme = (page?.hero?.bgTheme || null) as BgTheme

  return (
    <>
      <Header bgTheme={bgTheme} />
      {children}
    </>
  )
}
