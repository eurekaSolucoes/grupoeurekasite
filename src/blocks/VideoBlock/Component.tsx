import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { VideoBlock as VideoBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'

type VideoBlockProps = Omit<VideoBlockType, 'id' | 'blockName' | 'blockType'>

export function VideoBlock({
  backgroundImage,
  headline,
  buttonLabel,
  videoUrl,
}: Readonly<VideoBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="default"
      logoMobile="full"
      logoDesktop="full"
      className="container"
    >
      <div className="relative h-120 overflow-hidden rounded-[40px] shadow-[12px_12px_24px_0px_rgba(0,0,0,0.24)] before:absolute before:inset-0 before:bg-linear-to-t before:from-[#010F3B]/80 lg:h-145">
        {/* Background Image */}
        {backgroundImage && (
          <Media resource={backgroundImage} fill imgClassName="relative -z-10 object-cover" />
        )}

        {/* Content */}
        <div className="absolute inset-x-6 bottom-10 flex flex-col items-start gap-7 lg:inset-x-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Título */}
          {headline && (
            <RichText
              data={headline}
              enableGutter={false}
              enableProse={false}
              className="typography-subheading text-secondary-foreground lg:max-w-68 [&_strong]:text-accent"
            />
          )}

          {/* Botão */}
          {videoUrl && (
            <Button
              asChild
              hasIcon
              icon={
                <span className="flex size-full items-center justify-center rounded-full bg-accent shadow-lg">
                  <Play className="size-4 text-white" />
                </span>
              }
            >
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <span>{buttonLabel}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </HeaderThemeSetter>
  )
}
