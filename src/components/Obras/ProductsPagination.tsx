import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { searchParamsCache, urlKeys } from '@/app/(frontend)/(pages)/obras/searchParams'

type PageItem = number | 'ellipsis'

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

const FIRST_PAGE = 1
const ELLIPSIS: PageItem = 'ellipsis'

function buildPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 4,
): PageItem[] {
  const maxVisiblePages = siblingCount * 2 + 5

  if (totalPages <= maxVisiblePages) {
    return range(1, totalPages)
  }

  const leftSibling = Math.max(currentPage - siblingCount, FIRST_PAGE)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const hasLeftEllipsis = leftSibling > 2
  const hasRightEllipsis = rightSibling < totalPages - 1

  if (!hasLeftEllipsis) {
    const leftCount = 3 + siblingCount * 2
    return [...range(1, leftCount), ELLIPSIS, totalPages]
  }

  if (!hasRightEllipsis) {
    const rightCount = 3 + siblingCount * 2
    const rightStart = totalPages - rightCount + 1
    return [FIRST_PAGE, ELLIPSIS, ...range(rightStart, totalPages)]
  }

  return [FIRST_PAGE, ELLIPSIS, ...range(leftSibling, rightSibling), ELLIPSIS, totalPages]
}

interface ProductsPaginationProps {
  totalPages: number
  pathname?: string
  siblingCount?: number
}

export function ProductsPagination({
  totalPages,
  pathname = '/obras',
  siblingCount = 1,
}: Readonly<ProductsPaginationProps>) {
  const currentPage = searchParamsCache.get('page')
  const allParams = searchParamsCache.all()

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  const createPageQuery = (page: number) => {
    const { query, categories, schoolCycles } = allParams
    return {
      ...(page > FIRST_PAGE && { [urlKeys.page]: page }),
      ...(query && { [urlKeys.query]: query }),
      ...(categories.length > 0 && { [urlKeys.categories]: categories }),
      ...(schoolCycles.length > 0 && { [urlKeys.schoolCycles]: schoolCycles }),
    }
  }

  const pageNumbers = buildPageNumbers(currentPage, totalPages, siblingCount)

  return (
    <Pagination>
      <PaginationContent className="gap-0">
        <PaginationItem>
          <PaginationPrevious
            href={{ pathname, query: createPageQuery(currentPage - 1) }}
            disabled={!hasPrev}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={page === ELLIPSIS ? `ellipsis-${index}` : page}>
            {page === ELLIPSIS ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={{ pathname, query: createPageQuery(Number(page)) }}
                isActive={page === currentPage}
                aria-label={`Página ${page}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={{ pathname, query: createPageQuery(currentPage + 1) }}
            disabled={!hasNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
