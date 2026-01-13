import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { link } from '@/fields/link'
import { revalidateNavigation } from './hooks/revalidateNavigation'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navegação',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'headerMenu',
      type: 'array',
      label: 'Menu Superior',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo de Item',
          options: [
            { label: 'Link Simples', value: 'link' },
            { label: 'Menu Dropdown', value: 'dropdown' },
          ],
          defaultValue: 'link',
          required: true,
          admin: {
            description: 'Escolha se este item é um link direto ou um menu dropdown com subitens',
          },
        },
        link({
          appearances: false,
          overrides: {
            name: 'link',
            label: 'Link',
            admin: {
              condition: (data, siblingData) => siblingData?.type === 'link',
              description: 'Destino do link (página interna ou URL customizada)',
            },
          },
        }),
        {
          name: 'label',
          type: 'text',
          label: 'Texto do Menu Dropdown',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'dropdown',
            description: 'Texto que aparecerá no botão do dropdown',
          },
        },
        {
          name: 'subitems',
          type: 'array',
          label: 'Subitens do Dropdown',
          minRows: 1,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'dropdown',
            initCollapsed: true,
            description: 'Itens que aparecerão no menu dropdown',
            components: {
              RowLabel: '@/Navigation/RowLabel#SubitemRowLabel',
            },
          },
          fields: [
            link({
              appearances: false,
              overrides: {
                name: 'link',
                label: 'Link',
                admin: {
                  description: 'Destino do subitem',
                },
              },
            }),
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem',
              admin: {
                description: 'Imagem opcional para o subitem (aparece no menu dropdown)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição',
              admin: {
                description: 'Descrição opcional do subitem',
                rows: 2,
              },
            },
          ],
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Navigation/RowLabel#HeaderMenuRowLabel',
        },
      },
    },
    {
      name: 'footerMenu',
      type: 'group',
      label: 'Menu Rodapé',
      fields: [
        {
          name: 'solutions',
          type: 'group',
          label: 'Soluções',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              defaultValue: 'Soluções',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                  },
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Navigation/RowLabel#FooterLinkRowLabel',
                },
              },
            },
          ],
        },
        {
          name: 'access',
          type: 'group',
          label: 'Acesse',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              defaultValue: 'Acesse',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                  },
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Navigation/RowLabel#FooterLinkRowLabel',
                },
              },
            },
          ],
        },
        {
          name: 'compliance',
          type: 'group',
          label: 'Compliance',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              defaultValue: 'Compliance',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                  },
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Navigation/RowLabel#FooterLinkRowLabel',
                },
              },
            },
          ],
        },
        {
          name: 'social',
          type: 'group',
          label: 'Socialize',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              defaultValue: 'Socialize',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Redes Sociais',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Rede Social',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Telegram', value: 'telegram' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                  admin: {
                    placeholder: 'https://...',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Texto Alternativo (opcional)',
                  admin: {
                    description: 'Texto alternativo para acessibilidade',
                  },
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Navigation/RowLabel#SocialLinkRowLabel',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'whatsappLink',
      type: 'text',
      label: 'Link do WhatsApp',
      admin: {
        description: 'Cole o link completo do WhatsApp (ex: https://wa.me/5511999999999)',
        placeholder: 'https://wa.me/...',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Endereço',
      admin: {
        description: 'Endereço completo. Pode usar múltiplas linhas.',
        rows: 3,
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefone',
      admin: {
        placeholder: '(11) 9999-9999',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateNavigation],
  },
  admin: {
    group: 'Globais',
  },
}
