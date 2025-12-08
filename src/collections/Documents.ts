import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento',
    plural: 'Documentos',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'updatedAt'],
    group: 'Conteúdo',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      admin: {
        description: 'Nome descritivo do documento',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição opcional do documento',
        rows: 2,
      },
    },
  ],
  upload: {
    mimeTypes: ['application/pdf'],
  },
}
