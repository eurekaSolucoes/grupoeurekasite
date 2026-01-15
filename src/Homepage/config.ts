import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banners',
          fields: [
            {
              name: 'banners',
              type: 'array',
              label: 'Banners',
              fields: [
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  required: true,
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem de Fundo',
                  required: true,
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem em Destaque',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Homepage/RowLabel#BannerRowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Soluções',
          fields: [
            {
              name: 'solutions',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Cards',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título',
                      required: true,
                    },
                    link({
                      appearances: false,
                      disableLabel: true,
                      overrides: {
                        name: 'link',
                        label: 'Link',
                      },
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Homepage/RowLabel#SolutionCardRowLabel',
                    },
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição',
                },
                {
                  name: 'animatedPhrase',
                  type: 'text',
                  label: 'Frase Animada',
                },
              ],
            },
          ],
        },
        {
          label: 'Sobre',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                {
                  name: 'mainText',
                  type: 'richText',
                  editor: defaultLexical,
                  label: 'Texto Principal',
                  required: true,
                },
                {
                  name: 'secondaryText',
                  type: 'richText',
                  editor: defaultLexical,
                  label: 'Texto Secundário',
                },
                {
                  name: 'rightImages',
                  type: 'array',
                  label: 'Imagens Direita',
                  maxRows: 2,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'leftImages',
                  type: 'array',
                  label: 'Imagens Esquerda',
                  maxRows: 2,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                  ],
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'animatedPhrase',
                  type: 'text',
                  label: 'Frase Animada',
                },
              ],
            },
          ],
        },
        {
          label: 'Histórias',
          fields: [
            {
              name: 'stories',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição',
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Cards',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Descrição',
                      required: true,
                    },
                    link({
                      appearances: false,
                      disableLabel: true,
                      overrides: {
                        name: 'link',
                        label: 'Link',
                      },
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Homepage/RowLabel#StoryCardRowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              label: 'Configurações de SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título SEO',
                  admin: {
                    description: 'Título que aparece nos resultados de busca e redes sociais. Recomendado: 50-60 caracteres.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição SEO',
                  admin: {
                    description: 'Descrição que aparece nos resultados de busca. Recomendado: 150-160 caracteres.',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem OG (Open Graph)',
                  admin: {
                    description: 'Imagem que aparece ao compartilhar nas redes sociais. Tamanho recomendado: 1200x630 pixels.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  admin: {
    group: 'Globais',
  },
}
