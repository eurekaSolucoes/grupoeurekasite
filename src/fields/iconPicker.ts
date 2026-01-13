import type { TextField } from 'payload'

type IconPickerFieldOptions = {
  name?: string
  label?: string
  required?: boolean
}

export const iconPickerField = ({
  name = 'icon',
  label = 'Ícone',
  required = false,
}: IconPickerFieldOptions = {}): TextField => ({
  name,
  type: 'text',
  label,
  required,
  admin: {
    description: 'Selecione um ícone da biblioteca Lucide',
    components: {
      Field: '@/fields/IconPickerField/Component#IconPickerFieldComponent',
    },
  },
})
