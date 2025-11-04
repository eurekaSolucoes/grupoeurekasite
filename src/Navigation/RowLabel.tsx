'use client'

import type { ArrayFieldRowLabel } from 'payload'

export const HeaderMenuRowLabel: ArrayFieldRowLabel = ({ data }) => {
  return data?.link?.label || data?.link?.url || 'Link sem título'
}

export const FooterLinkRowLabel: ArrayFieldRowLabel = ({ data }) => {
  return data?.link?.label || data?.link?.url || 'Link sem título'
}

export const SocialLinkRowLabel: ArrayFieldRowLabel = ({ data }) => {
  const iconLabels: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    twitter: 'Twitter/X',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
  }

  const iconLabel = data?.icon ? iconLabels[data.icon] : 'Rede social'
  return `${iconLabel}${data?.label ? ` - ${data.label}` : ''}`
}
