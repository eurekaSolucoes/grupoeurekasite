'use client'

import { useRowLabel } from '@payloadcms/ui'

interface BannerData {
  title?: string
}

interface CardData {
  title?: string
}

export const BannerRowLabel = () => {
  const { data, rowNumber = 0 } = useRowLabel<BannerData>()
  return data?.title || `Banner ${String(rowNumber + 1).padStart(2, '0')}`
}

export const SolutionCardRowLabel = () => {
  const { data, rowNumber = 0 } = useRowLabel<CardData>()
  return data?.title || `Card ${String(rowNumber + 1).padStart(2, '0')}`
}

export const StoryCardRowLabel = () => {
  const { data, rowNumber = 0 } = useRowLabel<CardData>()
  return data?.title || `História ${String(rowNumber + 1).padStart(2, '0')}`
}

interface MessageData {
  type?: string
  content?: {
    root?: {
      children?: Array<{
        children?: Array<{ text?: string; type?: string }>
      }>
    }
  }
}

export const AIMessageRowLabel = () => {
  const { data, rowNumber = 0 } = useRowLabel<MessageData>()

  // Extract first text node from Lexical state
  const firstParagraph = data?.content?.root?.children?.[0]
  const firstTextNode = firstParagraph?.children?.find((child) => child.text)
  const preview = firstTextNode?.text || ''

  const typeLabel = data?.type === 'ai' ? 'IA' : 'Usuário'
  const truncated = preview.slice(0, 40)
  const ellipsis = preview.length > 40 ? '...' : ''

  return `${typeLabel}: ${truncated}${ellipsis}` || `Mensagem ${String(rowNumber + 1).padStart(2, '0')}`
}
