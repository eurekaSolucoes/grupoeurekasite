import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'

import type { Page, Post, Document } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  document?: Document | string | number | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'document' | null
  url?: string | null
  hasIcon?: boolean
} & HTMLAttributes<HTMLAnchorElement>

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    document,
    size: sizeFromProps,
    url,
    hasIcon,
    ...rest
  } = props

  const href = (() => {
    if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
      return `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
    }
    if (type === 'document' && typeof document === 'object' && document?.url) {
      return document.url
    }
    return url
  })()

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  // Documentos sempre abrem em nova aba por padrão
  const shouldOpenNewTab = newTab || type === 'document'
  const newTabProps = shouldOpenNewTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps} {...rest}>
        {label}
        {children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance} hasIcon={hasIcon}>
      <Link href={href || url || ''} {...newTabProps} {...rest}>
        <span>
          {label}
          {children}
        </span>
      </Link>
    </Button>
  )
}
