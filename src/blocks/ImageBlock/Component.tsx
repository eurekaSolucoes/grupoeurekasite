import type { ImageBlock as ImageBlockType } from '@/payload-types'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { cva } from 'class-variance-authority'

type ImageBlockProps = Omit<ImageBlockType, 'id' | 'blockName' | 'blockType'>

const imageVariants = cva('overflow-hidden shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]', {
  variants: {
    rounded: {
      default: 'rounded-[20px] lg:rounded-[40px]',
      small: 'rounded-[20px]',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    rounded: 'default',
  },
})

export function ImageBlock({
  image,
  imageRounded = 'default',
}: Readonly<ImageBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container"
    >
      {image && typeof image !== 'string' && (
        <div
          className={cn(
            'relative aspect-video w-full lg:aspect-[16/10]',
            imageVariants({ rounded: imageRounded }),
          )}
        >
          <Media
            resource={image}
            fill
            imgClassName="size-full object-cover"
          />
        </div>
      )}
    </HeaderThemeSetter>
  )
}
