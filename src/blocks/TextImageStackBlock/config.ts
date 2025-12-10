import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const TextImageStackBlock: Block = {
  slug: 'textImageStackBlock',
  interfaceName: 'TextImageStackBlock',
  labels: {
    singular: 'Texto com Imagens Empilhadas',
    plural: 'Blocos de Texto com Imagens Empilhadas',
  },
  fields: [
    {
      name: 'headingText',
      type: 'richText',
      editor: defaultLexical,
      label: 'Título',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem Principal',
    },
    {
      name: 'bodyText',
      type: 'richText',
      editor: defaultLexical,
      label: 'Texto do Corpo',
    },
    {
      name: 'overlappingImages',
      type: 'array',
      label: 'Imagens Sobrepostas',
      maxRows: 2,
      admin: {
        description: 'Adicione 2 imagens para o efeito de sobreposição',
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
      ],
    },
  ],
}
