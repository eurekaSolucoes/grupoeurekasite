import React from 'react'

import type { Page } from '@/payload-types'
import { PageBannerBlock } from '@/blocks/PageBannerBlock/Component'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { title, backgroundImage, breadcrumbs } = props || {}

  if (!title) return null

  return <PageBannerBlock title={title} backgroundImage={backgroundImage} breadcrumbs={breadcrumbs} />
}
