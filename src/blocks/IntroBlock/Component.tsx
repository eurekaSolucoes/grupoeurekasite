import type { IntroBlock as IntroBlockType } from '@/payload-types'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'

type IntroBlockProps = Omit<IntroBlockType, 'id' | 'blockName' | 'blockType'>

export function IntroBlock({ headline, content }: Readonly<IntroBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container flex flex-col"
      aria-labelledby="intro-heading"
    >
      {headline && (
        <RichText
          id="intro-heading"
          data={headline}
          enableGutter={false}
          enableProse={false}
          className="mb-5 typography-subheading text-secondary lg:max-w-2/3 [&_strong]:text-accent"
        />
      )}

      {content && (
        <RichText
          data={content}
          enableGutter={false}
          enableProse={false}
          className="space-y-2 lg:ml-54 typography-body-large [&_strong]:text-accent"
        />
      )}
    </HeaderThemeSetter>
  )
}
