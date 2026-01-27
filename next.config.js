import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // AWS S3 bucket for media storage
      {
        protocol: 'https',
        hostname: 'grupo-eureka-site.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'grupo-eureka-site.s3.us-east-1.amazonaws.com',
      },
      // External API product images (acesso.eurekadigital.app)
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'eurekadigital.s3.sa-east-1.amazonaws.com',
      },
      // Generic AWS S3 patterns (wildcard support)
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.*.amazonaws.com',
      },
    ],
    // Add quality 100 to support Payload CMS image optimization
    // Next.js 16 changed default from [1..100] to just [75]
    qualities: [100, 90, 75],
    // Allow local images with query strings (required for Payload CMS media)
    // Next.js 16 requires explicit permission for local images with query params
    localPatterns: [
      {
        pathname: '/api/media/file/**',
        // Permite qualquer query string (usado para cache busting com timestamp)
      },
      {
        pathname: '/assets/**',
      },
      {
        pathname: '/mock/**',
      },
    ],
    // Allow localhost IPs only in development with Payload CMS
    // Next.js 16 changed default from true to false for security
    // In production, images should be served from a proper domain
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
  },
  // Externalize server components packages for Payload CMS compatibility
  // Moved out of experimental in Next.js 16
  serverExternalPackages: ['drizzle-kit', 'esbuild', '@esbuild/darwin-arm64'],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  // Empty turbopack config to silence Next.js 16 warning
  // The webpack config is needed by Payload CMS and works fine under Turbopack
  turbopack: {},
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
