'use client'

import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

export interface OverlappingImageBlockSectionProps {
  /** Imagem sobreposta que "sai" do bloco */
  image: {
    src: string
    alt: string
  }
  /** Título com suporte a HTML (<span>, <strong>) */
  title: string
  /** Array de parágrafos */
  paragraphs?: string[]
  /** Variante de cor de fundo */
  variant?: 'primary' | 'secondary' | 'accent'
  /** Classes adicionais */
  className?: string
}

const bgVariants = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
}

export function OverlappingImageBlockSection({
  image,
  title,
  paragraphs,
  variant = 'primary',
  className,
}: Readonly<OverlappingImageBlockSectionProps>) {
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
        <div className="relative mx-auto -mb-16 aspect-video max-h-[250px] overflow-hidden rounded-[20px] shadow-[6px_6px_12px_0_rgba(0,0,0,0.24)] lg:-mb-32 lg:max-h-[500px] lg:rounded-[40px] lg:shadow-[12px_12px_24px_0_rgba(0,0,0,0.24)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </HeaderThemeSetter>

      {/* Bloco colorido */}
      <HeaderThemeSetter
        as="div"
        logoMobile="icon-full-white"
        logoDesktop="icon-full-white"
        className={cn('pt-24 pb-16 lg:pt-44 lg:pb-20', bgVariants[variant])}
        theme="default"
      >
        <div className="container flex flex-col space-y-5 lg:space-y-10">
          {/* Título */}
          <h2
            className="max-w-3xl typography-heading font-bold [&_span]:text-secondary"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Parágrafos */}
          {paragraphs && paragraphs.length > 0 && (
            <div className="ml-auto max-w-2xl space-y-5 typography-body-large">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </HeaderThemeSetter>
    </section>
  )
}
