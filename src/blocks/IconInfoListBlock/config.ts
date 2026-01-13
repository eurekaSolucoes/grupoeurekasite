import type { Block } from 'payload'

import { iconPickerField } from '@/fields/iconPicker'

export const IconInfoListBlock: Block = {
  slug: 'iconInfoListBlock',
  interfaceName: 'IconInfoListBlock',
  labels: {
    singular: 'Lista de Informações com Ícones',
    plural: 'Listas de Informações com Ícones',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      admin: {
        description: 'Título opcional exibido acima da lista',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Itens',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        iconPickerField({
          name: 'icon',
          label: 'Ícone',
          required: true,
        }),
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'value',
          type: 'textarea',
          label: 'Valor',
          required: true,
          admin: {
            description: 'Texto do valor. Suporta múltiplas linhas.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link (opcional)',
          admin: {
            description: 'URL para tornar o valor clicável',
          },
        },
      ],
    },
  ],
}
