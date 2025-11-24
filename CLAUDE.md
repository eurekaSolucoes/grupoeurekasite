# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js 16, featuring a full-stack application with both admin panel and frontend website capabilities. The project uses Payload CMS 3.62.1 with MongoDB (Mongoose adapter) as the database.

**Language**: The project is configured with Portuguese (pt) as the default language. Admin labels use "Globais" for globals grouping.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm dev:prod` - Clean build and test production mode locally
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

### Database Management

**MongoDB**: This project uses MongoDB Atlas with Mongoose adapter. Schema changes are handled automatically by Mongoose - simply update your collections and restart the dev server. No migrations needed!

## Architecture

### Directory Structure

Key directories in `src/`:
- `app/` - Next.js App Router with (frontend) and (payload) route groups
- `blocks/` - Payload layout builder blocks (Content, Hero, MediaBlock, etc.)
- `collections/` - Payload collections (Pages, Posts, Projects, Media, Categories, Users)
- `components/` - Reusable React components (RichText, Media, CollectionArchive, etc.)
- `providers/` - React context providers (Theme, HeaderTheme)
- `utilities/` - Helper functions (generatePreviewPath, getURL, generateMeta)
- `access/` - Access control policies (authenticated, authenticatedOrPublished)
- `fields/` - Reusable Payload field configurations (defaultLexical)
- `heros/` - Hero block configurations
- `hooks/` - Payload hooks (revalidation, etc.)
- `plugins/` - Plugin configurations
- `Navigation/` & `Homepage/` - Global configurations
- `search/` - Search functionality (field overrides, beforeSync)

### Next.js App Router Structure

The project uses Next.js 16 App Router with route groups:
- `src/app/(frontend)` - Public-facing website routes
  - `/[slug]` - Dynamic page routes
  - `/posts` - Blog posts listing and individual post pages
  - `/search` - Search functionality
  - `/page.tsx` - Homepage (renders a Page with slug='home' from Pages collection)
- `src/app/(payload)` - Payload admin panel and API routes
  - `/admin` - Payload CMS admin panel
  - `/api` - Payload API endpoints

This separation allows both admin and frontend to coexist at the same domain.

### Payload CMS Configuration

Core config: `src/payload.config.ts`

**Collections** (main content types):
- **Pages**: Layout builder enabled, draft previews, SEO plugin integration
- **Posts**: Rich content with Lexical editor, categories, authors, related posts
- **Projects**: Portfolio/project showcase with image upload and SEO support
- **Media**: Upload collection with image resizing and focal point support
- **Categories**: Nested docs plugin enabled for hierarchical organization
- **Users**: Auth-enabled collection for admin access

**Globals** (site-wide settings):
- **Navigation**: Menu superior, menu rodapé (3 seções), WhatsApp link, endereço e telefone
- **Homepage**: Homepage customizada com 4 seções específicas (Banner, Soluções, Sobre, Histórias)

### Layout Builder System

Pages use a flexible layout builder with blocks defined in `src/blocks/`:
- **Hero**: Multiple impact levels (high/medium/low/none) with rich text and media (configured in `src/heros/config.ts`)
- **Content**: Rich text content block
- **MediaBlock**: Image/video display with captions
- **CallToAction**: CTA sections
- **Archive**: Display collections of posts/pages
- **FormBlock**: Form builder integration
- **Banner**: Inline banners (can be embedded in Lexical editor)
- **Code**: Syntax-highlighted code blocks with client-side copy button
- **RelatedPosts**: Display related posts (typically used in post detail pages)

Block configs are in `[BlockName]/config.ts` and React components in `[BlockName]/Component.tsx`.

### Rich Text Editor

Uses Lexical editor (`@payloadcms/richtext-lexical`) configured in `src/fields/defaultLexical.ts`. Posts can embed blocks (Banner, Code, MediaBlock) within content.

### Access Control

Defined in `src/access/`:
- `authenticated`: Only logged-in users can access
- `authenticatedOrPublished`: Public can read published content, users can access drafts

### Reusable Fields

Custom field configurations in `src/fields/`:
- **`link`** (`@/fields/link`): Reusable link field supporting internal page/post references or custom URLs with optional appearance styles
- **`linkGroup`**: Array of links with optional group configuration
- **`dropdown`**: Dropdown field configuration for selects
- **`defaultLexical`**: Base Lexical editor configuration with common features (bold, italic, underline, links to pages/posts)

### Plugins

Configured in `src/plugins/index.ts`:
- **SEO Plugin**: Meta tags, OpenGraph, title/description generation
- **Search Plugin**: Full-text search on posts collection
- **Redirects Plugin**: URL redirect management for pages, posts, and projects with Next.js revalidation
- **Nested Docs Plugin**: Hierarchical categories with URL generation
- **Form Builder Plugin**: Dynamic form creation with Lexical editor for confirmation messages
- **Payload Cloud Plugin**: Cloud hosting integration

### Hooks & Revalidation

Payload hooks trigger Next.js on-demand revalidation:
- `src/collections/Pages/hooks/revalidatePage.ts` - Revalidates pages on change/delete
- `src/collections/Posts/hooks/revalidatePost.ts` - Revalidates posts on change/delete
- `src/collections/Projects/hooks/revalidateProject.ts` - Revalidates projects on change/delete
- `src/hooks/revalidateRedirects.ts` - Rebuilds redirects on change

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
- Light mode only (dark mode has been removed from the project)

### Type Safety

TypeScript paths configured in `tsconfig.json`:
- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

Generated types: `src/payload-types.ts` (regenerated with `pnpm generate:types`)

### Next.js 16 Configuration

The project has been updated for Next.js 16 compatibility. Key changes in `next.config.js`:

- **Image optimization**:
  - Quality settings explicitly set to `[100, 75]` (Next.js 16 changed default from `[1..100]` to just `[75]`)
  - Local patterns allow `/api/media/file/**` with query strings for Payload CMS media
  - `dangerouslyAllowLocalIP` enabled for development only (default changed to false in Next.js 16)
- **Server externals**: Moved from `experimental.serverExternalPackages` to `serverExternalPackages` (no longer experimental)
- **Webpack config**: Custom extension aliases needed for Payload CMS compatibility (`.js` → `.ts/.tsx`, etc.)
- **Turbopack**: Empty config to silence warning while using webpack (Payload CMS requires webpack)

### Deployment Considerations

**Caching**: Next.js caching is disabled by default (`export const dynamic = 'force-dynamic'`) because Payload Cloud uses Cloudflare caching. If self-hosting, remove `no-store` directives and `force-dynamic` exports to enable Next.js caching.

**Jobs & Scheduled Publishing**: Uses Payload jobs queue for scheduled publish/unpublish. On Vercel, cron may be limited to daily runs depending on plan tier. Job access controlled via user auth or `CRON_SECRET` environment variable.

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI` - MongoDB connection string (e.g., `mongodb://127.0.0.1/your-database-name` or `mongodb+srv://user:pass@cluster.mongodb.net/dbname`)
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL for link generation
- `CRON_SECRET` - Authenticates cron job requests
- `PREVIEW_SECRET` - Validates draft preview requests
- `S3_ACCESS_KEY_ID` - AWS S3 access key for media storage
- `S3_SECRET_ACCESS_KEY` - AWS S3 secret key
- `S3_BUCKET` - S3 bucket name for media uploads
- `S3_REGION` - AWS region (default: us-east-1)
- `S3_ENDPOINT` - S3 endpoint URL

**Media Storage**: This project uses AWS S3 for media storage via `@payloadcms/storage-s3`. All media uploads are stored in S3, not locally. Ensure S3 credentials are configured before uploading media.

## Key Patterns

**Configuring the homepage**:
The homepage is a **Global** (not a collection) located in **Globais → Homepage** in the admin panel. **IMPORTANT**: The homepage does NOT use the layout builder. It uses custom React components for each section.

**Homepage structure** (4 customized sections):
1. **Banners**: Array de banners (Subtítulo, Título, Link, Imagem de Fundo, Imagem em Destaque)
2. **Soluções**: Título, Subtítulo, Cards (array com imagem, título e link opcional), Descrição, Frase Animada
3. **Sobre**: Texto Principal, Texto Secundário, Imagens Direita (2), Imagens Esquerda (2), Link, Frase Animada
4. **Histórias**: Título, Subtítulo, Descrição, Link, Cards (array com imagem, título e descrição)

All fields use the existing `link` field from `@/fields/link` for consistent link handling (internal pages/posts or custom URLs).

**Rendering homepage sections**:
- Homepage sections are rendered in `src/app/(frontend)/page.tsx`
- Each section has a custom React component in `src/components/Sections/Home/`
- Currently implemented: `BannerSection.tsx`, `SolutionsSection.tsx`
- To add a new section: create component in `src/components/Sections/Home/`, import in `page.tsx`, and render conditionally

**Configuring navigation (Header & Footer)**:
The navigation is a **Global** (not a collection) located in **Globais → Navegação** in the admin panel.

**Navigation structure**:
1. **Menu Superior**: Array de links/dropdowns para o menu header
   - Each item can be either:
     - **Link Simples**: Direct link using the standard `link` field
     - **Menu Dropdown**: Dropdown menu with label and subitems (each subitem has link, optional image, and optional description)
2. **Menu Rodapé** (3 grupos):
   - **Soluções**: Título + array de links
   - **Acesse**: Título + array de links
   - **Socialize**: Título + array de links com ícone (facebook, instagram, linkedin, twitter, youtube, tiktok, whatsapp, telegram)
3. **Link do WhatsApp**: Campo texto para URL completa do WhatsApp
4. **Endereço**: Campo textarea para endereço completo (múltiplas linhas)
5. **Telefone**: Campo texto para número de telefone

All menu links use the existing `link` field from `@/fields/link` for consistent handling. Social media links use a custom structure with icon selector + URL.

**Adding a new collection**:
1. Create collection config in `src/collections/[Name]/index.ts`
2. Import and add to `collections` array in `src/payload.config.ts`
3. Run `pnpm generate:types` to update TypeScript types
4. Restart dev server - MongoDB will automatically create the collection

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
