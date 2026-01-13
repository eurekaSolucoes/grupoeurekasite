import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const NumberedCardsBlock: Block = {
  slug: 'numberedCardsBlock',
  interfaceName: 'NumberedCardsBlock',
  labels: {
    singular: 'Cards Numerados',
    plural: 'Blocos de Cards Numerados',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Título',
    },
    {
      name: 'subtitle',
      type: 'richText',
      editor: defaultLexical,
      label: 'Subtítulo/Descrição',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 2,
      maxRows: 9,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'number',
          type: 'number',
          label: 'Número',
          required: true,
          min: 1,
          max: 9,
          admin: {
            description: 'Número exibido no card (1-9)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título (opcional)',
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          label: 'Descrição',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagem',
          required: true,
        },
      ],
    },
  ],
}
