'use client'

import type { NumberedCardsBlock as NumberedCardsBlockType } from '@/payload-types'

import { FirstConnector, MiddleConnector, LastConnector, DesktopConnector } from './connectors'
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FadeIn } from '@/components/animate/FadeIn'

type NumberedCardsBlockProps = Omit<NumberedCardsBlockType, 'id' | 'blockName' | 'blockType'>

type NumberedCard = NumberedCardsBlockType['cards'][number]

export function NumberedCardsBlock({
  title,
  subtitle,
  cards,
}: Readonly<NumberedCardsBlockProps>) {
  // Validação: mínimo 2 cards, máximo 9
  if (cards.length < 2 || cards.length > 9) {
    console.warn('NumberedCardsBlock: cards deve ter entre 2 e 9 itens')
  }

  return (
    <HeaderThemeSetter
      downThreshold={0.2}
      as="section"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container overflow-hidden"
    >
      {/* Título opcional */}
      {title && (
        <FadeIn variant="fadeUp" viewportAmount={0.4}>
          <RichText
            data={title}
            enableGutter={false}
            enableProse={false}
            className="mb-4 typography-subheading text-secondary lg:max-w-200 [&_strong]:text-accent"
          />
        </FadeIn>
      )}

      {/* Container principal: descrição + lista de cards + SVG */}
      <div className="relative">
        {/* Descrição/Subtítulo obrigatório */}
        {subtitle && (
          <FadeIn variant="fadeUp" delay={0.1} viewportAmount={0.4}>
            <RichText
              data={subtitle}
              enableGutter={false}
              enableProse={false}
              className="mb-8 flex max-w-80 flex-col justify-center typography-body-large text-foreground lg:mr-10 lg:ml-[20%] lg:h-40 lg:max-w-[715px] [&_strong]:font-bold [&_strong]:text-accent"
            />
          </FadeIn>
        )}

        <ol className="relative z-10 flex flex-col lg:gap-32">
          {cards.map((card, index) => (
            <NumberedCardItem key={card.number} card={card} index={index} />
          ))}
        </ol>

        {/* Conector Desktop - visível apenas em lg+ */}
        <DesktopConnector className="pointer-events-none absolute top-9 right-1/8 hidden lg:block xl:right-1/5" />
      </div>
      <SpacerBlock size="lg" />
      <div aria-hidden="true" />
    </HeaderThemeSetter>
  )
}

/** Componente do card individual */
function NumberedCardItem({ card, index }: { card: NumberedCard; index: number }) {
  const isEven = index % 2 === 1

  return (
    <li className="group/card relative mt-15 pt-22 pr-6 first:pt-19 lg:mt-0 lg:flex lg:items-center lg:gap-10 lg:pt-0 lg:pr-0 lg:first:pt-0 odd:lg:flex-row even:lg:flex-row-reverse">
      {/* Número grande - Mobile: absoluto; Desktop: absoluto atrás do texto */}
      <FadeIn variant="fade" viewportAmount={0.2}>
        <span
          className="pointer-events-none absolute top-0 left-0 bg-linear-to-b from-secondary to-secondary/20 bg-clip-text font-heading text-[180px] leading-34 font-bold text-transparent opacity-55 select-none lg:top-1/2 lg:-translate-y-1/2 lg:text-[450px] lg:leading-none lg:opacity-10 group-odd/card:lg:left-0 group-even/card:lg:right-0 group-even/card:lg:left-auto"
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          {card.number}
        </span>
      </FadeIn>

      {/* Conteúdo: título + descrição */}
      <FadeIn
        variant="fadeUp"
        viewportAmount={0.3}
        className="relative z-10 flex flex-1 flex-col gap-3 lg:gap-4 xl:px-[90px]"
      >
        {card.title && (
          <h3 className="w-full font-heading text-2xl leading-tight font-bold text-secondary lg:text-[2rem]">
            {card.title}
          </h3>
        )}
        {card.description && (
          <RichText
            data={card.description}
            enableGutter={false}
            enableProse={false}
            className="typography-body text-foreground xl:text-balance [&_strong]:font-bold [&_strong]:text-accent"
          />
        )}
      </FadeIn>

      {/* Imagem */}
      {card.image && (
        <FadeIn
          variant={isEven ? 'fadeRight' : 'fadeLeft'}
          delay={0.1}
          viewportAmount={0.2}
          className="relative z-10 mt-4 h-45 w-full shrink-0 overflow-hidden rounded-[30px] shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)] lg:mt-0 lg:h-[350px] lg:w-[628px] lg:rounded-[40px]"
        >
          <Media
            resource={card.image}
            fill
            size="(max-width: 1024px) 100vw, 628px"
            imgClassName="object-cover"
          />
        </FadeIn>
      )}

      {/* Conectores Mobile - visíveis apenas em mobile, ocultos em lg+ */}
      <FirstConnector className="absolute -top-19 right-0 z-0 hidden h-[calc(100%+40px)] group-first/card:block lg:hidden!" />
      <MiddleConnector className="absolute -top-42 right-0 z-0 block h-[calc(100%+96px)] group-first/card:hidden group-last/card:hidden lg:hidden!" />
      <LastConnector className="absolute -top-31 right-0 z-0 hidden h-[calc(100%+224px)] group-last/card:block lg:hidden!" />
    </li>
  )
}
