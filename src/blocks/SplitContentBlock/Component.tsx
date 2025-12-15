import type { SplitContentBlock as SplitContentBlockType } from '@/payload-types'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { cva, type VariantProps } from 'class-variance-authority'

type SplitContentBlockProps = Omit<SplitContentBlockType, 'id' | 'blockName' | 'blockType'>

const headlineVariants = cva('[&_strong]:text-accent **:text-secondary', {
  variants: {
    size: {
      large: 'font-heading  text-subheading-mobile leading-tight lg:text-[2.5rem]',
      medium: 'typography-subheading',
    },
    width: {
      narrow: 'lg:max-w-145',
      wide: 'lg:max-w-2/3',
    },
  },
  defaultVariants: {
    size: 'large',
    width: 'narrow',
  },
})

const contentVariants = cva('space-y-5 [&_strong]:text-accent [&_strong]:font-bold', {
  variants: {
    size: {
      large: 'typography-body-large',
      medium: 'typography-body',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

export interface SplitContentVariants {
  headlineSize?: VariantProps<typeof headlineVariants>['size']
  headlineWidth?: VariantProps<typeof headlineVariants>['width']
  contentSize?: VariantProps<typeof contentVariants>['size']
}

export function SplitContentBlock({
  headline,
  content,
  headlineSize = 'large',
  headlineWidth = 'narrow',
  contentSize = 'large',
}: Readonly<SplitContentBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container"
      aria-labelledby="split-content-heading"
    >
      <div className="flex flex-col gap-6 lg:gap-7">
        {/* Coluna Esquerda - Headline */}
        {headline && (
          <div className="shrink-0">
            <RichText
              id="split-content-heading"
              data={headline}
              enableGutter={false}
              enableProse={false}
              className={cn(headlineVariants({ size: headlineSize, width: headlineWidth }))}
            />
          </div>
        )}

        {/* Coluna Direita - Content */}
        {content && (
          <div className="flex-1 lg:ml-[15vw] lg:max-w-5xl">
            <RichText
              data={content}
              enableGutter={false}
              enableProse={false}
              className={cn(contentVariants({ size: contentSize }))}
            />
          </div>
        )}
      </div>
    </HeaderThemeSetter>
  )
}
