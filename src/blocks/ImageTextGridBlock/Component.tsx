import type { ImageTextGridBlock as ImageTextGridBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { getMediaUrlFromField, getMediaAlt } from '@/utilities/getMediaUrl'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'

type ImageTextGridBlockProps = Omit<ImageTextGridBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

type ImageItem = ImageTextGridBlockType['images'][number]

const imageSizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-[173px] h-[111px] lg:w-[265px] lg:h-[237px]',
  md: 'w-[215px] h-[152px] lg:w-[331px] lg:h-[273px]',
  lg: 'w-full h-[165px] lg:w-[519px] lg:h-[335px]',
}

export function ImageTextGridBlock({
  headingText,
  bodyText,
  images,
  layout = 'images-right',
  className,
}: Readonly<ImageTextGridBlockProps>) {
  const isImagesLeft = layout === 'images-left'

  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className={cn('container', className)}
    >
      <div
        className={cn(
          'flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 2xl:gap-20',
          isImagesLeft && 'lg:flex-row-reverse',
        )}
      >
        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center space-y-6 lg:space-y-8">
          {headingText && (
            <RichText
              data={headingText}
              enableGutter={false}
              enableProse={false}
              className="font-heading text-[28px] leading-[1.2] text-secondary lg:text-[40px] [&_strong]:font-bold [&_strong]:text-accent"
            />
          )}
          {bodyText && (
            <RichText
              data={bodyText}
              enableGutter={false}
              enableProse={false}
              className="text-base leading-[1.6] text-foreground lg:text-xl lg:leading-[1.8] [&_strong]:font-bold [&_strong]:text-accent"
            />
          )}
        </div>

        {/* Images Container */}
        {images && images.length > 0 && (
          <div className="relative flex flex-col lg:shrink-0">
            {/* Multiple images layout */}
            {images.length === 1 && (
              <ImageCard
                image={images[0]}
                className={imageSizeClasses[images[0].size || 'lg']}
              />
            )}

            {images.length === 2 && (
              <div
                className={cn(
                  'flex flex-col',
                  isImagesLeft ? 'items-start' : 'items-end',
                )}
              >
                {/* First Image (larger) */}
                <ImageCard
                  image={images[0]}
                  className={cn(
                    imageSizeClasses[images[0].size || 'lg'],
                    !isImagesLeft && 'ml-auto',
                  )}
                />

                {/* Second Image (smaller, overlapping) */}
                <ImageCard
                  image={images[1]}
                  className={cn(
                    imageSizeClasses[images[1].size || 'md'],
                    '-mt-6 lg:-mt-12',
                    isImagesLeft ? 'ml-auto' : 'mr-auto',
                  )}
                />
              </div>
            )}

            {images.length >= 3 && (
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {images.map((img, index) => (
                  <ImageCard
                    key={index}
                    image={img}
                    className={imageSizeClasses[img.size || 'md']}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </HeaderThemeSetter>
  )
}

interface ImageCardProps {
  image: ImageItem
  className?: string
}

function ImageCard({ image, className }: Readonly<ImageCardProps>) {
  const imageUrl = getMediaUrlFromField(image.image)
  const imageAlt = getMediaAlt(image.image)

  if (!imageUrl) return null

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
      />
    </div>
  )
}
