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
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'

type AccordionListBlockProps = Omit<AccordionListBlockType, 'id' | 'blockName' | 'blockType'>

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
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-5 lg:ml-[15vw] lg:max-w-5xl"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={item.id ?? index}
            value={`item-${index}`}
            className={cn(
              'rounded-[20px] border-none bg-input px-6 py-4 duration-300',
              'data-[state=open]:bg-secondary data-[state=open]:text-white',
            )}
          >
            <AccordionTrigger
              className={cn('group gap-5 py-0 hover:no-underline', '[&>svg]:size-8')}
            >
              <div className="flex flex-1 items-center gap-5">
                {/* Icon */}
                {item.iconName && (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary p-1.5 transition-colors duration-300 group-data-[state=open]:bg-accent">
                    <DynamicIcon
                      name={item.iconName as IconName}
                      className="size-full text-white"
                    />
                  </div>
                )}

                {/* Title */}
                <span className="text-left text-xl/[1.8] font-bold text-secondary group-data-[state=open]:text-white lg:text-2xl">
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
                  className="typography-body text-white [&_strong]:text-accent"
                />
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </HeaderThemeSetter>
  )
}
