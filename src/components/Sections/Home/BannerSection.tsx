'use client'
import { Homepage, Media } from '@/payload-types'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import {
  Slider,
  SliderContent,
  SliderItem,
  useSlider,
  type SliderApi,
} from '@/components/ui/slider'
import type { KeenSliderPlugin } from 'keen-slider/react'

interface BannerSectionProps {
  banners: Homepage['banners']
}

export function BannerSection({ banners = [] }: Readonly<BannerSectionProps>) {
  const [api, setApi] = useState<SliderApi>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrentSlide(api.track.details.rel)

    api.on('slideChanged', () => {
      setCurrentSlide(api.track.details.rel)
    })
  }, [api])

  if (!banners?.length) return null

  return (
    <Slider
      opts={{
        loop: true,
      }}
      setApi={setApi}
      className="relative h-screen w-full"
    >
      <SliderContent className="h-screen">
        {banners.map((banner, index) => {
          const backgroundImage = banner.backgroundImage as Media
          const featuredImage = banner.featuredImage as Media

          return (
            <SliderItem key={banner.id} className="relative flex h-full items-center">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                {backgroundImage?.url && (
                  <Image
                    src={backgroundImage.url}
                    alt={backgroundImage.alt || ''}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  {/* Text Content */}
                  <div
                    className={cn(
                      'space-y-6 text-white transition-all delay-300 duration-700',
                      currentSlide === index
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-10 opacity-0',
                    )}
                  >
                    {banner.subtitle && (
                      <p className="text-lg font-medium text-white/90 md:text-xl">
                        {banner.subtitle}
                      </p>
                    )}

                    {banner.title && (
                      <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                        {banner.title}
                      </h1>
                    )}

                    {banner.link && (
                      <div className="pt-4">
                        <CMSLink
                          {...banner.link}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-xl"
                        >
                          {banner.link.label || 'Saiba mais'}
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </CMSLink>
                      </div>
                    )}
                  </div>

                  {/* Featured Image */}
                  <div
                    className={cn(
                      'relative aspect-square transition-all delay-500 duration-700',
                      currentSlide === index
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-10 opacity-0',
                    )}
                  >
                    {featuredImage?.url && (
                      <div className="relative h-full w-full">
                        <Image
                          src={featuredImage.url}
                          alt={featuredImage.alt || banner.title || ''}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority={index === 0}
                          quality={90}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SliderItem>
          )
        })}
      </SliderContent>

      {/* Navigation Controls */}
      {banners.length > 1 && (
        <BannerControls totalSlides={banners.length} currentSlide={currentSlide} />
      )}
    </Slider>
  )
}

// Navigation Controls Component
function BannerControls({
  totalSlides,
  currentSlide,
}: {
  totalSlides: number
  currentSlide: number
}) {
  const { api } = useSlider()

  return (
    <>
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {[...Array(totalSlides).keys()].map((idx) => (
          <button
            key={idx}
            onClick={() => api?.moveToIdx(idx)}
            className={cn(
              'h-3 rounded-full transition-all duration-300',
              currentSlide === idx ? 'w-12 bg-white' : 'w-3 bg-white/50 hover:bg-white/75',
            )}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          api?.prev()
        }}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 lg:left-8"
        aria-label="Slide anterior"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          api?.next()
        }}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 lg:right-8"
        aria-label="Próximo slide"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  )
}
