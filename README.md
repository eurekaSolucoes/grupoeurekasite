# Grupo Eureka - Site Institucional

Site institucional do Grupo Eureka construído com Next.js 16 e Payload CMS 3.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TailwindCSS 4, shadcn/ui
- **CMS**: Payload CMS 3.62.1 com Lexical Editor
- **Database**: MongoDB (Mongoose adapter)
- **Storage**: AWS S3 para mídia
- **Email**: Nodemailer para notificações de formulários
- **Animações**: Motion (Framer Motion)

## Quick Start

```bash
# 1. Instalar dependências
pnpm install

# 2. Copiar variáveis de ambiente
cp .env.example .env

# 3. Configurar .env com suas credenciais (MongoDB, S3, SMTP)

# 4. Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse http://localhost:3000 para o site e http://localhost:3000/admin para o painel.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build para produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Executar ESLint |
| `pnpm lint:fix` | Corrigir problemas de lint |
| `pnpm test` | Executar todos os testes |
| `pnpm test:int` | Testes de integração (Vitest) |
| `pnpm test:e2e` | Testes E2E (Playwright) |
| `pnpm generate:types` | Gerar tipos TypeScript do Payload |

## Estrutura do Projeto

```
src/
├── app/
│   ├── (frontend)/     # Rotas públicas do site
│   │   ├── (home)/     # Homepage
│   │   └── (pages)/    # Páginas dinâmicas, posts, obras
│   └── (payload)/      # Admin panel e API
├── blocks/             # Blocos do layout builder e seções customizadas
├── collections/        # Coleções do Payload (Pages, Posts, Media, etc.)
├── components/         # Componentes React reutilizáveis
├── fields/             # Campos reutilizáveis do Payload
├── services/           # Serviços de API externa (products)
├── Navigation/         # Global de navegação (header/footer)
└── Homepage/           # Global da homepage customizada
```

## Variáveis de Ambiente

Veja `.env.example` para a lista completa. Principais:

- `DATABASE_URI` - Connection string do MongoDB
- `PAYLOAD_SECRET` - Secret para JWT
- `NEXT_PUBLIC_SERVER_URL` - URL pública do site
- `S3_*` - Credenciais AWS S3 para mídia
- `NX_EMAIL_*` - Configuração SMTP para emails

## Documentação Detalhada

Para documentação completa sobre arquitetura, padrões de código, convenções e guias de desenvolvimento, consulte o arquivo **[CLAUDE.md](./CLAUDE.md)**.

## Integração Externa

O projeto consome a API da plataforma Eureka Digital para a página `/obras`. Veja a seção "API Externa - Eureka Digital" no CLAUDE.md para detalhes.
