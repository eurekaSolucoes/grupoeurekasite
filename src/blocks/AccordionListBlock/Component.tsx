'use client'

import type { AccordionListBlock as AccordionListBlockType } from '@/payload-types'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/utilities/ui'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import type { LucideProps } from 'lucide-react'

type AccordionListBlockProps = Omit<AccordionListBlockType, 'id' | 'blockName' | 'blockType'>

// Converte PascalCase para kebab-case (ex: BookOpen -> book-open)
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

interface DynamicIconProps extends LucideProps {
  name: string
}

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  const kebabName = toKebabCase(name) as keyof typeof dynamicIconImports

  if (!(kebabName in dynamicIconImports)) {
    return null
  }

  const LucideIcon = dynamic(dynamicIconImports[kebabName])
  return <LucideIcon {...props} />
})

DynamicIcon.displayName = 'DynamicIcon'

export function AccordionListBlock({ items }: Readonly<AccordionListBlockProps>) {
  if (!items || items.length === 0) return null

  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className="container"
    >
      <Accordion type="single" collapsible className="flex flex-col gap-5">
        {items.map((item, index) => (
          <AccordionItem
            key={item.id ?? index}
            value={`item-${index}`}
            className={cn(
              'rounded-[20px] border-none bg-input px-6 py-4',
              'data-[state=open]:bg-secondary data-[state=open]:text-white',
            )}
          >
            <AccordionTrigger
              className={cn(
                'gap-5 py-0 hover:no-underline',
                '[&>svg]:size-8 [&>svg]:text-secondary',
                '[&[data-state=open]>svg]:text-white',
              )}
            >
              <div className="flex flex-1 items-center gap-5">
                {/* Icon */}
                {item.iconName && (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary p-1.5 group-data-[state=open]:bg-white/20">
                    <DynamicIcon
                      name={item.iconName}
                      className="size-full text-white"
                    />
                  </div>
                )}

                {/* Title */}
                <span className="text-left font-bold text-xl leading-[1.8] text-secondary group-data-[state=open]:text-white lg:text-2xl">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>

            {item.content && (
              <AccordionContent className="pt-4 pb-0">
                <RichText
                  data={item.content}
                  enableGutter={false}
                  enableProse={false}
                  className="typography-body-large text-white/80 [&_strong]:text-accent"
                />
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </HeaderThemeSetter>
  )
}
