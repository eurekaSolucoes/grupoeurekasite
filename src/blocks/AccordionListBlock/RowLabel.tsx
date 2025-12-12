'use client'

import { useRowLabel } from '@payloadcms/ui'

export const AccordionItemRowLabel = () => {
  const { data } = useRowLabel<{ title?: string }>()
  return <span>{data?.title || 'Novo Item'}</span>
}
