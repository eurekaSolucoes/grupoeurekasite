'use client'

import type { CardGridBlock as CardGridBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HoverScaleCard } from '@/components/animate/HoverScaleCard'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { FadeIn } from '@/components/animate/FadeIn'

type CardGridBlockProps = Omit<CardGridBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

type CardItem = CardGridBlockType['items'][number]

const columnClasses: Record<'2' | '3', string> = {
  '2': 'lg:grid-cols-2',
  '3': 'lg:grid-cols-3',
}

const orientationClasses: Record<'horizontal' | 'vertical', string> = {
  horizontal: 'aspect-[3/2]',
  vertical: 'aspect-[2/3]',
}

export function CardGridBlock({
  items,
  columns = '2',
  orientation = 'horizontal',
  className,
}: Readonly<CardGridBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className={cn('container', className)}
    >
      {/* Cards Grid */}
      <ul className={cn('grid grid-cols-1 gap-5 lg:gap-6', columnClasses[columns || '2'])}>
        {items.map((card, index) => (
          <FadeIn key={card.id || index} variant="fadeUp" delay={index * 0.08} viewportAmount={0.2}>
            <CardItemComponent card={card} orientation={orientation || 'horizontal'} />
          </FadeIn>
        ))}
      </ul>
    </HeaderThemeSetter>
  )
}

interface CardItemComponentProps {
  card: CardItem
  orientation: 'horizontal' | 'vertical'
}

function CardItemComponent({ card, orientation }: Readonly<CardItemComponentProps>) {
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
    'relative z-10 flex flex-col overflow-hidden rounded-[20px] p-6 shadow-[0_12px_24px_0_rgba(0,0,0,0.24)] lg:rounded-[30px] lg:px-7.5 lg:py-8',
    orientationClasses[orientation],
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
