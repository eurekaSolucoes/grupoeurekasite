'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface FilterToggleGroupProps {
  title: string
  options: Array<{ _id: string; label: string }>
  value: string[]
  onValueChange: (value: string[]) => void
}

export function FilterToggleGroup({
  title,
  options,
  value,
  onValueChange,
}: Readonly<FilterToggleGroupProps>) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="typography-body text-foreground">{title}</p>
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={onValueChange}
        className="flex flex-wrap justify-start gap-2"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option._id}
            value={option._id}
            className="h-auto rounded-lg border-0 px-2 py-1.5 typography-caption transition-all duration-300 data-[state=off]:bg-input data-[state=off]:text-foreground data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
