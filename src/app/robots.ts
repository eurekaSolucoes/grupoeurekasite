import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getServerSideURL()

  return {
    rules: {
      userAgent: '*',
      disallow: '/admin/',
    },
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/pages-sitemap.xml`,
      `${siteUrl}/posts-sitemap.xml`,
      `${siteUrl}/obras-sitemap.xml`,
    ],
    host: siteUrl,
  }
}
