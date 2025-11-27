'use client'

import type { Homepage } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HoverScaleCard } from '@/components/animate/HoverScaleCard'
import {
  ScrollAnimatedWrapper,
  useScrollAnimation,
} from '@/components/animate/ScrollAnimatedWrapper'
import Image from 'next/image'
import { motion, useSpring, useTransform } from 'motion/react'

interface StoriesSectionProps {
  stories: Homepage['stories']
}

export function StoriesSection({ stories }: Readonly<StoriesSectionProps>) {
  const scrollAnimation = useScrollAnimation({ scrollRange: [0, 0.4] })
  const { scrollYProgress } = scrollAnimation

  const rawHeaderX = useTransform(scrollYProgress, [0, 0.4], [-100, 0])
  const headerX = useSpring(rawHeaderX, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const rawCardsX = useTransform(scrollYProgress, [0, 0.4], [100, 0])
  const cardsX = useSpring(rawCardsX, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  if (!stories) return null

  return (
    <ScrollAnimatedWrapper
      scrollAnimation={scrollAnimation}
      background="bg-white"
      innerClassName="bg-accent"
    >
      <section className="relative container space-y-7 py-16 lg:flex lg:gap-20 lg:space-y-0 lg:pt-60 lg:pb-35">
        {/* Header */}
        <motion.header
          style={{ x: headerX }}
          className="mx-auto sm:max-w-90 lg:sticky lg:top-28 lg:z-50 lg:mx-0 lg:h-fit"
        >
          <div className="relative mx-6 flex flex-col pb-2.5 lg:mr-0 lg:pb-3">
            {stories.title && (
              <h2 className="max-w-45 typography-display font-bold text-accent-foreground lg:max-w-none">
                {stories.title}
              </h2>
            )}
            <Image
              src="/assets/stories-section-mobile-arrow.svg"
              alt=""
              width={84}
              height={79}
              className="absolute right-2 bottom-2 lg:right-0 lg:bottom-0 lg:z-30 lg:translate-x-[calc(100%-0.5rem)] lg:translate-y-full lg:-scale-x-100 lg:-rotate-90"
            />
            {stories.subtitle && (
              <p className="ml-auto pr-13 font-heading text-[2rem]/none text-secondary lg:pr-0 lg:typography-heading">
                {stories.subtitle}
              </p>
            )}
          </div>
          {stories.description && (
            <p className="typography-body-large text-balance text-accent-foreground">
              {stories.description}
            </p>
          )}
          {/* CTA Button */}
          {stories.link?.label && (
            <CMSLink
              {...stories.link}
              appearance="secondary"
              hasIcon
              className="hidden self-start lg:mt-7 lg:inline-flex"
            />
          )}
        </motion.header>

        {/* Cards */}
        {stories.cards && stories.cards.length > 0 && (
          <motion.ul style={{ x: cardsX }} className="flex flex-col gap-5 lg:flex-1">
            {stories.cards.map((card) => (
              <li key={card.id ?? card.title}>
                <HoverScaleCard arrowClassName="bg-secondary lg:size-13">
                  <StoryCard cardData={card} />
                </HoverScaleCard>
              </li>
            ))}
          </motion.ul>
        )}

        {/* CTA Button */}
        {stories.link?.label && (
          <CMSLink
            {...stories.link}
            appearance="secondary"
            hasIcon
            className="self-start lg:hidden"
          />
        )}
      </section>
    </ScrollAnimatedWrapper>
  )
}

type StoryCardData = NonNullable<Homepage['stories']['cards']>[number]

interface StoryCardProps {
  cardData: StoryCardData
}

function StoryCard({ cardData }: Readonly<StoryCardProps>) {
  const cardContent = (
    <>
      <Media
        resource={cardData.image}
        alt={cardData.title}
        className="absolute inset-0 -z-10 overflow-hidden rounded-[30px]"
        imgClassName="object-cover size-full"
      />
      <h3 className="typography-subheading font-bold text-white">{cardData.title}</h3>
      <p className="text-accent-foreground">{cardData.description}</p>
    </>
  )

  const cardClassName =
    'relative z-10 flex h-70 flex-col justify-end overflow-hidden rounded-[30px] p-6 shadow-[0_12px_24px_0_rgba(0,0,0,0.24)] after:absolute after:inset-0 after:-z-10 after:rounded-[30px] after:bg-linear-to-t after:from-black/80'

  // Se tiver link, envolver o card no CMSLink
  if (cardData.link?.type) {
    return (
      <CMSLink {...cardData.link} appearance="inline" className={cardClassName}>
        {cardContent}
      </CMSLink>
    )
  }

  return <article className={cardClassName}>{cardContent}</article>
}
