import Image from 'next/image'
import { cn } from '@/utilities/ui'

interface TextImageStackSectionProps {
  headingText?: string
  mainImage?: { src: string; alt: string }
  bodyText?: string
  overlappingImages?: { src: string; alt: string }[]
  className?: string
}

export function TextImageStackSection({
  headingText,
  mainImage,
  bodyText,
  overlappingImages,
  className,
}: Readonly<TextImageStackSectionProps>) {
  return (
    <section className={cn('container flex flex-col gap-y-10 xl:gap-y-20', className)}>
      {/* Heading Text */}
      <header className="flex flex-col gap-y-10 lg:flex-row lg:gap-14">
        {headingText && (
          <h2
            className="pb-20 typography-heading text-secondary lg:max-w-177 lg:typography-subheading xl:pb-50 [&_strong]:font-bold [&_strong]:text-accent"
            dangerouslySetInnerHTML={{
              __html: headingText,
            }}
          />
        )}

        {/* Main Image */}
        {mainImage && (
          <div className="relative aspect-320/165 min-h-[165px] w-full overflow-hidden rounded-[20px] shadow-[12px_12px_24px_0_rgba(0,0,0,0.12)] lg:aspect-520/335">
            <Image src={mainImage.src} alt={mainImage.alt} fill className="object-cover" />
          </div>
        )}
      </header>
      <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-14 xl:gap-25">
        {/* Body Text */}
        {bodyText && (
          <p
            className="text-foreground lg:max-w-165 lg:text-xl [&_strong]:font-bold [&_strong]:text-accent"
            dangerouslySetInnerHTML={{ __html: bodyText }}
          />
        )}

        {/* Overlapping Images */}
        {overlappingImages && overlappingImages.length >= 2 && (
          <div className="flex flex-col lg:order-first lg:-mt-20 lg:grow xl:-mt-50">
            {/* First Image (larger) */}
            <div className="relative ml-auto aspect-215/152 min-h-[152px] w-2/3 min-w-[215px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.24)] lg:aspect-330/270">
              <Image
                src={overlappingImages[0].src}
                alt={overlappingImages[0].alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Second Image (smaller, overlapping) */}
            <div className="relative -mt-14 aspect-173/111 min-h-[111px] w-1/2 min-w-[173px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:aspect-265/240">
              <Image
                src={overlappingImages[1].src}
                alt={overlappingImages[1].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
