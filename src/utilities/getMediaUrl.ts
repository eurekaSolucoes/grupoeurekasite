import type { Media } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}

/**
 * Extrai a URL de um campo de mídia do Payload CMS
 * Suporta Media objects, strings (URLs diretas), ou IDs numéricos
 */
export function getMediaUrlFromField(
  media: Media | string | number | null | undefined,
): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (typeof media === 'number') return undefined
  return media.url || undefined
}

/**
 * Extrai o texto alternativo de um campo de mídia do Payload CMS
 */
export function getMediaAlt(media: Media | string | number | null | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return ''
  if (typeof media === 'number') return ''
  return media.alt || ''
}

/**
 * Converte um campo de mídia do Payload para o formato { src, alt }
 * Útil para componentes que esperam esse formato
 */
export function mediaToImageProps(
  media: Media | string | number | null | undefined,
): { src: string; alt: string } | undefined {
  const src = getMediaUrlFromField(media)
  if (!src) return undefined
  return {
    src,
    alt: getMediaAlt(media),
  }
}
