import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const OverlappingImageBlock: Block = {
  slug: 'overlappingImageBlock',
  interfaceName: 'OverlappingImageBlock',
  labels: {
    singular: 'Imagem Sobreposta',
    plural: 'Blocos de Imagem Sobreposta',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem',
      required: true,
      admin: {
        description: 'Imagem que ficará sobreposta no topo do bloco colorido',
      },
    },
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Título',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      label: 'Conteúdo',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Variante de Cor',
      defaultValue: 'primary',
      options: [
        { label: 'Primária (Azul Escuro)', value: 'primary' },
        { label: 'Secundária (Azul)', value: 'secondary' },
        { label: 'Destaque (Laranja)', value: 'accent' },
      ],
    },
  ],
}
