import Image from 'next/image'

import { FirstConnector, MiddleConnector, LastConnector, DesktopConnector } from './connectors'
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

export interface NumberedCard {
  /** Número do card (1-9) */
  number: number
  /** Título do card (opcional) */
  title?: string
  /** Descrição do card - suporta HTML (<strong>) */
  description: string
  /** Imagem do card */
  image: {
    src: string
    alt: string
  }
}

export interface NumberedCardsBlockProps {
  /** Título da seção (opcional) - renderizado FORA do container */
  title?: string
  /** Subtítulo/descrição da seção (obrigatório) - suporta HTML (<strong>) */
  subtitle: string
  /** Lista de cards numerados (mínimo 2, máximo 9) */
  cards: NumberedCard[]
}

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
        <h2
          className="mb-4 typography-subheading text-secondary lg:max-w-200 [&_strong]:text-accent"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {/* Container principal: descrição + lista de cards + SVG */}
      <div className="relative">
        {/* Descrição/Subtítulo obrigatório */}
        <p
          className="mb-8 flex max-w-80 flex-col justify-center typography-body-large text-foreground lg:mr-10 lg:ml-[20%] lg:h-40 lg:max-w-[715px] [&_strong]:font-bold [&_strong]:text-accent"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />

        <ol className="relative z-10 flex flex-col lg:gap-32">
          {cards.map((card) => (
            <NumberedCardItem key={card.number} card={card} />
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
function NumberedCardItem({ card }: { card: NumberedCard }) {
  return (
    <li className="group/card relative z-10 mt-15 pt-22 pr-6 first:pt-19 lg:mt-0 lg:flex lg:items-center lg:gap-10 lg:pt-0 lg:pr-0 lg:first:pt-0 odd:lg:flex-row even:lg:flex-row-reverse">
      {/* Número grande - Mobile: absoluto; Desktop: absoluto atrás do texto */}
      <span
        className="pointer-events-none absolute top-0 left-0 bg-linear-to-b from-secondary to-secondary/20 bg-clip-text font-heading text-[180px] leading-34 font-bold text-transparent opacity-55 select-none lg:top-1/2 lg:-translate-y-1/2 lg:text-[450px] lg:leading-none lg:opacity-10 group-odd/card:lg:left-0 group-even/card:lg:right-0 group-even/card:lg:left-auto"
        style={{ WebkitTextFillColor: 'transparent' }}
      >
        {card.number}
      </span>

      {/* Conteúdo: título + descrição */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 lg:gap-4 xl:px-[90px]">
        {card.title && (
          <h3 className="w-full font-heading text-2xl leading-tight font-bold text-secondary lg:text-[2rem]">
            {card.title}
          </h3>
        )}
        <p
          className="typography-body text-foreground xl:text-balance [&_strong]:font-bold [&_strong]:text-accent"
          dangerouslySetInnerHTML={{ __html: card.description }}
        />
      </div>

      {/* Imagem */}
      <div className="relative mt-4 h-45 w-full shrink-0 overflow-hidden rounded-[30px] shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)] lg:mt-0 lg:h-[350px] lg:w-[628px] lg:rounded-[40px]">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 628px"
          className="object-cover"
        />
      </div>

      {/* Conectores Mobile - visíveis apenas em mobile, ocultos em lg+ */}
      <FirstConnector className="absolute -top-19 right-0 z-0 hidden h-[calc(100%+40px)] group-first/card:block lg:hidden!" />
      <MiddleConnector className="absolute -top-42 right-0 z-0 block h-[calc(100%+96px)] group-first/card:hidden group-last/card:hidden lg:hidden!" />
      <LastConnector className="absolute -top-31 right-0 z-0 hidden h-[calc(100%+224px)] group-last/card:block lg:hidden!" />
    </li>
  )
}
