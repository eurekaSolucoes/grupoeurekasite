import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const ImageTextGridBlock: Block = {
  slug: 'imageTextGridBlock',
  interfaceName: 'ImageTextGridBlock',
  labels: {
    singular: 'Grid de Imagem e Texto',
    plural: 'Grids de Imagem e Texto',
  },
  fields: [
    {
      name: 'headingText',
      type: 'richText',
      editor: defaultLexical,
      label: 'Título',
    },
    {
      name: 'bodyText',
      type: 'richText',
      editor: defaultLexical,
      label: 'Texto do Corpo',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'images-right',
      options: [
        { label: 'Imagens à Esquerda', value: 'images-left' },
        { label: 'Imagens à Direita', value: 'images-right' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imagens',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagem',
          required: true,
        },
        {
          name: 'size',
          type: 'select',
          label: 'Tamanho',
          defaultValue: 'md',
          options: [
            { label: 'Pequeno', value: 'sm' },
            { label: 'Médio', value: 'md' },
            { label: 'Grande', value: 'lg' },
          ],
        },
      ],
    },
  ],
}
