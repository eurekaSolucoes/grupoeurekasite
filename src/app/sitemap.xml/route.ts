import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const siteUrl = getServerSideURL()

  const sitemaps = [
    `${siteUrl}/pages-sitemap.xml`,
    `${siteUrl}/posts-sitemap.xml`,
    `${siteUrl}/obras-sitemap.xml`,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((url) => `<sitemap><loc>${url}</loc></sitemap>`).join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
