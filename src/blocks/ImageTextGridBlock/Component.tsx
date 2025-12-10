import { cn } from '@/utilities/ui'
// import { Media } from '@/components/Media'
// import type { Media as MediaType } from '@/payload-types'
import Image from 'next/image'

interface ImageItem {
  image: string // MediaType | string | number - usando string para dados mockados
  alt?: string
  size?: 'sm' | 'md' | 'lg'
}

export interface ImageTextGridBlockProps {
  headingText?: string
  bodyText?: string
  images: ImageItem[]
  layout?: 'images-left' | 'images-right'
  className?: string
}

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
    <section className={cn('container', className)}>
      <div
        className={cn(
          'flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 2xl:gap-20',
          isImagesLeft && 'lg:flex-row-reverse',
        )}
      >
        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center space-y-6 lg:space-y-8">
          {headingText && (
            <h2
              className="font-heading text-[28px] leading-[1.2] text-secondary lg:text-[40px] [&_strong]:font-bold [&_strong]:text-accent"
              dangerouslySetInnerHTML={{ __html: headingText }}
            />
          )}
          {bodyText && (
            <p
              className="text-base leading-[1.6] text-foreground lg:text-xl lg:leading-[1.8] [&_strong]:font-bold [&_strong]:text-accent"
              dangerouslySetInnerHTML={{ __html: bodyText }}
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
    </section>
  )
}

interface ImageCardProps {
  image: ImageItem
  className?: string
}

function ImageCard({ image, className }: Readonly<ImageCardProps>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <Image
        src={image.image}
        alt={image.alt || ''}
        fill
        className="object-cover"
      />
    </div>
  )
  /* Comentado para uso futuro com CMS:
  return (
    <Media
      resource={image.image}
      alt={image.alt || ''}
      className={cn(
        'relative overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]',
        className,
      )}
      imgClassName="object-cover size-full"
    />
  )
  */
}
