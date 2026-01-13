import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const AlternatingBlock: Block = {
  slug: 'alternatingBlock',
  interfaceName: 'AlternatingBlock',
  labels: {
    singular: 'Bloco Alternado',
    plural: 'Blocos Alternados',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
      admin: {
        description: 'Texto menor acima do título (ex: "Por que")',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      admin: {
        description: 'Título principal em destaque (ex: "Eureka?")',
      },
    },
    {
      name: 'showArrow',
      type: 'checkbox',
      label: 'Mostrar Seta Decorativa',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Blocos',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'primaryText',
          type: 'richText',
          editor: defaultLexical,
          label: 'Texto Principal',
        },
        {
          name: 'secondaryText',
          type: 'richText',
          editor: defaultLexical,
          label: 'Texto Secundário',
        },
        {
          name: 'images',
          type: 'array',
          label: 'Imagens',
          maxRows: 2,
          admin: {
            description: 'Adicione até 2 imagens (a segunda ficará sobreposta)',
          },
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
      ],
    },
  ],
}
