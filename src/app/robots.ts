import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getServerSideURL()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/_next/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
