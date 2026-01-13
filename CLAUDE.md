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

## API Externa - Eureka Digital

A página de obras (`/obras`) consome dados de uma API externa da plataforma Eureka Digital.

### Base URL

```
https://acesso.eurekadigital.app
```

### Endpoints

#### 1. Listar Produtos

```
GET /api/products
```

**Query Parameters:**

| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-----------|
| `query` | string | `''` | Busca por título (case-insensitive) |
| `offset` | number | `1` | Número da página (1-based) |
| `limit` | number | `12` | Itens por página |
| `categories` | string | - | IDs de categorias separados por vírgula |
| `schoolCycles` | string | - | IDs de ciclos escolares separados por vírgula |

**Resposta:**

```json
{
  "list": [...],
  "totalCount": 45,
  "totalPages": 4,
  "currentPage": 1,
  "limit": 12
}
```

#### 2. Opções de Filtro

```
GET /api/products/options
```

Retorna categorias, ciclos escolares e produtos disponíveis para filtros.

**Resposta:**

```json
{
  "categories": [
    { "_id": "...", "label": "Matemática", "name": "matematica" }
  ],
  "schoolCycles": [
    { "_id": "...", "label": "Ensino Fundamental", "name": "ensino-fundamental" }
  ],
  "products": [...]
}
```

### Tipos de Produto

Os tipos de produto são gerenciados pelo sistema de configuração em `src/services/products/config.ts`.

**IDs Reais da API:**

| Tipo | ID | Label | Características |
|------|-----|-------|-----------------|
| **Livro** | `643558e19900697552678b44` | Livro | Produto individual |
| **Coleção** | `64355a169900697552678b45` | Coleção | Possui array `products` com volumes |
| **Projeto** | `6493a0497ea1f7753234d078` | Projeto | Projetos especiais |

**Uso no código:**

```tsx
import { getProductTypeConfig, isCollection, isBook, isProject } from '@/services/products'

// Obter configuração completa (badge label, classes CSS)
const typeConfig = getProductTypeConfig(product)
const badgeLabel = typeConfig.getBadgeLabel(product)
const badgeColor = typeConfig.badgeClassName

// Ou usar helpers para verificação específica
if (isCollection(product)) { ... }
if (isBook(product)) { ... }
if (isProject(product)) { ... }
```

**Adicionando novo tipo de produto:**

1. Adicionar ID em `PRODUCT_TYPE_IDS` em `src/services/products/config.ts`
2. Adicionar configuração em `configById` com: `key`, `getBadgeLabel`, `badgeClassName`
3. Opcional: adicionar fallback por regex em `configByLabelPattern`

```tsx
// Exemplo: adicionando tipo "Kit"
export const PRODUCT_TYPE_IDS = {
  ...
  KIT: 'novo-id-aqui',
} as const

[PRODUCT_TYPE_IDS.KIT]: {
  key: 'kit',
  getBadgeLabel: (p) => `Kit • ${p.products?.length || 0} itens`,
  badgeClassName: 'bg-warning text-warning-foreground',
},
```

### Campos do Produto

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `_id` | string | ID único |
| `title` | string | Título do produto |
| `coverURL` | string | URL da imagem de capa |
| `mockupURL` | string | URL da imagem de mockup (preferencial) |
| `schoolCycles` | array | Ciclos escolares associados |
| `categories` | array | Categorias do produto |
| `productType` | object | `{ _id, label }` - Tipo do produto |
| `products` | array | Produtos relacionados (para coleções) |

### Implementação Local

Os componentes que consomem esta API estão em:
- `src/services/products/` - Service completo (requisições, tipos, config)
- `src/components/Obras/` - Componentes de UI (ProductCard, ProductList, etc.)
- `src/app/(frontend)/(pages)/obras/` - Página e layout

### Autenticação

Ambos endpoints são **públicos** e não requerem autenticação.

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

## Git Workflow and Commit Guidelines

### Conventional Commits

**ALWAYS** follow Conventional Commits specification for all commits. This ensures clear, semantic commit history.

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature or functionality
- `fix`: Bug fix
- `refactor`: Code refactoring without changing functionality
- `style`: Formatting, styling changes (CSS, whitespace, etc)
- `perf`: Performance improvements
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, build config

