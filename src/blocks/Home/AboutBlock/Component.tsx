'use client'

import type { Homepage } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  ScrollAnimatedWrapper,
  useScrollAnimation,
} from '@/components/animate/ScrollAnimatedWrapper'
import { ScrollingText } from '@/components/animate/ScrollingText'
import { motion } from 'motion/react'
import Image from 'next/image'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

export interface AboutBlockProps {
  about: Homepage['about']
}

export function AboutBlock({ about }: Readonly<AboutBlockProps>) {
  const scrollAnimation = useScrollAnimation({ scrollRange: [0, 0.2] })

  if (!about) return null

  return (
    <HeaderThemeSetter
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
    >
      <ScrollAnimatedWrapper
        scrollAnimation={scrollAnimation}
        background="bg-linear-to-bl from-brand-dark-blue from-25% to-secondary"
        innerClassName="bg-white"
      >
      <section className="relative overflow-y-clip py-16">
        {/* Decorative SVG Lines */}
        <DecorativeLines />

        {/* Main Content */}
        <div className="relative z-10 container">
          {/* First Block: Main Text + Right Images */}
          <div className="relative mb-16 space-y-7 lg:mb-0 lg:flex lg:gap-x-6">
            {/* Right Images */}
            <div className="flex flex-col lg:order-last lg:mt-auto lg:w-110 lg:shrink-0 lg:pt-30">
              {/* Right Image 1 (top, square) */}
              {about.rightImages?.[0]?.image && (
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                    },
                    y: {
                      duration: 1,
                      type: 'spring',
                      stiffness: 30,
                      damping: 15,
                      restDelta: 0.001,
                    },
                  }}
                  viewport={{ amount: 0.8, once: true }}
                  className="-mb-15 ml-auto aspect-square w-1/2 min-w-40"
                >
                  <Media
                    resource={about.rightImages[0].image}
                    className="size-full overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)]"
                    imgClassName="object-cover size-full aspect-square"
                  />
                </motion.div>
              )}
              {/* Right Image 2 (bottom, landscape) */}
              {about.rightImages?.[1]?.image && (
                <motion.div
                  initial={{ y: 15 }}
                  whileInView={{ y: 0 }}
                  exit={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    restDelta: 0.001,
                  }}
                  viewport={{ amount: 0.4, once: true }}
                  className="aspect-188/120 min-h-30 w-2/3 min-w-47"
                  style={{ zIndex: 1 }}
                >
                  <Media
                    resource={about.rightImages[1].image}
                    className="size-full overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)]"
                    imgClassName="object-cover size-full"
                  />
                </motion.div>
              )}
            </div>

            {/* Main Text */}
            {about.mainText && (
              <motion.div
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 50,
                  damping: 20,
                  restDelta: 0.001,
                }}
                viewport={{ amount: 0.3, once: true }}
                className="lg:w-full lg:pb-50"
              >
                <RichText
                  data={about.mainText}
                  enableGutter={false}
                  enableProse={false}
                  className="typography-subheading text-secondary lg:text-5xl [&_strong]:font-bold [&_strong]:text-accent"
                />
              </motion.div>
            )}
          </div>

          {/* Second Block: Left Images + Secondary Text */}
          <div className="relative space-y-7 lg:-mt-30 lg:flex lg:gap-15">
            {/* Left Images */}
            <div className="flex flex-col lg:-ml-10 lg:w-152 lg:shrink-0">
              {/* Left Image 1 (top, larger) */}
              {about.leftImages?.[0]?.image && (
                <div className="lg:flex lg:gap-14">
                  <motion.div
                    initial={{ y: -10 }}
                    whileInView={{ y: 0 }}
                    transition={{
                      duration: 0.6,

                      type: 'spring',
                      stiffness: 50,
                      damping: 20,
                      restDelta: 0.001,
                    }}
                    viewport={{ amount: 0.5, once: true }}
                    className="-mb-8 aspect-216/152 w-full max-w-2/3 lg:-mb-15"
                  >
                    <Media
                      resource={about.leftImages[0].image}
                      className="size-full overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)]"
                      imgClassName="object-cover size-full"
                    />
                  </motion.div>
                  <Image
                    src="/assets/about-section-arrow-down-desktop.svg"
                    width={243}
                    height={60}
                    alt=""
                    className="hidden lg:inline lg:shrink-0"
                  />
                </div>
              )}
              {/* Left Image 2 (bottom, smaller) */}
              {about.leftImages?.[1]?.image && (
                <motion.div
                  initial={{ y: 15 }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    restDelta: 0.001,
                  }}
                  viewport={{ amount: 0.4, once: true }}
                  className="ml-auto aspect-172/112 w-full max-w-1/2"
                  style={{ zIndex: 1 }}
                >
                  <Media
                    resource={about.leftImages[1].image}
                    className="size-full overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)]"
                    imgClassName="object-cover size-full"
                  />
                </motion.div>
              )}
            </div>

            <div className="lg:pt-60">
              {/* Secondary Text */}
              {about.secondaryText && (
                <motion.div
                  initial={{ x: 10 }}
                  whileInView={{ x: 0 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    restDelta: 0.001,
                  }}
                  viewport={{ once: true }}
                >
                  <RichText
                    data={about.secondaryText}
                    enableGutter={false}
                    enableProse={false}
                    className="typography-body-large text-foreground [&_strong]:font-bold [&_strong]:text-accent"
                  />
                </motion.div>
              )}

              {/* CTA Button */}
              {about.link?.label && (
                <motion.div
                  initial={{ y: 40 }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    restDelta: 0.001,
                  }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <CMSLink {...about.link} appearance="secondary" hasIcon />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {/* Animated Phrase */}
        {about.animatedPhrase && (
          <ScrollingText
            text={about.animatedPhrase}
            className="my-8"
            textClassName="text-accent/10"
            tag="p"
          />
        )}
      </section>
    </ScrollAnimatedWrapper>
    </HeaderThemeSetter>
  )
}

function DecorativeLines() {
  return (
    <>
      {/* Orange circle (top right area) */}
      <motion.div
        initial={{ y: -20 }}
        whileInView={{ y: 20 }}
        transition={{ duration: 1, type: 'spring', stiffness: 30, damping: 15 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute -top-20 right-0 z-0 size-90 translate-x-1/10 rounded-full border-[0.75px] border-accent/50"
      />

      {/* Blue circle (left side) */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: -20 }}
        transition={{ duration: 1, type: 'spring', stiffness: 30, damping: 15 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute top-1/3 left-0 z-0 size-100 -translate-x-3/5 rounded-full border-[0.75px] border-secondary/20"
      />
    </>
  )
}
