'use client'

import Image from 'next/image'
import type { AlternatingBlock as AlternatingBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'
import { FadeIn } from '@/components/animate/FadeIn'

type AlternatingBlockProps = Omit<AlternatingBlockType, 'id' | 'blockName' | 'blockType'>

export function AlternatingBlock({
  title,
  subtitle,
  showArrow = false,
  items,
}: Readonly<AlternatingBlockProps>) {
  const hasTitleOrSubtitle = title || subtitle

  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container"
    >
      {/* Header */}
      {hasTitleOrSubtitle && (
        <FadeIn variant="fadeUp" className="relative mb-5 flex min-h-24 w-fit flex-col lg:mb-16">
          {subtitle && (
            <p className="font-title pr-32 text-4xl leading-tight text-secondary lg:text-[66px] lg:leading-[68px]">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-title ml-auto pr-5 pl-10 text-5xl leading-none font-bold text-accent lg:pl-22 lg:text-[5rem]">
              {title}
            </h2>
          )}
          {showArrow && (
            <Image
              src="/assets/alternating-block-arrow.svg"
              width={57}
              height={191}
              alt=""
              className="absolute top-1 right-0 h-[92px] w-[27px] -scale-y-100 rotate-135 lg:h-[191px] lg:w-[57px]"
              aria-hidden="true"
            />
          )}
        </FadeIn>
      )}

      {/* Blocks */}
      <div className="space-y-16 lg:space-y-24">
        {items.map((item, index) => (
          <article
            key={index}
            className="group/block flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8 even:lg:flex-row-reverse 2xl:gap-16"
          >
            {/* Images Container */}
            {item.images && item.images.length > 0 && (
              <div className="relative flex flex-col lg:w-[500px] lg:shrink-0">
                {/* First Image (larger) - odd: right, even: left */}
                {item.images[0]?.image && (
                  <FadeIn
                    variant="fadeUp"
                    viewportAmount={0.2}
                    className="relative aspect-410/290 w-2/3 group-odd/block:ml-auto group-even/block:mr-auto lg:w-[410px]"
                  >
                    <Media
                      resource={item.images[0].image}
                      fill
                      imgClassName="size-full rounded-[20px] object-cover shadow-[6px_6px_12px_0_rgba(0,0,0,0.24)] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]"
                    />
                  </FadeIn>
                )}

                {/* Second Image (smaller, overlapping) - odd: left, even: right */}
                {item.images[1]?.image && (
                  <FadeIn
                    variant="fadeUp"
                    delay={0.1}
                    viewportAmount={0.2}
                    className="relative -mt-8 aspect-331/212 w-1/2 group-odd/block:mr-auto group-even/block:ml-auto lg:-mt-12 lg:w-[331px]"
                  >
                    <Media
                      resource={item.images[1].image}
                      fill
                      imgClassName="size-full rounded-[20px] object-cover shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.12)]"
                    />
                  </FadeIn>
                )}
              </div>
            )}

            {/* Text Content */}
            <div className="flex flex-1 flex-col justify-center space-y-4 lg:space-y-6 lg:pt-10 lg:group-first/card:pt-16">
              {item.primaryText && (
                <FadeIn variant="fadeUp" viewportAmount={0.4}>
                  <RichText
                    data={item.primaryText}
                    enableGutter={false}
                    enableProse={false}
                    className="font-heading text-2xl leading-[1.2] text-secondary lg:text-[2.5rem] [&_strong]:text-accent"
                  />
                </FadeIn>
              )}
              {item.secondaryText && (
                <FadeIn variant="fadeUp" delay={0.1} viewportAmount={0.4}>
                  <RichText
                    data={item.secondaryText}
                    enableGutter={false}
                    enableProse={false}
                    className="typography-body-large leading-[1.8] text-balance [&_strong]:text-accent"
                  />
                </FadeIn>
              )}
            </div>
          </article>
        ))}
      </div>
    </HeaderThemeSetter>
  )
}
