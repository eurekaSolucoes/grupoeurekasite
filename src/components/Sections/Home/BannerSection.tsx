'use client'
import { Homepage, Media as MediaType } from '@/payload-types'
import { useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { useKeenSlider } from 'keen-slider/react'
import { Media } from '@/components/Media'
import 'keen-slider/keen-slider.min.css'

/**
 * Initializes slide opacities for fader effect
 * First slide visible (1), all others hidden (0)
 */
function getInitialOpacities(slideCount: number): number[] {
  return Array.from({ length: slideCount }, (_, i) => (i === 0 ? 1 : 0))
}

interface BannerSectionProps {
  banners: Homepage['banners']
}

export function BannerSection({ banners = [] }: Readonly<BannerSectionProps>) {
  const initialOpacities = useMemo(() => getInitialOpacities(banners?.length ?? 0), [banners])
  const [opacities, setOpacities] = useState<number[]>(initialOpacities)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: banners!.length,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  })

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!instanceRef.current || !banners) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          instanceRef.current.prev()
          break
        case 'ArrowRight':
          event.preventDefault()
          instanceRef.current.next()
          break
        case 'Home':
          event.preventDefault()
          instanceRef.current.moveToIdx(0)
          break
        case 'End':
          event.preventDefault()
          instanceRef.current.moveToIdx(banners.length - 1)
          break
      }
    },
    [instanceRef, banners],
  )

  if (!banners?.length) return null

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Carrossel de banners"
      aria-live="polite"
      aria-atomic="false"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative h-screen w-full overflow-hidden focus-visible:outline-none"
    >
      <div ref={sliderRef} className="relative size-full select-none">
        {banners.map((banner, index) => {
          const backgroundImage = banner.backgroundImage as MediaType
          const featuredImage = banner.featuredImage as MediaType

          return (
            <div
              data-first={index === 0}
              key={banner.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} de ${banners.length}: ${banner.title || 'Banner'}`}
              className="absolute top-0 flex size-full cursor-grab items-end pt-40 lg:pt-20"
              style={{ opacity: opacities[index] ?? 0 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0" aria-hidden="true">
                {backgroundImage?.url && (
                  <Image
                    src={backgroundImage.url}
                    alt={backgroundImage.alt || ''}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                )}
                <div className="absolute inset-0 bg-black/60" />
              </div>
              {/* Content */}
              <div className="relative z-10 container lg:h-full">
                <div className="grid items-center gap-7 lg:h-full lg:grid-cols-2">
                  {/* Text Content */}
                  <div className="flex flex-col items-center text-white lg:items-start">
                    {banner.subtitle && (
                      <p className="mb-2 inline-block text-center text-pretty lg:flex lg:gap-x-4 lg:text-left lg:typography-body-large lg:before:mt-5 lg:before:h-0.5 lg:before:w-10 lg:before:rounded-full lg:before:bg-accent">
                        {banner.subtitle}
                      </p>
                    )}

                    {banner.title && (
                      <h2 className="text-center typography-heading font-bold text-pretty lg:text-left">
                        {banner.title}
                      </h2>
                    )}

                    {banner.link && (
                      <CMSLink
                        {...banner.link}
                        appearance="default"
                        size="default"
                        className="mt-7"
                        label={banner.link.label || 'Saiba mais'}
                        aria-label={
                          banner.link.label
                            ? `${banner.link.label} sobre ${banner.title || 'este banner'}`
                            : `Saiba mais sobre ${banner.title || 'este banner'}`
                        }
                        hasIcon
                      />
                    )}
                  </div>

                  {/* Featured Image */}
                  <div className="self-end">
                    {featuredImage?.url && (
                      <div className="relative aspect-square size-full md:max-h-[min(50vh,var(--breakpoint-md))] lg:max-h-full">
                        <Image
                          src={featuredImage.url}
                          alt={featuredImage.alt || banner.title || ''}
                          fill
                          sizes="100vw, (min-width: 1024px) 50vw"
                          className="object-contain drop-shadow-2xl"
                          priority={index === 0}
                          quality={90}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Mostrando slide {currentSlide + 1} de {banners.length}
          {banners[currentSlide]?.title && `: ${banners[currentSlide].title}`}
        </div>

        {/* Indicators */}
        <nav
          className="absolute inset-x-0 bottom-8 z-20 container flex items-end justify-end gap-2"
          role="group"
          aria-label="Navegação de slides"
        >
          {banners.map((banner, i) => (
            <button
              key={i}
              aria-current={currentSlide === i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className="w-10 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-current:h-1.25 aria-current:bg-white aria-[current=false]:h-0.5 aria-[current=false]:bg-white/40"
              aria-label={banner.title ?? `Slide ${i + 1}${currentSlide === i ? ' (atual)' : ''}`}
            />
          ))}
        </nav>
      </div>
    </section>
  )
}
