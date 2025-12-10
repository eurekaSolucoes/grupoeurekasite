import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Estatísticas',
    plural: 'Blocos de Estatísticas',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Estatísticas',
      required: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefixo',
          admin: {
            description: 'Ex: +, R$, etc.',
          },
        },
        {
          name: 'stat',
          type: 'number',
          label: 'Número',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Sufixo',
          admin: {
            description: 'Ex: %, mil, anos, etc.',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Descrição',
          required: true,
        },
      ],
    },
  ],
}
