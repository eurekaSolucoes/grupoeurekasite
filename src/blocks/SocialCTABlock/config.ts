import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const SocialCTABlock: Block = {
  slug: 'socialCTABlock',
  interfaceName: 'SocialCTABlock',
  labels: {
    singular: 'CTA Social',
    plural: 'CTAs Sociais',
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: defaultLexical,
      label: 'Texto',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de Fundo',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo',
      defaultValue: 'social',
      options: [
        { label: 'Redes Sociais', value: 'social' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
      admin: {
        description: 'Redes Sociais exibe ícones do menu rodapé. WhatsApp exibe botão de contato.',
      },
    },
  ],
}
