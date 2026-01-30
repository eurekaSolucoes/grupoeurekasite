import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Grupo Eureka` : 'Grupo Eureka'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      labels: {
        singular: 'Redirecionamento',
        plural: 'Redirecionamentos',
      },
      admin: {
        group: 'Globais',
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              label: 'De (URL origem)',
              admin: {
                description: 'Você precisará refazer o deploy do site ao alterar este campo.',
              },
            }
          }
          if ('name' in field && field.name === 'to') {
            return {
              ...field,
              // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
              fields: field.fields?.map((subField) => {
                if ('name' in subField && subField.name === 'type') {
                  return {
                    ...subField,
                    label: 'Tipo de redirecionamento',
                    // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
                    options: subField.options?.map((opt) => {
                      if (opt.value === 'reference') {
                        return { ...opt, label: 'Link interno' }
                      }
                      if (opt.value === 'custom') {
                        return { ...opt, label: 'URL personalizada' }
                      }
                      return opt
                    }),
                  }
                }
                if ('name' in subField && subField.name === 'reference') {
                  return {
                    ...subField,
                    label: 'Documento para redirecionar',
                  }
                }
                if ('name' in subField && subField.name === 'url') {
                  return {
                    ...subField,
                    label: 'URL personalizada',
                  }
                }
                return subField
              }),
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      labels: {
        singular: 'Formulário',
        plural: 'Formulários',
      },
      admin: {
        group: 'Globais',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: 'Submissão de formulário',
        plural: 'Submissões de formulário',
      },
      admin: {
        group: 'Globais',
      },
    },
  }),
  mcpPlugin({
    collections: {
      pages: { enabled: true },
      media: { enabled: true },
      documents: { enabled: true },
    },
  }),
  payloadCloudPlugin(),
]
