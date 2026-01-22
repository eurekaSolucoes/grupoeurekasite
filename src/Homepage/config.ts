import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banners',
          fields: [
            {
              name: 'banners',
              type: 'array',
              label: 'Banners',
              fields: [
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  required: true,
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem de Fundo',
                  required: true,
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem em Destaque',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Homepage/RowLabel#BannerRowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Soluções',
          fields: [
            {
              name: 'solutions',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Cards',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título',
                      required: true,
                    },
                    link({
                      appearances: false,
                      disableLabel: true,
                      overrides: {
                        name: 'link',
                        label: 'Link',
                      },
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Homepage/RowLabel#SolutionCardRowLabel',
                    },
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição',
                },
                {
                  name: 'animatedPhrase',
                  type: 'text',
                  label: 'Frase Animada',
                },
              ],
            },
          ],
        },
        {
          label: 'Sobre',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                {
                  name: 'mainText',
                  type: 'richText',
                  editor: defaultLexical,
                  label: 'Texto Principal',
                  required: true,
                },
                {
                  name: 'secondaryText',
                  type: 'richText',
                  editor: defaultLexical,
                  label: 'Texto Secundário',
                },
                {
                  name: 'rightImages',
                  type: 'array',
                  label: 'Imagens Direita',
                  maxRows: 2,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'leftImages',
                  type: 'array',
                  label: 'Imagens Esquerda',
                  maxRows: 2,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                  ],
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'animatedPhrase',
                  type: 'text',
                  label: 'Frase Animada',
                },
              ],
            },
          ],
        },
        {
          label: 'Histórias',
          fields: [
            {
              name: 'stories',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtítulo',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição',
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Cards',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Imagem',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Descrição',
                      required: true,
                    },
                    link({
                      appearances: false,
                      disableLabel: true,
                      overrides: {
                        name: 'link',
                        label: 'Link',
                      },
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Homepage/RowLabel#StoryCardRowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Assistente de IA',
          fields: [
            {
              name: 'showAISection',
              type: 'checkbox',
              label: 'Exibir Seção de IA',
              defaultValue: true,
              admin: {
                description:
                  'Desmarque para ocultar completamente a seção de IA na página inicial.',
              },
            },
            {
              name: 'ai',
              type: 'group',
              fields: [
                {
                  name: 'messages',
                  type: 'array',
                  label: 'Mensagens do Chat',
                  minRows: 1,
                  fields: [
                    {
                      name: 'type',
                      type: 'radio',
                      options: [
                        { label: 'IA (Maria de Fátima)', value: 'ai' },
                        { label: 'Usuário', value: 'user' },
                      ],
                      defaultValue: 'ai',
                      required: true,
                      admin: {
                        layout: 'horizontal',
                      },
                    },
                    {
                      name: 'content',
                      type: 'richText',
                      editor: defaultLexical,
                      label: 'Conteúdo da Mensagem',
                      required: true,
                      admin: {
                        description:
                          'Você pode adicionar links para páginas, URLs personalizadas ou documentos (PDFs).',
                      },
                    },
                  ],
                  defaultValue: [
                    {
                      type: 'ai',
                      content: {
                        root: {
                          type: 'root',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                { type: 'text', text: 'Olá, professor!' },
                                { type: 'linebreak' },
                                { type: 'text', text: 'Eu sou a ' },
                                { type: 'text', text: 'Mária de Fátima', format: 'bold' },
                                { type: 'text', text: ', a inteligência artificial do ' },
                                { type: 'text', text: 'Grupo Eureka', format: 'bold' },
                                { type: 'text', text: '. Como posso colaborar?' },
                              ],
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          version: 1,
                        },
                      },
                    },
                    {
                      type: 'user',
                      content: {
                        root: {
                          type: 'root',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  text: 'Oi Maria! Eu sou o Luis, professor de Ensino Médio em uma escola de Goiana, Pernambuco. Pode me ajudar a montar um plano de aula sobre como explorar elementos básicos do texto literário e estimular o prazer da leitura?',
                                },
                              ],
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          version: 1,
                        },
                      },
                    },
                    {
                      type: 'ai',
                      content: {
                        root: {
                          type: 'root',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                { type: 'text', text: 'Olá, professor Luis. Claro!' },
                                { type: 'linebreak' },
                                { type: 'text', text: 'Segue um ' },
                                {
                                  type: 'link',
                                  fields: {
                                    linkType: 'custom',
                                    url: '#',
                                  },
                                  children: [{ type: 'text', text: 'plano de aula' }],
                                },
                                {
                                  type: 'text',
                                  text: ' que acabei de construir! O que achou? Estou aqui para colaborar com você!',
                                },
                              ],
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          version: 1,
                        },
                      },
                    },
                    {
                      type: 'user',
                      content: {
                        root: {
                          type: 'root',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                { type: 'text', text: 'Maria isso já me ajuda muito, obrigado!' },
                              ],
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          version: 1,
                        },
                      },
                    },
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Homepage/RowLabel#AIMessageRowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              label: 'Configurações de SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título SEO',
                  admin: {
                    description: 'Título que aparece nos resultados de busca e redes sociais. Recomendado: 50-60 caracteres.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição SEO',
                  admin: {
                    description: 'Descrição que aparece nos resultados de busca. Recomendado: 150-160 caracteres.',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagem OG (Open Graph)',
                  admin: {
                    description: 'Imagem que aparece ao compartilhar nas redes sociais. Tamanho recomendado: 1200x630 pixels.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  admin: {
    group: 'Globais',
  },
}
