import type { Media, Page, Post } from '@/payload-types'

// Tipo que espelha o campo Link (@/fields/link)
export interface LinkField {
  type?: 'reference' | 'custom' | null
  label?: string | null
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: string | Page | Post
  } | null
}

// Tipo para subitem do dropdown
export interface DropdownSubitem {
  link?: LinkField
  image?: string | number | Media | null
  description?: string | null
}

// Tipo para o item do headerMenu (estrutura flat)
// Quando type é 'link': só tem campo 'link'
// Quando type é 'dropdown': tem campos 'label' e 'subitems'
export interface HeaderMenuItem {
  type: 'link' | 'dropdown'
  link?: LinkField
  label?: string | null
  subitems?: DropdownSubitem[] | null
}

// Tipo para links do footer (só tem link field)
export interface FooterLinkItem {
  link?: LinkField
}

// Tipo para redes sociais
export interface SocialLinkData {
  icon?: SocialIconType
  url?: string
  label?: string
}

export type SocialIconType =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp'
  | 'telegram'

export const SOCIAL_ICON_LABELS: Record<SocialIconType, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  twitter: 'Twitter/X',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
}

// Type Guards
export function isDropdownItem(item: HeaderMenuItem): item is HeaderMenuItem & {
  type: 'dropdown'
  label: string
  subitems: DropdownSubitem[]
} {
  return item.type === 'dropdown' && !!item.label && !!item.subitems && item.subitems.length > 0
}

export function isLinkItem(item: HeaderMenuItem): item is HeaderMenuItem & {
  type: 'link'
  link: LinkField
} {
  return item.type === 'link' && item.link !== undefined
}
