import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const IntroBlock: Block = {
  slug: 'introBlock',
  interfaceName: 'IntroBlock',
  labels: {
    singular: 'Introdução',
    plural: 'Blocos de Introdução',
  },
  fields: [
    {
      name: 'headline',
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
      required: true,
    },
  ],
}
