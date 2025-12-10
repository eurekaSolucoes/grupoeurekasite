import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Vídeo',
    plural: 'Blocos de Vídeo',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de Fundo',
      required: true,
    },
    {
      name: 'headline',
      type: 'richText',
      editor: defaultLexical,
      label: 'Título',
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Texto do Botão',
      required: true,
      defaultValue: 'Assistir vídeo',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL do Vídeo',
      admin: {
        description: 'Link do YouTube, Vimeo ou vídeo externo',
      },
    },
  ],
}
