'use client'

import type { ArrayFieldRowLabel } from 'payload'

export const BannerRowLabel: ArrayFieldRowLabel = ({ data, index }) => {
  return data?.title || `Banner ${String(index + 1).padStart(2, '0')}`
}

export const SolutionCardRowLabel: ArrayFieldRowLabel = ({ data, index }) => {
  return data?.title || `Card ${String(index).padStart(2, '0')}`
}

export const StoryCardRowLabel: ArrayFieldRowLabel = ({ data, index }) => {
  return data?.title || `História ${String(index).padStart(2, '0')}`
}
