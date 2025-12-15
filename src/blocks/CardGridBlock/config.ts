import type { Block } from 'payload'

import { link } from '@/fields/link'

export const CardGridBlock: Block = {
  slug: 'cardGridBlock',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Grid de Cards',
    plural: 'Grids de Cards',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      label: 'Colunas',
      defaultValue: '2',
      options: [
        { label: '2 Colunas', value: '2' },
        { label: '3 Colunas', value: '3' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagem de Fundo',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descrição',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              description: 'Link ao clicar no card',
            },
          },
        }),
      ],
    },
  ],
}
