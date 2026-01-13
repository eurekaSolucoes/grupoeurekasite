import type { IconInfoListBlock as IconInfoListBlockType } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'
import { cn } from '@/utilities/ui'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

type IconInfoListBlockProps = Omit<IconInfoListBlockType, 'id' | 'blockName' | 'blockType'> & {
  className?: string
}

export type InfoItem = IconInfoListBlockType['items'][number]

export function IconInfoListBlock({ title, items, className }: Readonly<IconInfoListBlockProps>) {
  return (
    <HeaderThemeSetter
      as="section"
      theme="secondary"
      logoMobile="icon-blue"
      logoDesktop="icon-blue"
      className={cn('container', className)}
    >
      {title && (
        <h2 className="mb-5 typography-subheading font-bold text-secondary">{title}</h2>
      )}
      <dl className="flex flex-wrap items-center gap-5 lg:gap-16">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col">
            <dt className="flex items-center gap-3 typography-body font-bold text-secondary">
              <DynamicIcon
                name={item.icon as IconName}
                className="size-5 shrink-0 text-accent lg:size-6"
                strokeWidth={1.67}
                aria-hidden="true"
              />
              {item.label}
            </dt>
            <dd className="whitespace-pre-line">
              {item.href ? (
                <a href={item.href} className="underline-on-hover">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </HeaderThemeSetter>
  )
}
