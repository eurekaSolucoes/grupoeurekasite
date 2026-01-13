'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FilterCheckboxProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: Readonly<FilterCheckboxProps>) {
  return (
    <div className="flex items-baseline gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="size-5 border-input bg-background data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
      />
      <Label htmlFor={id} className="cursor-pointer text-base/relaxed">
        {label}
      </Label>
    </div>
  )
}
