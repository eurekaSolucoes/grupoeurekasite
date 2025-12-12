import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const SplitContentBlock: Block = {
  slug: 'splitContentBlock',
  interfaceName: 'SplitContentBlock',
  labels: {
    singular: 'Conteúdo Dividido',
    plural: 'Blocos de Conteúdo Dividido',
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
      name: 'headlineSize',
      type: 'select',
      label: 'Tamanho do Título',
      defaultValue: 'large',
      options: [
        { label: 'Grande (40px)', value: 'large' },
        { label: 'Médio (32px)', value: 'medium' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'headlineWidth',
      type: 'select',
      label: 'Largura do Título',
      defaultValue: 'narrow',
      options: [
        { label: 'Estreita (580px)', value: 'narrow' },
        { label: 'Ampla (2/3)', value: 'wide' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      label: 'Conteúdo',
      required: true,
    },
    {
      name: 'contentSize',
      type: 'select',
      label: 'Tamanho do Conteúdo',
      defaultValue: 'large',
      options: [
        { label: 'Grande (20px)', value: 'large' },
        { label: 'Médio (18px)', value: 'medium' },
      ],
      admin: {
        width: '50%',
      },
    },
  ],
}
