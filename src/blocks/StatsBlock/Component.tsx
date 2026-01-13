'use client'

import type { StatsBlock as StatsBlockType } from '@/payload-types'
import { Counter } from '@/components/ui/counter'
import { cn } from '@/utilities/ui'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

type StatsBlockProps = Omit<StatsBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

export function StatsBlock({ items, className }: Readonly<StatsBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="default"
      logoMobile="full"
      logoDesktop="full"
      className={cn(
        'relative overflow-hidden bg-[linear-gradient(315deg,var(--brand-dark-blue)_31.39%,var(--secondary)_80.12%)] py-16 lg:h-90 lg:py-20',
        className,
      )}
    >
      {/* Decorative Circles */}
      <div
        className="absolute -bottom-45 -left-45 size-94 rounded-full border-2 border-dashed border-black/20 lg:-bottom-62 lg:-left-62 lg:size-125"
        aria-hidden="true"
      />
      <div
        className="absolute -top-45 -right-45 size-94 rounded-full border-2 border-dashed border-black/20 lg:-top-62 lg:-right-62 lg:size-125"
        aria-hidden="true"
      />

      {/* Stats Container */}
      <ul className="relative z-10 container flex h-full flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-5 before:h-16 before:w-0.5 before:shrink-0 before:bg-accent before:lg:h-24"
          >
            {/* Stat Content */}
            <div className="flex flex-col">
              <p className="typography-heading font-bold text-secondary-foreground">
                {item.prefix}
                <Counter value={item.stat} />
                {item.suffix}
              </p>
              <p className="typography-body text-secondary-foreground">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </HeaderThemeSetter>
  )
}
