import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacerBlock',
  interfaceName: 'SpacerBlock',
  labels: {
    singular: 'Espaçador',
    plural: 'Espaçadores',
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      label: 'Tamanho',
      defaultValue: 'md',
      options: [
        { label: 'Extra Pequeno (10/20px)', value: 'xs' },
        { label: 'Pequeno (20/40px)', value: 'sm' },
        { label: 'Médio (40/80px)', value: 'md' },
        { label: 'Grande (60/120px)', value: 'lg' },
      ],
      required: true,
    },
  ],
}
