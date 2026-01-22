import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

// Fallback para homepage quando SEO não está preenchido no admin
const HOMEPAGE_DEFAULTS = {
  title: 'Grupo Eureka',
  description:
    'Grupo Eureka: 26 anos transformando a educação pública brasileira. Soluções educacionais inovadoras, plataforma digital e formação docente para redes de ensino.',
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args
  const serverUrl = getServerSideURL()

  const ogImage = getImageURL(doc?.meta?.image)

  // Detecta se é homepage (sem slug ou slug 'home')
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const isHomepage = !slug || slug === 'home'

  const SITE_NAME_SUFFIX = ' | Grupo Eureka'
  const rawTitle = doc?.meta?.title

  const title = rawTitle
    ? rawTitle.endsWith(SITE_NAME_SUFFIX)
      ? rawTitle
      : rawTitle + SITE_NAME_SUFFIX
    : isHomepage
      ? HOMEPAGE_DEFAULTS.title
      : 'Grupo Eureka'

  const description = doc?.meta?.description || (isHomepage ? HOMEPAGE_DEFAULTS.description : undefined)

  // Gera o path para canonical e OpenGraph
  const path = isHomepage ? '' : `/${slug}`
  const canonicalUrl = `${serverUrl}${path}`

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path || '/',
    }),
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
