import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
// Novos blocos
import { SpacerBlock } from '../../blocks/SpacerBlock/config'
import { AlternatingBlock } from '../../blocks/AlternatingBlock/config'
import { CardGridBlock } from '../../blocks/CardGridBlock/config'
import { IconInfoListBlock } from '../../blocks/IconInfoListBlock/config'
import { TextImageStackBlock } from '../../blocks/TextImageStackBlock/config'
import { ImageTextGridBlock } from '../../blocks/ImageTextGridBlock/config'
import { OverlappingImageBlock } from '../../blocks/OverlappingImageBlock/config'
import { StatsBlock } from '../../blocks/StatsBlock/config'
import { SocialCTABlock } from '../../blocks/SocialCTABlock/config'
import { NumberedCardsBlock } from '../../blocks/NumberedCardsBlock/config'
import { SplitContentBlock } from '../../blocks/SplitContentBlock/config'
import { AccordionListBlock } from '../../blocks/AccordionListBlock/config'
import { ImageBlock } from '../../blocks/ImageBlock/config'
import { VideoBlock } from '../../blocks/VideoBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                // Layout
                SpacerBlock,
                // Conteúdo
                Content,
                CardGridBlock,
                TextImageStackBlock,
                ImageTextGridBlock,
                AlternatingBlock,
                SplitContentBlock,
                AccordionListBlock,
                ImageBlock,
                // CTA
                CallToAction,
                StatsBlock,
                SocialCTABlock,
                // Mídia
                MediaBlock,
                VideoBlock,
                OverlappingImageBlock,
                // Informação
                IconInfoListBlock,
                NumberedCardsBlock,
                // Formulários
                FormBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Conteúdo',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
