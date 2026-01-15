import { getServerSideSitemap } from 'next-sitemap'
import { getProducts } from '@/services/products'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const SITE_URL = getServerSideURL()
  const dateFallback = new Date().toISOString()

  // Página principal de obras
  const sitemap: { loc: string; lastmod: string }[] = [
    {
      loc: `${SITE_URL}/obras`,
      lastmod: dateFallback,
    },
  ]

  // Buscar todos os produtos da API externa
  try {
    const { list } = await getProducts({ limit: 1000, page: 1 })

    list.forEach((product) => {
      sitemap.push({
        loc: `${SITE_URL}/obras/${product._id}`,
        lastmod: dateFallback,
      })
    })
  } catch (error) {
    console.error('Erro ao gerar sitemap de obras:', error)
  }

  return getServerSideSitemap(sitemap)
}
