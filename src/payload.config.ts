// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { pt } from '@payloadcms/translations/languages/pt'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Documents } from './collections/Documents'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { Navigation } from './Navigation/config'
import { Homepage } from './Homepage/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const autoLoginEmail = process.env.NEXT_AUTO_LOGIN_EMAIL
const autoLoginPassword = process.env.NEXT_AUTO_LOGIN_PASSWORD

const hasAutoLogin = !!autoLoginEmail && !!autoLoginPassword

const isDevelopment = process.env.NODE_ENV === 'development'

export default buildConfig({
  admin: {
    autoLogin:
      isDevelopment && hasAutoLogin
        ? {
            email: autoLoginEmail,
            password: autoLoginPassword,
            prefillOnly: true,
          }
        : false,

    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.

      beforeLogin: ['@/components/BeforeLogin'],
      graphics: {
        Icon: '@/components/Icon',
        Logo: '@/components/Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  email: nodemailerAdapter({
    defaultFromAddress: 'contato@grupoeureka.com.br',
    defaultFromName: 'Grupo Eureka',
    transportOptions: {
      host: process.env.NX_EMAIL_HOST,
      port: parseInt(process.env.NX_EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.NX_EMAIL_EUREKA,
        pass: process.env.NX_PASSWORD_EUREKA,
      },
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Projects, Media, Documents, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Navigation, Homepage],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
        documents: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
