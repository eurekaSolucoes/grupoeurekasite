import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { iconPickerField } from '@/fields/iconPicker'

export const AccordionListBlock: Block = {
  slug: 'accordionListBlock',
  interfaceName: 'AccordionListBlock',
  labels: {
    singular: 'Lista Accordion',
    plural: 'Blocos de Lista Accordion',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Itens',
      required: true,
      minRows: 1,
      fields: [
        iconPickerField({
          name: 'iconName',
          label: 'Ícone',
          required: true,
        }),
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Conteúdo',
          admin: {
            description: 'Conteúdo exibido quando o item é expandido',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/AccordionListBlock/RowLabel#AccordionItemRowLabel',
        },
      },
    },
  ],
}
