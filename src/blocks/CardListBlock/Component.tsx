import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
// import { Media } from '@/components/Media'
// import type { Media as MediaType, Page, Post } from '@/payload-types'
import type { Page, Post } from '@/payload-types'
import Image from 'next/image'
import { HoverScaleCard } from '@/components/animate/HoverScaleCard'

interface CardLink {
  type?: 'custom' | 'reference' | null
  label?: string | null
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
}

interface Card {
  image: string // MediaType | string | number - usando string para dados mockados
  title?: string
  description?: string
  link?: CardLink
}

export interface CardListBlockProps {
  title?: string
  subtitle?: string
  items: Card[]
  columns?: 2 | 3
  className?: string
  subtitleAlign?: 'start' | 'end'
}

const columnClasses: Record<2 | 3, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
}

export function CardListBlock({
  title,
  subtitle,
  items,
  columns = 2,
  className,
  subtitleAlign = 'start',
}: Readonly<CardListBlockProps>) {
  const hasTitleOrSubtitle = title || subtitle

  return (
    <section className={cn('container', className)}>
      {/* Header */}
      {hasTitleOrSubtitle && (
        <header className="mb-6 lg:mb-8">
          {title && <h2 className="typography-subheading font-bold text-secondary">{title}</h2>}
          {subtitle && (
            <p
              className={cn('mt-2 lg:text-xl [&_strong]:font-bold [&_strong]:text-accent', {
                'lg:ml-55': subtitleAlign === 'end',
              })}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
        </header>
      )}

      {/* Cards Grid */}
      <ul className={cn('grid grid-cols-1 gap-5 lg:gap-6', columnClasses[columns])}>
        {items.map((card, index) => (
          <li key={index}>
            <CardItem card={card} />
          </li>
        ))}
      </ul>
    </section>
  )
}

interface CardItemProps {
  card: Card
}

function CardItem({ card }: Readonly<CardItemProps>) {
  const cardContent = (
    <>
      {/* Background Image */}
      {/* <Media
        resource={card.image}
        alt={card.title || card.description || ''}
        className="absolute inset-0 -z-20 overflow-hidden rounded-[20px] lg:rounded-[30px]"
        imgClassName="object-cover size-full"
      /> */}
      <Image
        src={card.image}
        alt={card.title || card.description || ''}
        fill
        className="absolute inset-0 -z-20 rounded-[20px] object-cover lg:rounded-[30px]"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10 rounded-[20px] bg-linear-to-t from-black/80 from-[26.75%] to-transparent to-[66.25%] lg:rounded-[30px]"
        aria-hidden="true"
      />

      {/* Text Content */}
      <div className="mt-auto flex flex-col gap-1">
        {card.title && (
          <h3 className="font-heading text-2xl leading-tight font-bold text-white lg:text-[2rem]">
            {card.title}
          </h3>
        )}
        {card.description && (
          <p className="text-base leading-snug text-white lg:text-lg">{card.description}</p>
        )}
      </div>
    </>
  )

  const cardClassName = cn(
    'relative z-10 flex h-70 flex-col overflow-hidden rounded-[20px] p-6 shadow-[0_12px_24px_0_rgba(0,0,0,0.24)] lg:rounded-[30px] lg:px-7.5 lg:py-8',
  )

  // If card has link, wrap in CMSLink and HoverScaleCard
  if (card.link?.type) {
    return (
      <HoverScaleCard className="lg:hover:scale-100">
        <CMSLink {...card.link} appearance="inline" className={cardClassName}>
          {cardContent}
        </CMSLink>
      </HoverScaleCard>
    )
  }

  return <article className={cardClassName}>{cardContent}</article>
}
