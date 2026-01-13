'use client'

import { useRowLabel } from '@payloadcms/ui'
import type { HeaderMenuItem, FooterLinkItem, SocialLinkData } from './types'
import { SOCIAL_ICON_LABELS } from './types'

export const HeaderMenuRowLabel = () => {
  const { data } = useRowLabel<HeaderMenuItem>()
  const isDropdown = data?.type === 'dropdown'
  const typeLabel = isDropdown ? '[Dropdown]' : '[Link]'
  const label = isDropdown
    ? data?.label || 'Dropdown sem título'
    : data?.link?.label || data?.link?.url || 'Link sem título'

  return `${typeLabel} ${label}`
}

export const SubitemRowLabel = () => {
  const { rowNumber = 0 } = useRowLabel()
  return `Subitem ${String(rowNumber + 1).padStart(2, '0')}`
}

export const FooterLinkRowLabel = () => {
  const { data } = useRowLabel<FooterLinkItem>()

  return data?.link?.label || data?.link?.url || 'Link sem título'
}

export const SocialLinkRowLabel = () => {
  const { data } = useRowLabel<SocialLinkData>()

  const iconLabel = data?.icon ? SOCIAL_ICON_LABELS[data.icon] : 'Rede social'
  return `${iconLabel}${data?.label ? ` - ${data.label}` : ''}`
}
