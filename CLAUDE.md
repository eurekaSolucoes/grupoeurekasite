# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js 16, featuring a full-stack application with both admin panel and frontend website capabilities. The project uses Payload CMS 3.60.0 with MongoDB as the database adapter.

**Key Technologies:**
- Next.js 16 with App Router and Turbopack
- React 19.2.0
- Payload CMS 3.60.0
- MongoDB with Mongoose adapter
- TailwindCSS 4.1.15 with shadcn/ui
- TypeScript with strict mode
- pnpm package manager (required v9 or v10)
- Node.js ^18.20.2 || >=20.9.0

**Localization:** Default language is Portuguese (`pt`). Admin panel groupings and some labels use Portuguese (e.g., "Globais").

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production (includes sitemap generation)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues automatically

### Testing
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests with Vitest (jsdom environment)
- `pnpm test:e2e` - Run end-to-end tests with Playwright (auto-starts dev server)

### Payload-Specific Commands
- `pnpm payload` - Run Payload CLI
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm generate:importmap` - Generate import map for admin panel

### Database Management

**MongoDB**: This project uses MongoDB with Mongoose adapter. Schema changes are handled automatically by Mongoose - simply update your collections and restart the dev server. **No migrations needed!**

**When to regenerate types:**
- After adding/modifying collections
- After adding/modifying fields
- After changing global configs
- Run: `pnpm generate:types` then restart dev server

## Architecture

### Next.js App Router Structure

The project uses Next.js 16 App Router with route groups:
- `src/app/(frontend)` - Public-facing website routes
- `src/app/(payload)` - Payload admin panel and API routes

This separation allows both admin and frontend to coexist at the same domain.

**Key Next.js 16 Configurations:**
- Turbopack enabled by default
- Custom webpack config for extension aliasing (`.js` → `.ts`)
- Image optimization configured for Payload CMS:
  - Qualities: `[100, 75]` (100 added for Payload compatibility)
  - Local patterns for `/api/media/file/**`
  - `dangerouslyAllowLocalIP: true` in dev only (Next.js 16 security requirement)
- Server external packages: `drizzle-kit`, `esbuild`, `@esbuild/darwin-arm64`

### Payload CMS Configuration

Core config: `src/payload.config.ts`

**Collections** (main content types):
- **Pages**: Layout builder enabled, draft previews, live preview, SEO plugin integration, scheduled publishing
- **Posts**: Rich content with Lexical editor, categories, authors, related posts, embedded blocks
- **Projects**: Simple collection with single image, SEO integration, draft/scheduled publishing
- **Media**: Upload collection with 7 image sizes, focal point support, stored in `public/media/`
- **Categories**: Nested docs plugin enabled for hierarchical organization
- **Users**: Auth-enabled collection for admin access (simple: name + email)

**Globals** (site-wide settings):
- **Header**: Navigation items (max 6), auto-revalidation
- **Footer**: Footer configuration, auto-revalidation

### Layout Builder System

Pages use a flexible layout builder with blocks defined in `src/blocks/`:
- **CallToAction**: CTA sections with rich text + link groups
- **Content**: Rich text content block
- **MediaBlock**: Image/video display with captions (can be embedded in rich text)
- **ArchiveBlock**: Display collections of posts/pages with filtering
- **Form**: Form builder integration

Block configs are in `[BlockName]/config.ts` and React components in `[BlockName]/Component.tsx`.

**RenderBlocks component** (`src/blocks/RenderBlocks.tsx`) maps block types to React components.

### Hero System

Separate from blocks, heroes are configured in `src/heros/config.ts`:
- **4 impact levels**: `none`, `lowImpact`, `mediumImpact`, `highImpact`
- Rich text content with link groups (max 2 links)
- Media upload required for high/medium impact
- **RenderHero component** renders different variants

### Rich Text Editor

Uses Lexical editor (`@payloadcms/richtext-lexical`) configured in `src/fields/defaultLexical.ts`.

**Default features:**
- Paragraph, Bold, Italic, Underline, Link
- Links can reference internal pages/posts or external URLs

**Posts use enhanced Lexical:**
- H1-H4 headings
- Embedded blocks: Banner, Code, MediaBlock
- Fixed + Inline toolbars
- Horizontal rules

**Banner block**: Inline alert banners (success, warning, error, info)
**Code block**: Syntax-highlighted code with language selection

### Access Control

Defined in `src/access/`:
- `anyone`: Public access (returns `true`)
- `authenticated`: Only logged-in users can access
- `authenticatedOrPublished`: Public can read published content, users can access drafts

Applied at collection level in config to control CRUD operations.

### Plugins

Configured in `src/plugins/index.ts` (all grouped under "Globais" in admin panel):
- **SEO Plugin**: Meta tags, OpenGraph, custom `generateTitle` and `generateURL` functions
- **Search Plugin**: Full-text search on posts collection with custom field overrides (`src/search/fieldOverrides.ts`)
- **Redirects Plugin**: URL redirect management with Next.js revalidation
- **Nested Docs Plugin**: Hierarchical categories
- **Form Builder Plugin**: Dynamic form creation (payment disabled)
- **Payload Cloud Plugin**: Cloud hosting integration

### Hooks & Revalidation

Payload hooks trigger Next.js on-demand revalidation using `revalidatePath()` and `revalidateTag()`:

**Collection hooks:**
- `src/collections/Pages/hooks/revalidatePage.ts` - Revalidates pages on change (supports home page as `/`)
- `src/collections/Posts/hooks/revalidatePost.ts` - Revalidates posts on change
- `src/collections/Projects/hooks/revalidateProject.ts` - Revalidates projects on change
- `src/collections/Posts/hooks/populateAuthors.ts` - Safely populates author data (privacy protection)
- `src/hooks/revalidateRedirects.ts` - Rebuilds redirects

**Global hooks:**
- `src/Header/hooks/revalidateHeader.ts` - Revalidates on header changes
- `src/Footer/hooks/revalidateFooter.ts` - Revalidates on footer changes

**Important:** Image cache requires republishing the page if images are cropped/changed.

### Frontend Architecture

- **Components**: Reusable React components in `src/components/`
  - `RichText`: Serializes Lexical editor content to React
  - `Media`: Image/video rendering with Next.js Image optimization
  - `CollectionArchive`: Post/page listings with pagination
  - `AdminBar`: Edit links for authenticated users
  - `Card`: Reusable card component
  - `Link`: Smart link component (internal/external)
  - `Logo`: Custom Eureka logo component
  - `PayloadRedirects`: Handles redirects from CMS
  - `LivePreviewListener`: Enables live preview mode
  - `Pagination` / `PageRange`: Pagination UI
- **Providers**: React context providers in `src/providers/`
  - `HeaderTheme`: Dynamic header styling (active in main app)
  - `Theme`: Dark/light mode toggle (code exists but not used)
- **Utilities**: Helper functions in `src/utilities/`
  - `generatePreviewPath.ts`: Draft preview URL generation
  - `getURL.ts`: Server/client URL resolution
  - `generateMeta.ts`: SEO meta tag generation
  - `getDocument.ts`: Fetch Payload documents
  - `getGlobals.ts`: Fetch global data
  - `getMeUser.ts`: Get current user
  - `getRedirects.ts`: Fetch all redirects
  - `formatDateTime.ts` / `formatAuthors.ts`: Data formatting
  - `deepMerge.ts`: Object merging for field configs
  - `useClickableCard.ts`: Hook for card interactions

### Reusable Fields

**link field** (`src/fields/link.ts`):
- Internal reference or custom URL
- Optional "open in new tab"
- Optional label
- Appearance variants: `default`, `outline`

**linkGroup field** (`src/fields/linkGroup.ts`):
- Array of links
- Wraps `link` field

### Styling

- **TailwindCSS 4.1.15**: Configured in `tailwind.config.mjs`
  - Plugins: animate, typography
  - Custom theme with HSL color variables
  - Safelist for dynamic classes (grid spans, alert states)
- **shadcn/ui**: Component library with customizable UI components
- **Geist Font**: Typography via `geist` package (sans + mono)
- **Light mode only**: Dark mode has been removed from the project (ThemeProvider code exists but is not used in main app)

### Type Safety

TypeScript paths configured in `tsconfig.json`:
- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

Generated types: `src/payload-types.ts` (regenerated with `pnpm generate:types`)

**Target:** ES2022, strict mode enabled

### Custom Admin Components

Located in `src/components/`:
- **BeforeLogin** - Message on login screen
- **BeforeDashboard** - Dashboard customization
- **Icon** - Custom admin icon
- **Logo** - Custom admin logo
- **HeaderThemeSetter** - Programmatic header theme control

### Draft Preview & Live Preview

**Draft Preview:**
- Collections with `versions.drafts` enabled get preview functionality
- Preview URL format: `/next/preview?slug=...&collection=...&path=...&previewSecret=...`
- Frontend checks `draftMode()` and fetches draft versions
- Utility: `generatePreviewPath` in `src/utilities/`

**Live Preview:**
- Configured in `payload.config.ts` with breakpoints: mobile (375px), tablet (768px), desktop (1440px)
- Auto-saves drafts every 100ms for optimal preview
- `LivePreviewListener` component enables real-time preview
- Frontend routes handle `?draft=true` query param

### Scheduled Publishing

**Jobs queue configured:**
- Collections have `versions.schedulePublish: true`
- Access control: Requires authenticated user OR `CRON_SECRET` header
- **Vercel note:** Cron may be limited to daily runs depending on plan tier

### Search Implementation

**Search plugin on posts:**
- Custom field overrides: `src/search/fieldOverrides.ts`
- Search component: `src/search/Component.tsx`
- Frontend route: `app/(frontend)/search/`
- `beforeSync` hook customizes search data

### SEO & Sitemap

**SEO Plugin:**
- Meta title, description, image fields on Pages/Posts/Projects
- Auto-generates OpenGraph tags
- Preview field shows how content appears in search
- Custom `generateTitle` and `generateURL` functions

**Sitemap generation:**
- `next-sitemap` runs postbuild (configured in `next-sitemap.config.cjs`)
- Dynamic sitemaps: `/pages-sitemap.xml`, `/posts-sitemap.xml`
- Robots.txt generated with admin panel disallowed

### Deployment Considerations

**Caching**: Next.js caching is disabled by default (`export const dynamic = 'force-dynamic'`) because Payload Cloud uses Cloudflare caching. If self-hosting, remove `no-store` directives from `src/app/_api` fetches and `force-dynamic` exports from pages to enable Next.js caching.

**Jobs & Scheduled Publishing**: Uses Payload jobs queue for scheduled publish/unpublish. On Vercel, cron may be limited to daily runs depending on plan tier. Job access controlled via user auth or `CRON_SECRET` environment variable.

**Deployment options:**
- **Payload Cloud** (recommended): One-click deployment from GitHub
- **Vercel**: Supports Vercel DB (PostgreSQL) and Vercel Blob Storage adapters
- **Self-hosting**: Deploy to any Node.js hosting (VPS, DigitalOcean, Coolify, etc.)
- **Docker**: `docker-compose.yml` and `Dockerfile` included (auto-uses `.env` file)

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI` - MongoDB connection string (e.g., `mongodb://127.0.0.1/your-database-name` or `mongodb+srv://user:pass@cluster.mongodb.net/dbname`)
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL for link generation
- `CRON_SECRET` - Authenticates cron job requests
- `PREVIEW_SECRET` - Validates draft preview requests

## Key Patterns

**Adding a new collection**:
1. Create collection config in `src/collections/[Name]/index.ts`
2. Import and add to `collections` array in `src/payload.config.ts`
3. Run `pnpm generate:types` to update TypeScript types
4. Restart dev server - MongoDB will automatically create the collection

**Adding a new block**:
1. Create `src/blocks/[BlockName]/config.ts` (Payload schema)
2. Create `src/blocks/[BlockName]/Component.tsx` (React component)
3. Import and add block to layout builder in Page/Post collection configs
4. Update `src/blocks/RenderBlocks.tsx` to render the new component

**Adding a new global**:
1. Create `src/[GlobalName]/config.ts` (Payload schema)
2. Optionally create `src/[GlobalName]/Component.tsx` (React component)
3. Import and add to `globals` array in `src/payload.config.ts`
4. Add revalidation hook if needed (e.g., `src/[GlobalName]/hooks/revalidate[GlobalName].ts`)
5. Run `pnpm generate:types` to update TypeScript types
6. Restart dev server

**Creating previews**: Collections with `versions.drafts` enabled automatically get preview functionality via `generatePreviewPath` utility. Frontend routes handle `?draft=true` query param to fetch draft versions.

**Revalidation pattern**: Use `afterChange` hooks to call `revalidatePath()` or `revalidateTag()` for on-demand ISR when content changes.

**TypeScript imports**: Always use `@/` path alias for imports from `src/` directory.

## Database Seeding

The admin panel includes a "seed database" button that populates demo content. **WARNING**: Seeding is destructive and drops all existing data. Only use for new projects or development.

Demo credentials after seeding:
- Email: `demo-author@payloadcms.com`
- Password: `password`

Seed script location: `src/endpoints/seed/`

**Static home fallback**: If database is not seeded, project uses static home page from `src/endpoints/seed/home-static.ts`.

## Testing

**Integration tests (Vitest):**
- Config: `vitest.config.mts`
- Environment: jsdom
- Files: `tests/int/**/*.int.spec.ts`
- Example: `tests/int/api.int.spec.ts`

**E2E tests (Playwright):**
- Config: `playwright.config.ts`
- Browser: Chromium (Desktop Chrome)
- Files: `tests/e2e/**/*.e2e.spec.ts`
- Example: `tests/e2e/frontend.e2e.spec.ts`
- Auto-starts dev server on port 3000

## Performance Optimizations

**Image handling:**
- Sharp for image processing
- 7 responsive sizes: thumbnail, square, small, medium, large, xlarge, og (1200x630 for social)
- Focal point support for cropping
- Next.js Image component integration

**Next.js 16 features:**
- Turbopack bundler (faster builds)
- React 19.2 (latest)
- App Router with server components by default

## Common Development Workflow

**Typical development session:**
1. `pnpm dev` - Start dev server
2. Make changes to collections/components
3. `pnpm generate:types` - Update types (if schema changed)
4. Test changes in browser
5. `pnpm lint` - Check code quality
6. `pnpm test` - Run tests before commit
7. Commit changes

**When adding new content types:**
1. Create collection config
2. Add to `payload.config.ts`
3. Generate types
4. Create frontend route/component
5. Add revalidation hooks
6. Test draft preview
7. Test live preview
8. Test SEO plugin integration
