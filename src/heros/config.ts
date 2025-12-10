import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de Fundo',
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      admin: {
        initCollapsed: true,
        description: 'Navegação de trilha. Deixe href vazio para o item atual.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Deixe vazio para o item atual (último da trilha)',
          },
        },
      ],
    },
  ],
  label: false,
}
