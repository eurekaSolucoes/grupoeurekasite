'use client'

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { FilterCheckbox } from './FilterCheckbox'

interface FilterOption {
  _id: string
  label: string
}

interface FilterAccordionItemProps {
  value: string
  title: string
  options: FilterOption[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
}

export function FilterAccordionItem({
  value,
  title,
  options,
  selected,
  onSelectionChange,
}: Readonly<FilterAccordionItemProps>) {
  const selectedCount = selected.length

  const handleToggle = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selected, id])
      return
    }
    onSelectionChange(selected.filter((s) => s !== id))
  }

  return (
    <AccordionItem value={value} className="rounded-xl border-0 bg-input">
      <AccordionTrigger
        className={cn(
          'flex flex-1 cursor-pointer items-center justify-between px-5 py-4 text-left transition-all hover:no-underline',
          '[&>svg]:size-5 [&>svg]:text-muted-foreground',
        )}
      >
        <div className="mr-3 flex w-full items-center justify-between gap-2.5">
          <span className="typography-body font-normal">{title}</span>
          {selectedCount > 0 && (
            <span className="flex size-5.5 items-center justify-center rounded bg-secondary typography-caption font-bold text-secondary-foreground">
              {selectedCount}
            </span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5 pt-0 pb-4">
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <FilterCheckbox
              key={opt._id}
              id={`${value}-${opt._id}`}
              label={opt.label}
              checked={selected.includes(opt._id)}
              onCheckedChange={(checked) => handleToggle(opt._id, checked)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
