'use client'
import { Homepage, Media as MediaType } from '@/payload-types'
import { useState, useCallback, useMemo, useRef } from 'react'
import { CMSLink } from '@/components/Link'
import { useKeenSlider } from 'keen-slider/react'
import { Media } from '@/components/Media'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { cn } from '@/utilities/ui'
import 'keen-slider/keen-slider.min.css'

/**
 * Initializes slide opacities for fader effect
 * First slide visible (1), all others hidden (0)
 */
function getInitialOpacities(slideCount: number): number[] {
  return Array.from({ length: slideCount }, (_, i) => (i === 0 ? 1 : 0))
}

export interface BannerBlockProps {
  banners: Homepage['banners']
}

export function BannerBlock({ banners = [] }: Readonly<BannerBlockProps>) {
  const initialOpacities = useMemo(() => getInitialOpacities(banners?.length ?? 0), [banners])
  const [opacities, setOpacities] = useState<number[]>(initialOpacities)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null)
  const currentSlideRef = useRef(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: banners!.length,
    loop: true,
    slideChanged(s) {
      const prev = currentSlideRef.current
      const next = s.track.details.rel
      const totalSlides = banners!.length

      // Detectar direção considerando loop
      let direction: 'next' | 'prev' = 'next'
      if (prev === 0 && next === totalSlides - 1) {
        direction = 'prev' // Loop backwards (primeiro → último)
      } else if (prev === totalSlides - 1 && next === 0) {
        direction = 'next' // Loop forwards (último → primeiro)
      } else {
        direction = next > prev ? 'next' : 'prev'
      }

      setSlideDirection(direction)
      setCurrentSlide(next)
      currentSlideRef.current = next
    },
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  })

  // Helper para classes de animação da featured image
  const getFeaturedImageClasses = (index: number) => {
    const isActive = index === currentSlide
    const isFirst = index === 0

    // Primeiro render: animação inicial apenas no primeiro slide
    if (isFirst && !slideDirection) {
      return 'self-end group-first/slide:animate-in group-first/slide:duration-1500 group-first/slide:ease-in-out group-first/slide:slide-in-from-left-5 group-first/slide:fade-in'
    }

    // Slides inativos: sem animação
    if (!isActive) {
      return 'self-end'
    }

    // Slide ativo: anima baseado na direção
    return cn(
      'animate-in self-end duration-1000 ease-out',
      slideDirection === 'next' && 'slide-in-from-right-20',
      slideDirection === 'prev' && 'slide-in-from-left-20',
    )
  }

  // Gera chave única para forçar remontagem do elemento quando muda de direção
  const getFeaturedImageKey = (index: number) => {
    return `featured-${index}-${slideDirection || 'initial'}`
  }

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
    <HeaderThemeSetter
      as="section"
      logoMobile="icon-white"
      logoDesktop="full"
      aria-roledescription="carrossel"
      aria-label="Carrossel de banners"
      aria-live="polite"
      aria-atomic="false"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="sticky top-0 min-h-svh w-full overflow-hidden bg-background focus-visible:outline-none"
    >
      <div ref={sliderRef} className="relative size-full min-h-[inherit] select-none">
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
              className="group/slide absolute top-0 flex size-full min-h-fit cursor-grab items-end pt-[84px] lg:pt-[120px]"
              style={{ opacity: opacities[index] ?? 0 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0" aria-hidden="true">
                {backgroundImage && (
                  <Media
                    resource={backgroundImage}
                    fill
                    size="100vw"
                    priority={index === 0}
                    imgClassName="object-cover"
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
                      <p className="mb-2 inline-block text-center text-pretty group-first/slide:animate-in group-first/slide:duration-1500 group-first/slide:ease-out group-first/slide:fade-in group-first/slide:slide-in-from-left lg:flex lg:gap-x-4 lg:text-left lg:typography-body-large lg:before:mt-5 lg:before:h-0.5 lg:before:w-10 lg:before:rounded-full lg:before:bg-accent">
                        {banner.subtitle}
                      </p>
                    )}

                    {banner.title &&
                      (index === 0 ? (
                        <h1 className="text-center typography-heading font-bold text-pretty group-first/slide:animate-in group-first/slide:delay-200 group-first/slide:duration-1500 group-first/slide:ease-in-out group-first/slide:fade-in group-first/slide:slide-in-from-left lg:text-left">
                          {banner.title}
                        </h1>
                      ) : (
                        <h2 className="text-center typography-heading font-bold text-pretty group-first/slide:animate-in group-first/slide:delay-200 group-first/slide:duration-1500 group-first/slide:ease-in-out group-first/slide:fade-in group-first/slide:slide-in-from-left lg:text-left">
                          {banner.title}
                        </h2>
                      ))}

                    {banner.link && (
                      <div className="mt-7 group-first/slide:animate-in group-first/slide:delay-500 group-first/slide:duration-1500 group-first/slide:ease-out group-first/slide:fade-in group-first/slide:slide-in-from-left">
                        <CMSLink
                          {...banner.link}
                          appearance="default"
                          size="default"
                          label={banner.link.label || 'Saiba mais'}
                          aria-label={
                            banner.link.label
                              ? `${banner.link.label} sobre ${banner.title || 'este banner'}`
                              : `Saiba mais sobre ${banner.title || 'este banner'}`
                          }
                          hasIcon
                        />
                      </div>
                    )}
                  </div>

                  {/* Featured Image */}
                  <div key={getFeaturedImageKey(index)} className={getFeaturedImageClasses(index)}>
                    {featuredImage && (
                      <div className="relative aspect-square size-full md:max-h-[min(50vh,var(--breakpoint-md))] lg:max-h-full">
                        <Media
                          resource={featuredImage}
                          fill
                          size="100vw, (min-width: 1024px) 50vw"
                          priority={index === 0}
                          imgClassName="object-contain object-bottom drop-shadow-2xl"
                          disableBlur
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
              className="group/indicator relative flex cursor-pointer items-center justify-center py-4"
              aria-label={banner.title ?? `Slide ${i + 1}${currentSlide === i ? ' (atual)' : ''}`}
            >
              <span className="w-10 rounded-full transition-all duration-300 group-focus-visible/indicator:outline-2 group-focus-visible/indicator:outline-offset-2 group-focus-visible/indicator:outline-white group-aria-current/indicator:h-1.25 group-aria-current/indicator:bg-white group-aria-[current=false]/indicator:h-0.5 group-aria-[current=false]/indicator:bg-white/40" />
            </button>
          ))}
        </nav>
      </div>
    </HeaderThemeSetter>
  )
}