**Scope** (optional): Component, file, or feature area (e.g., `header`, `solutions`, `api`)

**Examples**:
```bash
feat(homepage): add animated banner section
fix(navigation): resolve dropdown menu positioning
refactor(media): simplify image upload logic
style(solutions): adjust card typography and spacing
docs: update environment variables in CLAUDE.md
```

### Commit Best Practices

1. **Modular commits**: One logical change per commit
   - Group related changes (e.g., all changes for one feature)
   - Separate unrelated changes into different commits
   - Makes code review and rollback easier

2. **Complete functionality**: Commit when a feature/fix is complete and working
   - Don't commit broken code
   - Ensure changes don't break existing functionality
   - Test before committing

3. **Clear descriptions**: Write descriptive commit messages
   - First line: concise summary (50-72 chars)
   - Body (optional): detailed explanation with bullet points
   - Include "why" not just "what"

4. **Use HEREDOC for multi-line messages**:
   ```bash
   git commit -m "$(cat <<'EOF'
   feat(solutions): add scroll-based animations

   - Implement scroll direction detection
   - Add conditional header animation
   - Add animated decorative circles
   EOF
   )"
   ```

5. **Do NOT include attribution or co-author** in commits:
   - Never add `Co-Authored-By: Claude` or similar
   - Never add `🤖 Generated with Claude Code` or similar footers

### Example Workflow

```bash
# 1. Check status and review changes
git status
git diff

# 2. Stage related changes
git add src/components/Feature.tsx

# 3. Commit with conventional format
git commit -m "feat(feature): add new feature description"

# 4. Repeat for each logical change
git add src/styles/feature.css
git commit -m "style(feature): add feature styling"
```
## Convenção de Nomenclatura: Blocks (Frontend)

**Regra**: Todos os componentes de seção/bloco seguem o padrão `[Nome]Block` e ficam em `src/blocks/`.

### Estrutura de Diretórios

```
src/blocks/
├── Home/                          # Blocos específicos da homepage
│   ├── BannerBlock/Component.tsx
│   ├── SolutionsBlock/Component.tsx
│   ├── AboutBlock/Component.tsx
│   ├── StoriesBlock/Component.tsx
│   └── AIBlock/Component.tsx
├── About/                         # Blocos específicos da página Sobre
│   ├── IntroBlock/Component.tsx
│   └── VideoBlock/Component.tsx
├── Contact/                       # Blocos específicos da página Contato
│   ├── ContactFormBlock/Component.tsx
│   └── PressContactBlock/Component.tsx
├── SpacerBlock/Component.tsx      # Blocos compartilhados (raiz)
├── PageBannerBlock/Component.tsx
├── AlternatingBlock/Component.tsx
├── CardGridBlock/Component.tsx
├── IconInfoListBlock/Component.tsx
├── TextImageStackBlock/Component.tsx
├── ImageTextGridBlock/Component.tsx
├── OverlappingImageBlock/Component.tsx
├── StatsBlock/Component.tsx
├── SocialCTABlock/Component.tsx
├── NumberedCardsBlock/
│   ├── Component.tsx
│   └── connectors/
└── [blocos do Payload CMS...]     # ArchiveBlock, Banner, CallToAction, etc.
```

### Padrão de Nomenclatura
- **Diretório**: `[Nome]Block/`
- **Componente**: `Component.tsx`
- **Export**: `export function [Nome]Block`
- **Props**: `interface [Nome]BlockProps`

### Tipos de Blocos

1. **Blocos específicos de página** (`blocks/Home/`, `blocks/About/`, `blocks/Contact/`)
   - Usados apenas em uma página específica
   - Não são registrados no layout builder

2. **Blocos compartilhados** (`blocks/` raiz)
   - Reutilizáveis entre múltiplas páginas
   - Podem ser registrados no layout builder futuramente

3. **Blocos do Payload CMS** (`blocks/Content/`, `blocks/Form/`, etc.)
   - Já registrados no layout builder
   - Possuem `config.ts` com schema Payload

### Criando um Novo Block

