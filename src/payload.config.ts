// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { pt } from '@payloadcms/translations/languages/pt'
// import { en } from '@payloadcms/translations/languages/en'
import { en } from 'payload/i18n/en'
import { pt } from 'payload/i18n/pt'

import sharp from 'sharp' // sharp-import
import path from 'node:path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'node:url'

import { Documents } from './collections/Documents'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Navigation } from './Navigation/config'
import { Homepage } from './Homepage/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { serverEnv } from '@/lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const autoLoginEmail = serverEnv.NEXT_AUTO_LOGIN_EMAIL
const autoLoginPassword = serverEnv.NEXT_AUTO_LOGIN_PASSWORD

const hasAutoLogin = !!autoLoginEmail && !!autoLoginPassword

const isDevelopment = serverEnv.NODE_ENV === 'development'

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
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
        {
          rel: 'apple-touch-icon',
          url: '/apple-touch-icon.png',
        },
      ],
    },
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
    defaultFromAddress: serverEnv.NX_EMAIL_FROM || 'contato@grupoeureka.com.br',
    defaultFromName: 'Grupo Eureka',
    transportOptions: {
      host: serverEnv.NX_EMAIL_HOST,
      port: Number(serverEnv.NX_EMAIL_PORT),
      secure: false,
      auth: {
        user: serverEnv.NX_EMAIL_EUREKA,
        pass: serverEnv.NX_EMAIL_PASS,
      },
    },
  }),
  db: mongooseAdapter({
    url: serverEnv.DATABASE_URI,
  }),
  collections: [Pages, Media, Documents, Users],
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
      bucket: serverEnv.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: serverEnv.S3_ACCESS_KEY_ID || '',
          secretAccessKey: serverEnv.S3_SECRET_ACCESS_KEY || '',
        },
        region: serverEnv.S3_REGION,
        // Only use endpoint if explicitly set (for S3-compatible services like DigitalOcean Spaces)
        // AWS S3 uses region-based endpoints by default
        ...(serverEnv.S3_ENDPOINT ? { endpoint: serverEnv.S3_ENDPOINT } : {}),
      },
    }),
  ],
  secret: serverEnv.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { pt, en },
    fallbackLanguage: 'pt',
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
        return authHeader === `Bearer ${serverEnv.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
