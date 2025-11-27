import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStatic } from '@/endpoints/seed/home-static'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { BannerSection } from '@/components/Sections/Home/BannerSection'
import { SolutionsSection } from '@/components/Sections/Home/SolutionsSection'
import { AboutSection } from '@/components/Sections/Home/AboutSection'
import { StoriesSection } from '@/components/Sections/Home/StoriesSection'
import { AISection } from '@/components/Sections/Home/AISection'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const url = '/'

  const payload = await getPayload({ config: configPromise })

  let homepage = await payload.findGlobal({
    slug: 'homepage',
    draft,
  })

  // Remove this code once your website is seeded
  if (!homepage) {
    homepage = homeStatic as any
  }

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* TODO: Implement custom Homepage sections rendering */}
      {/* Homepage has custom structure: banner, solutions, about, stories */}
      {!!homepage.banners && (
        <HeaderThemeSetter logoMobile="icon-white" logoDesktop="full">
          <BannerSection banners={homepage.banners} />
        </HeaderThemeSetter>
      )}

      {!!homepage.solutions && (
        <HeaderThemeSetter theme="default" logoMobile="icon-white" logoDesktop="full">
          <SolutionsSection solutions={homepage.solutions} />
        </HeaderThemeSetter>
      )}

      {!!homepage.about && (
        <HeaderThemeSetter theme="secondary" logoMobile="icon-blue" logoDesktop="icon-blue">
          <AboutSection about={homepage.about} />
        </HeaderThemeSetter>
      )}

      {!!homepage.stories && (
        <HeaderThemeSetter
          theme="default"
          logoMobile="icon-full-white"
          logoDesktop="icon-full-white"
        >
          <StoriesSection stories={homepage.stories} />
        </HeaderThemeSetter>
      )}

      <HeaderThemeSetter logoMobile="icon-white" logoDesktop="icon-white">
        <AISection />
      </HeaderThemeSetter>
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
