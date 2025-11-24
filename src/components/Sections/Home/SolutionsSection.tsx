'use client'

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import Image from 'next/image'

import type { Homepage } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight } from '@/components/Icons/ArrowRight'
import { useMediaQuery } from 'usehooks-ts'
import { ScrollingText } from '@/components/animate/ScrollingText'

interface SolutionsSectionProps {
  solutions: Homepage['solutions']
}

export function SolutionsSection({ solutions }: Readonly<SolutionsSectionProps>) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const [scrollDirection, setScrollDirection] = useState('down')

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - (scrollY.getPrevious() ?? 0)
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  const rawScale = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%'])
  const scale = useSpring(rawScale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const rawCircleY = useTransform(scrollYProgress, [0.5, 0.8], [0, -100])
  const circleY = useSpring(rawCircleY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!solutions) return null
  return (
    <motion.section className="relative z-10 min-h-[140vh] overflow-x-hidden pt-[45vh] pb-40 sm:pt-[50vh]">
      <motion.div
        ref={containerRef}
        className="absolute inset-y-0 top-0 left-1/2 w-[180vw] -translate-x-1/2 overflow-hidden overflow-x-hidden rounded-t-full bg-linear-to-tl from-brand-dark-blue from-25% to-secondary lg:rounded-[50%_50%_0_0/100%_100%_0_0]"
        style={{
          scale,
        }}
      >
        <div className="relative z-20 mx-auto h-full w-screen">
          <motion.div
            className="absolute top-1/5 left-0 z-20 hidden size-130 -translate-x-1/2 rounded-full border-[0.75px] border-black/50 lg:block"
            style={{
              y: circleY,
            }}
          />
          <motion.div
            className="absolute right-0 bottom-1/4 z-20 hidden size-100 translate-x-1/2 rounded-full border-[0.75px] border-black/50 lg:block"
            transition={{ duration: 0.5 }}
            viewport={{
              once: true,
            }}
          />
        </div>{' '}
      </motion.div>

      <div className="relative z-10 container flex flex-col items-center">
        {solutions.title && solutions.subtitle && (
          <motion.header
            initial={scrollDirection === 'down' ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex w-full max-w-90 flex-col justify-center self-start sm:self-center lg:max-w-155"
          >
            <h2 className="pr-20 font-heading text-[3.125rem]/none font-bold text-secondary-foreground lg:text-[6.25rem]/none">
              {solutions.title}
            </h2>
            <p className="ml-21.5 pr-10 font-heading text-[2.375rem]/none text-accent lg:-mt-4 lg:ml-63 lg:text-[4.125rem]/none">
              {solutions.subtitle}
            </p>
            <Image
              src="/assets/arrow-down-mobile.svg"
              alt="Arrow down"
              width={67}
              height={70}
              className="absolute top-5 right-2 lg:hidden"
            />
            <Image
              src="/assets/arrow-down-desktop.svg"
              alt="Arrow down"
              width={177}
              height={96}
              className="absolute top-5 right-2 hidden lg:block"
            />
          </motion.header>
        )}
        {solutions.cards && solutions.cards.length > 0 && (
          <ul className="grid w-full grid-cols-1 gap-5 pt-7 sm:max-w-4/5 lg:grid-cols-3 lg:gap-6">
            {solutions.cards.map((card, index) => {
              const isEven = index % 2 === 0
              const rotateDirection = isEven ? -1 : 1
              const rotate = rotateDirection * 15
              return (
                <motion.li
                  key={card.title}
                  initial={{ transform: `rotate(${rotate}deg)` }}
                  whileInView={{ transform: 'rotate(0deg)' }}
                  transition={{ duration: 0.5, delay: isDesktop ? 0 : index * 0.1 }}
                  viewport={{
                    amount: isDesktop ? 0.9 : 0.5,
                    once: true,
                  }}
                  style={{
                    zIndex: index,
                  }}
                >
                  <CMSLink
                    {...card.link}
                    title={card.title}
                    data-disabled={!card.link}
                    className="data-[disabled=true]:pointer-events-none"
                    label={null}
                  >
                    <SolutionCard cardData={card} />
                  </CMSLink>
                </motion.li>
              )
            })}
          </ul>
        )}
        {solutions.description && (
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{
              once: true,
            }}
            className="pt-15 text-center typography-body-large text-balance text-secondary-foreground lg:pt-22"
          >
            {solutions.description}
          </motion.p>
        )}
      </div>
      {solutions.animatedPhrase && (
        <ScrollingText className="pt-16 opacity-8" text={solutions.animatedPhrase} />
      )}
    </motion.section>
  )
}

type SolutionCard = NonNullable<NonNullable<Homepage['solutions']>['cards']>[number]

interface SolutionCardProps {
  cardData: SolutionCard
}

function SolutionCard({ cardData }: Readonly<SolutionCardProps>) {
  return (
    <div className="group relative flex h-50 items-end rounded-2xl p-6 shadow-[0_12px_24px_0_rgba(0,0,0,0.24)] after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:bg-linear-to-t after:from-black/50 after:to-40% lg:aspect-square lg:size-full lg:max-h-102 lg:p-10 lg:transition-transform lg:duration-300 lg:hover:scale-110">
      <Media
        resource={cardData.image}
        alt={cardData.title}
        className="absolute inset-0 -z-20 overflow-hidden rounded-2xl"
        imgClassName="object-cover size-full"
      />
      {cardData.title && (
        <h3 className="typography-subheading text-secondary-foreground lg:text-xl xl:text-2xl 2xl:text-[2rem]/[1.2]">
          {cardData.title}
        </h3>
      )}
      <ArrowRight className="absolute right-4 bottom-0 translate-y-1/2 animate-out shadow-[0_6.857px_13.714px_0_rgba(0,0,0,0.40)] duration-300 fill-mode-forwards zoom-out-90 fade-out slide-out-to-left-4 group-hover:animate-in group-hover:zoom-in-90 group-hover:fade-in group-hover:slide-in-from-left-4" />
    </div>
  )
}
