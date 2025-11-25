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
