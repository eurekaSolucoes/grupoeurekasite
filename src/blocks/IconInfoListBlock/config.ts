import type { Block } from 'payload'

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
        {
          name: 'icon',
          type: 'text',
          label: 'Nome do Ícone (Lucide)',
          required: true,
          admin: {
            description: 'Nome do ícone Lucide (ex: map-pin, phone, mail). Ver: lucide.dev/icons',
          },
        },
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
