import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { getProducts } from '@/services/products'

type SitemapEntry = MetadataRoute.Sitemap[number]

const serverUrl = getServerSideURL()

// ============================================================================
// Helpers
// ============================================================================

function createEntry(
  path: string,
  options: Partial<Omit<SitemapEntry, 'url'>> = {},
): SitemapEntry {
  return {
    url: `${serverUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    ...options,
  }
}

// ============================================================================
// Static Pages
// ============================================================================

function getStaticPages(): SitemapEntry[] {
  return [
    createEntry('', { changeFrequency: 'weekly', priority: 1 }),
    createEntry('/obras', { changeFrequency: 'weekly', priority: 0.9 }),
  ]
}

// ============================================================================
// CMS Pages
// ============================================================================

async function getCmsPages(): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true },
  })

  return docs
    .filter((page) => page.slug !== 'home')
    .map((page) =>
      createEntry(`/${page.slug}`, {
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      }),
    )
}

// ============================================================================
// CMS Posts
// ============================================================================

async function getCmsPosts(): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true },
  })

  return docs.map((post) =>
    createEntry(`/posts/${post.slug}`, {
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  )
}

// ============================================================================
// CMS Projects (desabilitado - collection vazia)
// ============================================================================

// async function getCmsProjects(): Promise<SitemapEntry[]> {
//   const payload = await getPayload({ config: configPromise })
//
//   const { docs } = await payload.find({
//     collection: 'projects',
//     draft: false,
//     limit: 1000,
//     pagination: false,
//     select: { slug: true, updatedAt: true },
//   })
//
//   return docs.map((project) =>
//     createEntry(`/projetos/${project.slug}`, {
//       lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
//       priority: 0.7,
//     }),
//   )
// }

// ============================================================================
// External API: Obras (Eureka Digital)
// ============================================================================

async function getObrasPages(): Promise<SitemapEntry[]> {
  try {
    const { list: products } = await getProducts({ limit: 1000 })

    return products.map((product) =>
      createEntry(`/obras/${product._id}`, {
        changeFrequency: 'weekly',
        priority: 0.7,
      }),
    )
  } catch (error) {
    console.error('[Sitemap] Error fetching obras:', error)
    return []
  }
}

// ============================================================================
// Main Export
// ============================================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cmsPages, cmsPosts, obrasPages] = await Promise.all([
    getCmsPages(),
    getCmsPosts(),
    // getCmsProjects(), // desabilitado - collection vazia
    getObrasPages(),
  ])

  return [
    ...getStaticPages(),
    ...cmsPages,
    ...cmsPosts,
    // ...cmsProjects, // desabilitado - collection vazia
    ...obrasPages,
  ]
}