1. Identifique o escopo (página específica ou compartilhado)
2. Crie o diretório em `src/blocks/[Página]/[Nome]Block/` ou `src/blocks/[Nome]Block/`
3. Crie `Component.tsx` com export nomeado
4. Importe e use na página correspondente

### Exemplo - PageBannerBlock (Compartilhado)

```tsx
import { PageBannerBlock } from '@/blocks/PageBannerBlock/Component'

<PageBannerBlock
  title="Título da Página"
  backgroundImage="/path/to/image.jpg"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Página Atual' }
  ]}
/>
```

### Exemplo - AlternatingBlock (Compartilhado)

```tsx
import { AlternatingBlock } from '@/blocks/AlternatingBlock/Component'

<AlternatingBlock
  title="Eureka?"
  subtitle="Por que"
  showArrow={true}
  items={[
    {
      primaryText: 'Texto principal com <strong>destaque</strong>',
      secondaryText: 'Texto secundário opcional',
      images: [
        { src: '/mock/image-1.png', alt: 'Descrição' },
        { src: '/mock/image-2.png', alt: 'Descrição' }
      ]
    }
  ]}
/>
```

### Exemplo - BannerBlock (Home)

```tsx
import { BannerBlock } from '@/blocks/Home/BannerBlock/Component'

<BannerBlock banners={homepage.banners} />
```

## Convenção de Services

Serviços externos e APIs são organizados por domínio em `src/services/`.

### Estrutura de Tipos

**Tipos globais** (`src/types/`):
- `api.d.ts` - Interfaces genéricas de API (PaginatedResponse, PaginationParams)

**Tipos por domínio** (`src/services/[dominio]/types/`):
- `entities.d.ts` - Entidades específicas do domínio
- `index.ts` - Barrel exports

### Estrutura de Service

```
src/services/
└── [dominio]/
    ├── index.ts                  # Barrel exports públicos
    ├── types/
    │   ├── index.ts              # Re-exports de types do domínio
    │   └── entities.d.ts         # Entidades do domínio
    ├── get[Recurso].ts           # Requisição GET (params + response dentro)
    ├── create[Recurso].ts        # Requisição POST (params + response dentro)
    └── config.ts                 # Configurações do domínio (opcional)
```

### Convenções de Tipos

1. **Interfaces genéricas** (`src/types/api.d.ts`): Padrões reutilizáveis entre domínios
2. **Entidades** (`types/entities.d.ts`): Estruturas de dados específicas do domínio
3. **Params/Response**: Definidos dentro do próprio arquivo da requisição
   - Extendem interfaces genéricas de `@/types/api` quando aplicável
   - Usam entidades de `./types` para tipagem de dados

### Criando um Novo Service

1. Criar pasta em `src/services/[nome-dominio]/`
2. Criar `types/entities.d.ts` com entidades do domínio
3. Criar `types/index.ts` com barrel exports
4. Criar `get[Recurso].ts` para cada requisição GET
5. Criar `index.ts` com barrel exports públicos
6. (Opcional) Criar `config.ts` para constantes/helpers

### Exemplo de Import

```ts
// De fora do service
import { getProducts, Product, GetProductsParams } from '@/services/products'

// Dentro do service (getProducts.ts)
import type { Product } from './types'
import type { PaginatedResponse, PaginationParams } from '@/types/api'
```

### Service Existente: Products

```
src/services/products/
├── index.ts              # Barrel exports
├── types/
│   ├── index.ts
│   └── entities.d.ts     # Product, Category, SchoolCycle, ProductType
├── getProducts.ts        # Busca produtos com filtros
├── getFilterOptions.ts   # Busca opções de filtro
└── config.ts             # Configuração de tipos de produto (badges, helpers)
```

**Uso:**

```tsx
import {
  getProducts,
  getFilterOptions,
  getProductTypeConfig,
  isCollection,
  type Product,
  type GetProductsParams
} from '@/services/products'

// Buscar produtos
const { list, totalPages } = await getProducts({ page: 1, limit: 12 })

// Buscar opções de filtro
const { categories, schoolCycles } = await getFilterOptions()

// Verificar tipo de produto
const typeConfig = getProductTypeConfig(product)
```