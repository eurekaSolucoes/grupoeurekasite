import type { TextImageStackBlock as TextImageStackBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'
import { FadeIn } from '@/components/animate/FadeIn'

type TextImageStackBlockProps = Omit<TextImageStackBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

export function TextImageStackBlock({
  headingText,
  mainImage,
  bodyText,
  overlappingImages,
  className,
}: Readonly<TextImageStackBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className={cn('container flex flex-col gap-y-10 xl:gap-y-20', className)}
    >
      {/* Heading Text */}
      <header className="flex flex-col gap-y-10 lg:flex-row lg:gap-14">
        {headingText && (
          <FadeIn variant="fadeRight" className="w-full" viewportAmount={0.4}>
            <RichText
              data={headingText}
              enableGutter={false}
              enableProse={false}
              className="w-full pb-20 typography-heading text-secondary lg:max-w-177 lg:typography-subheading xl:pb-50 [&_strong]:font-bold [&_strong]:text-accent"
            />
          </FadeIn>
        )}

        {/* Main Image - sem FadeIn para manter layout original */}
        {mainImage && (
          <div className="relative aspect-320/165 min-h-[165px] w-full overflow-hidden rounded-[20px] shadow-[12px_12px_24px_0_rgba(0,0,0,0.12)] lg:aspect-520/335">
            <Media resource={mainImage} fill imgClassName="object-cover" />
          </div>
        )}
      </header>
      <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-14 xl:gap-25">
        {/* Body Text */}
        {bodyText && (
          <FadeIn variant="fadeUp" delay={0.2} viewportAmount={0.4}>
            <RichText
              data={bodyText}
              enableGutter={false}
              enableProse={false}
              className="text-foreground lg:max-w-165 lg:text-xl [&_strong]:font-bold [&_strong]:text-accent"
            />
          </FadeIn>
        )}

        {/* Overlapping Images */}
        {overlappingImages && overlappingImages.length >= 2 && (
          <div className="flex flex-col lg:order-first lg:-mt-20 lg:grow xl:-mt-50">
            {/* First Image (larger) */}
            {overlappingImages[0]?.image && (
              <div className="relative ml-auto aspect-215/152 min-h-[152px] w-2/3 min-w-[215px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.24)] lg:aspect-330/270">
                <Media resource={overlappingImages[0].image} fill imgClassName="object-cover" />
              </div>
            )}

            {/* Second Image (smaller, overlapping) */}
            {overlappingImages[1]?.image && (
              <div className="relative -mt-14 aspect-173/111 min-h-[111px] w-1/2 min-w-[173px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.12)] lg:aspect-265/240">
                <Media resource={overlappingImages[1].image} fill imgClassName="object-cover" />
              </div>
            )}
          </div>
        )}
      </div>
    </HeaderThemeSetter>
  )
}
