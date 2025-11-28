import { type IconName, DynamicIcon } from 'lucide-react/dynamic'

import { cn } from '@/utilities/ui'

export interface InfoItem {
  icon: IconName
  label: string
  value: string
  href?: string
}

interface IconInfoListSectionProps {
  items: InfoItem[]
  className?: string
}

export function IconInfoListSection({ items, className }: Readonly<IconInfoListSectionProps>) {
  return (
    <dl className={cn('container flex flex-wrap items-center gap-5 lg:gap-16', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <dt className="flex items-center gap-3 typography-body font-bold text-secondary">
            <DynamicIcon
              name={item.icon}
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
  )
}
