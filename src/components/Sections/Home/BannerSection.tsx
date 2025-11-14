'use client'
import { Homepage, Media as MediaType } from '@/payload-types'
import { useState } from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { useKeenSlider } from 'keen-slider/react'
import { Media } from '@/components/Media'
import 'keen-slider/keen-slider.min.css'

interface BannerSectionProps {
  banners: Homepage['banners']
}

export function BannerSection({ banners = [] }: Readonly<BannerSectionProps>) {
  const [opacities, setOpacities] = useState<number[]>([])
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

  if (!banners?.length) return null

  return (
    <div
      ref={sliderRef}
      className="fader relative h-screen w-full overflow-hidden lg:h-[min(100vh,var(--breakpoint-md))]"
    >
      {banners.map((banner, index) => {
        const backgroundImage = banner.backgroundImage as MediaType
        const featuredImage = banner.featuredImage as MediaType

        return (
          <div
            key={banner.id}
            className="absolute top-0 flex size-full cursor-grab items-end pt-40 select-none lg:pt-20"
            style={{ opacity: opacities[index] }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              {backgroundImage?.url && (
                <Media
                  htmlElement={null}
                  resource={backgroundImage}
                  imgClassName="object-cover"
                  alt={backgroundImage.alt || ''}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
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
                    <h1 className="text-center typography-heading font-bold text-pretty lg:text-left">
                      {banner.title}
                    </h1>
                  )}

                  {banner.link && (
                    <CMSLink
                      {...banner.link}
                      appearance="default"
                      size="default"
                      className="mt-7"
                      label={banner.link.label || 'Saiba mais'}
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

      {/* Indicators */}
      <div className="absolute inset-x-0 bottom-8 z-20 container flex items-end justify-end gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            data-current={currentSlide === idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className="w-10 cursor-pointer rounded-full bg-red-600 transition-all duration-300 data-[current=false]:h-0.5 data-[current=false]:bg-white/40 data-[current=true]:h-1.25 data-[current=true]:bg-white"
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
