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

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: banners!.length,
    loop: true,
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  })

  console.log(opacities)

  if (!banners?.length) return null

  return (
    <div ref={sliderRef} className="fader relative h-screen w-full overflow-hidden">
      {banners.map((banner, index) => {
        const backgroundImage = banner.backgroundImage as MediaType
        const featuredImage = banner.featuredImage as MediaType

        return (
          <div
            key={index}
            className="absolute top-0 flex size-full items-end pt-40"
            style={{ opacity: opacities[index] }}
          >
            oii
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
            <div className="relative z-10 container">
              <div className="grid items-center gap-7 lg:grid-cols-2">
                {/* Text Content */}
                <div className="flex flex-col items-center text-white">
                  {banner.subtitle && (
                    <p className="pb-2 text-center text-pretty">{banner.subtitle}</p>
                  )}

                  {banner.title && (
                    <h1 className="pt-1 text-center text-heading font-bold">{banner.title}</h1>
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
                <div className="relative aspect-square">
                  {featuredImage?.url && (
                    <div className="relative size-full">
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
    </div>
  )
}
