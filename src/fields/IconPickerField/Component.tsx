'use client'

import { useField, FieldLabel } from '@payloadcms/ui'
import { IconPicker, type IconName } from '@/components/ui/icon-picker'
import type { TextFieldClientProps } from 'payload'

export function IconPickerFieldComponent({ field, path }: TextFieldClientProps) {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} required={field.required} path={path} />
      <IconPicker
        theme="dark"
        value={value as IconName}
        onValueChange={setValue}
        searchPlaceholder="Buscar ícone..."
        triggerPlaceholder="Selecione um ícone"
      />
    </div>
  )
}
