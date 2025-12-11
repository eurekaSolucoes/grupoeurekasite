import type { CardGridBlock as CardGridBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HoverScaleCard } from '@/components/animate/HoverScaleCard'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'

type CardGridBlockProps = Omit<CardGridBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

type CardItem = CardGridBlockType['items'][number]

const columnClasses: Record<'2' | '3', string> = {
  '2': 'lg:grid-cols-2',
  '3': 'lg:grid-cols-3',
}

export function CardGridBlock({
  title,
  subtitle,
  items,
  columns = '2',
  className,
  subtitleAlign = 'start',
}: Readonly<CardGridBlockProps>) {
  const hasTitleOrSubtitle = title || subtitle

  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className={cn('container', className)}
    >
      {/* Header */}
      {hasTitleOrSubtitle && (
        <header className="mb-6 lg:mb-8">
          {title && <h2 className="typography-subheading font-bold text-secondary">{title}</h2>}
          {subtitle && (
            <RichText
              data={subtitle}
              enableGutter={false}
              enableProse={false}
              className={cn('mt-2 lg:text-xl [&_strong]:font-bold [&_strong]:text-accent', {
                'lg:ml-55': subtitleAlign === 'end',
              })}
            />
          )}
        </header>
      )}

      {/* Cards Grid */}
      <ul className={cn('grid grid-cols-1 gap-5 lg:gap-6', columnClasses[columns || '2'])}>
        {items.map((card, index) => (
          <li key={card.id || index}>
            <CardItemComponent card={card} />
          </li>
        ))}
      </ul>
    </HeaderThemeSetter>
  )
}

interface CardItemComponentProps {
  card: CardItem
}

function CardItemComponent({ card }: Readonly<CardItemComponentProps>) {
  const cardContent = (
    <>
      {/* Background Image */}
      {card.image && (
        <Media
          resource={card.image}
          fill
          imgClassName="absolute inset-0 -z-20 rounded-[20px] object-cover lg:rounded-[30px]"
        />
      )}

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
