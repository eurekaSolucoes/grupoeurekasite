# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js 15, featuring a full-stack application with both admin panel and frontend website capabilities. The project uses Payload CMS 3.60.0 with PostgreSQL as the database adapter.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues automatically

### Testing
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright

### Payload-Specific Commands
- `pnpm payload` - Run Payload CLI
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm generate:importmap` - Generate import map for admin panel
- `pnpm payload migrate:create` - Create a new database migration
- `pnpm payload migrate` - Run pending database migrations

### Database Migrations

**CRITICAL for Postgres**: When making schema changes (adding/modifying collections, fields), you must create and run migrations:

1. Make changes to Payload collections/fields
2. Create migration: `pnpm payload migrate:create`
3. Before deployment, run migrations: `pnpm payload migrate`

Note: In development, `push: true` is set by default, allowing schema changes without migrations. For production, set `push: false` to avoid data loss.

## Architecture

### Next.js App Router Structure

The project uses Next.js 15 App Router with route groups:
- `src/app/(frontend)` - Public-facing website routes
- `src/app/(payload)` - Payload admin panel and API routes

This separation allows both admin and frontend to coexist at the same domain.

### Payload CMS Configuration

Core config: `src/payload.config.ts`

**Collections** (main content types):
- **Pages**: Layout builder enabled, draft previews, SEO plugin integration
- **Posts**: Rich content with Lexical editor, categories, authors, related posts
- **Media**: Upload collection with image resizing and focal point support
- **Categories**: Nested docs plugin enabled for hierarchical organization
- **Users**: Auth-enabled collection for admin access

**Globals** (site-wide settings):
- **Header**: Navigation and header configuration
- **Footer**: Footer configuration

### Layout Builder System

Pages use a flexible layout builder with blocks defined in `src/blocks/`:
- **Hero**: Multiple impact levels (high/medium/low/none) with rich text and media
- **Content**: Rich text content block
- **MediaBlock**: Image/video display with captions
- **CallToAction**: CTA sections
- **Archive**: Display collections of posts/pages
- **FormBlock**: Form builder integration
- **Banner**: Inline banners
- **Code**: Syntax-highlighted code blocks

Block configs are in `[BlockName]/config.ts` and React components in `[BlockName]/Component.tsx`.

### Rich Text Editor

Uses Lexical editor (`@payloadcms/richtext-lexical`) configured in `src/fields/defaultLexical.ts`. Posts can embed blocks (Banner, Code, MediaBlock) within content.

### Access Control

Defined in `src/access/`:
- `authenticated`: Only logged-in users can access
- `authenticatedOrPublished`: Public can read published content, users can access drafts

### Plugins

Configured in `src/plugins/index.ts`:
- **SEO Plugin**: Meta tags, OpenGraph, title/description generation
- **Search Plugin**: Full-text search on posts collection
- **Redirects Plugin**: URL redirect management with Next.js revalidation
- **Nested Docs Plugin**: Hierarchical categories
- **Form Builder Plugin**: Dynamic form creation
- **Payload Cloud Plugin**: Cloud hosting integration

### Hooks & Revalidation

Payload hooks trigger Next.js on-demand revalidation:
- `src/collections/Pages/hooks/revalidatePage.ts` - Revalidates pages on change
- `src/collections/Posts/hooks/revalidatePost.ts` - Revalidates posts on change
- `src/hooks/revalidateRedirects.ts` - Rebuilds redirects

Note: Image cache requires republishing the page if images are cropped/changed.

### Frontend Architecture

- **Components**: Reusable React components in `src/components/`
  - `RichText`: Serializes Lexical editor content
  - `Media`: Image/video rendering with Next.js Image optimization
  - `CollectionArchive`: Post/page listings with pagination
  - `AdminBar`: Edit links for authenticated users
- **Providers**: React context providers in `src/providers/`
  - `Theme`: Dark/light mode toggle
  - `HeaderTheme`: Dynamic header styling
- **Utilities**: Helper functions in `src/utilities/`
  - `generatePreviewPath.ts`: Draft preview URL generation
  - `getURL.ts`: Server/client URL resolution
  - `generateMeta.ts`: SEO meta tag generation

### Styling

- **TailwindCSS**: Configured in `tailwind.config.mjs`
- **shadcn/ui**: Component library with customizable UI components
- **Geist Font**: Typography via `geist` package
- Dark mode support via CSS variables

### Type Safety

TypeScript paths configured in `tsconfig.json`:
- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

Generated types: `src/payload-types.ts` (regenerated with `pnpm generate:types`)

### Deployment Considerations

**Caching**: Next.js caching is disabled by default (`export const dynamic = 'force-dynamic'`) because Payload Cloud uses Cloudflare caching. If self-hosting, remove `no-store` directives and `force-dynamic` exports to enable Next.js caching.

**Jobs & Scheduled Publishing**: Uses Payload jobs queue for scheduled publish/unpublish. On Vercel, cron may be limited to daily runs depending on plan tier. Job access controlled via user auth or `CRON_SECRET` environment variable.

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL for link generation
- `CRON_SECRET` - Authenticates cron job requests
- `PREVIEW_SECRET` - Validates draft preview requests

## Key Patterns

**Adding a new collection**:
1. Create collection config in `src/collections/[Name]/index.ts`
2. Import and add to `collections` array in `src/payload.config.ts`
3. Run `pnpm generate:types` to update TypeScript types
4. Create migration: `pnpm payload migrate:create`

**Adding a new block**:
1. Create `src/blocks/[BlockName]/config.ts` (Payload schema)
2. Create `src/blocks/[BlockName]/Component.tsx` (React component)
3. Import and add block to layout builder in Page/Post collection configs
4. Update `RenderBlocks.tsx` to render the new component

**Creating previews**: Collections with `versions.drafts` enabled automatically get preview functionality via `generatePreviewPath` utility. Frontend routes handle `?draft=true` query param to fetch draft versions.

## Database Seeding

The admin panel includes a "seed database" button that populates demo content. **WARNING**: Seeding is destructive and drops all existing data. Only use for new projects or development.

Demo credentials after seeding:
- Email: `demo-author@payloadcms.com`
- Password: `password`
