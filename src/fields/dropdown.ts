import type { Field } from 'payload'
import { link } from './link'
import deepMerge from '@/utilities/deepMerge'

type DropdownType = (options?: { overrides?: Partial<Field> }) => Field

export const dropdown: DropdownType = ({ overrides = {} } = {}) => {
  const dropdownField: Field = {
    name: 'dropdown',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Texto do Menu Dropdown',
        required: true,
        admin: {
          description: 'Texto que aparecerá no botão do dropdown',
        },
      },
      {
        name: 'subitems',
        type: 'array',
        label: 'Subitens do Dropdown',
        minRows: 1,
        admin: {
          initCollapsed: true,
          description: 'Itens que aparecerão no menu dropdown',
          components: {
            RowLabel: '@/Navigation/RowLabel#SubitemRowLabel',
          },
        },
        fields: [
          link({
            appearances: false,
            overrides: {
              name: 'link',
              label: 'Link',
              admin: {
                description: 'Destino do subitem',
              },
            },
          }),
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Imagem',
            admin: {
              description: 'Imagem opcional para o subitem (aparece no menu dropdown)',
            },
          },
          {
            name: 'description',
            type: 'textarea',
            label: 'Descrição',
            admin: {
              description: 'Descrição opcional do subitem',
              rows: 2,
            },
          },
        ],
      },
    ],
  }

  return deepMerge(dropdownField, overrides)
}
