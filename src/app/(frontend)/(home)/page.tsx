import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { BannerBlock } from '@/blocks/Home/BannerBlock/Component'
import { SolutionsBlock } from '@/blocks/Home/SolutionsBlock/Component'
import { AboutBlock } from '@/blocks/Home/AboutBlock/Component'
import { StoriesBlock } from '@/blocks/Home/StoriesBlock/Component'
import { AIBlock } from '@/blocks/Home/AIBlock/Component'
import { HeaderThemeReset } from '@/components/HeaderThemeReset'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const url = '/'

  const payload = await getPayload({ config: configPromise })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    draft,
  })

  return (
    <article>
      <HeaderThemeReset />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* TODO: Implement custom Homepage sections rendering */}
      {/* Homepage has custom structure: banner, solutions, about, stories */}
      {!!homepage.banners && <BannerBlock banners={homepage.banners} />}

      {!!homepage.solutions && <SolutionsBlock solutions={homepage.solutions} />}

      {!!homepage.about && <AboutBlock about={homepage.about} />}

      {!!homepage.stories && <StoriesBlock stories={homepage.stories} />}

      {homepage.showAISection && homepage.ai && <AIBlock ai={homepage.ai} />}
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    draft,
  })

  return generateMeta({ doc: homepage as any })
}
