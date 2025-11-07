import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStatic } from '@/endpoints/seed/home-static'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

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
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* TODO: Implement custom Homepage sections rendering */}
      {/* Homepage has custom structure: banner, solutions, about, stories */}
      <div>Homepage content goes here</div>
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

  return generateMeta({ doc: homepage })
}
