import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  interfaceName: 'ImageBlock',
  labels: {
    singular: 'Imagem',
    plural: 'Blocos de Imagem',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem',
      required: true,
    },
    {
      name: 'imageRounded',
      type: 'select',
      label: 'Arredondamento da Imagem',
      defaultValue: 'default',
      options: [
        { label: 'Padrão (40px)', value: 'default' },
        { label: 'Pequeno (20px)', value: 'small' },
        { label: 'Nenhum', value: 'none' },
      ],
      admin: {
        width: '50%',
      },
    },
  ],
}
