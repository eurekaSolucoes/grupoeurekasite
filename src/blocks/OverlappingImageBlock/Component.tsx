'use client'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import type { OverlappingImageBlock as OverlappingImageBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

type OverlappingImageBlockProps = Omit<OverlappingImageBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

const bgVariants = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
}

export function OverlappingImageBlock({
  image,
  title,
  content,
  variant = 'primary',
  className,
}: Readonly<OverlappingImageBlockProps>) {
  const variantClass = bgVariants[variant || 'primary']

  return (
    <section className={cn('relative', className)}>
      {/* Imagem sobreposta */}
      <HeaderThemeSetter
        as="div"
        logoMobile="icon-blue"
        logoDesktop="icon-blue"
        theme="secondary"
        className="container"
      >
        <div className="relative mx-auto -mb-31 aspect-video max-h-[250px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.24)] lg:-mb-62.5 lg:max-h-[500px] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]">
          {image && (
            <Media
              resource={image}
              fill
              size="(max-width: 1024px) 100vw, 1280px"
              imgClassName="object-cover"
            />
          )}
        </div>
      </HeaderThemeSetter>

      {/* Bloco colorido */}
      <HeaderThemeSetter
        as="div"
        logoMobile="icon-full-white"
        logoDesktop="icon-full-white"
        className={cn('pt-36 pb-16 lg:pt-72 lg:pb-20', variantClass)}
        theme="default"
      >
        <div className="container flex flex-col space-y-5 lg:space-y-10">
          {/* Título */}
          {title && (
            <RichText
              data={title}
              enableGutter={false}
              enableProse={false}
              className="max-w-3xl typography-heading font-bold lg:max-w-4xl [&_strong]:text-secondary"
            />
          )}

          {/* Conteúdo */}
          {content && (
            <RichText
              data={content}
              enableGutter={false}
              enableProse={false}
              className="ml-auto max-w-2xl space-y-5 typography-body-large lg:ml-[20%]"
            />
          )}
        </div>
      </HeaderThemeSetter>
    </section>
  )
}
