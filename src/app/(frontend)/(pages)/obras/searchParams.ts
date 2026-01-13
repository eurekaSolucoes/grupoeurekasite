import { createSearchParamsCache, parseAsString, parseAsInteger, parseAsArrayOf } from 'nuqs/server'

// Parsers para os query params da página de obras
export const searchParamsParser = {
  query: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  schoolCycles: parseAsArrayOf(parseAsString).withDefault([]),
}

// URL keys para tradução (exportado para uso em outros componentes)
export const urlKeys = {
  query: 'busca',
  page: 'pagina',
  categories: 'categorias',
  schoolCycles: 'ciclos',
} as const

// Cache para uso server-side
export const searchParamsCache = createSearchParamsCache(searchParamsParser, {
  urlKeys,
})
