import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // Database
    DATABASE_URI: z.string().min(1, 'DATABASE_URI is required'),

    // Payload
    PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
    CRON_SECRET: z.string().optional(),
    PREVIEW_SECRET: z.string().optional(),

    // Vercel
    VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),

    // Auto Login (development only)
    NEXT_AUTO_LOGIN_EMAIL: z.string().email().optional(),
    NEXT_AUTO_LOGIN_PASSWORD: z.string().optional(),

    // AWS S3
    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_SECRET_ACCESS_KEY: z.string().optional(),
    S3_BUCKET: z.string().optional(),
    S3_REGION: z.string().default('us-east-1'),
    S3_ENDPOINT: z.string().optional(),

    // Email (SMTP)
    NX_EMAIL_HOST: z.string().optional(),
    NX_EMAIL_PORT: z.string().default('587'),
    NX_EMAIL_EUREKA: z.string().optional(),
    NX_EMAIL_PASS: z.string().optional(),
    NX_EMAIL_FROM: z.string().email().optional(),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {},
})
