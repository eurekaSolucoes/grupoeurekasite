'use client'

import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Tipos de campos suportados
const SUPPORTED_FIELD_TYPES = ['text', 'email', 'number', 'textarea', 'select'] as const

// Props do componente
export interface DynamicFormSectionProps {
  title?: string
  fields: FormFieldBlock[]
  submitLabel?: string
  showPrivacyText?: boolean
  privacyPolicyUrl?: string
  termsUrl?: string
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>
  className?: string
}

// Gera valores padrão para o formulário
function generateDefaultValues(fields: FormFieldBlock[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {}

  for (const field of fields) {
    if (field.blockType === 'number') {
      defaults[field.name] = undefined
    } else {
      defaults[field.name] = ''
    }
  }

  return defaults
}

// Converte width (porcentagem) para classe Tailwind
function getWidthClass(width?: number | string): string {
  const w = Number(width) || 100
  if (w >= 100) return 'col-span-full'
  if (w >= 50) return 'col-span-2'
  return 'col-span-1'
}

export function DynamicFormSection({
  title,
  fields,
  submitLabel = 'Enviar',
  showPrivacyText = true,
  privacyPolicyUrl = '/politica-de-privacidade',
  termsUrl = '/termos-de-uso',
  onSubmit: onSubmitProp,
  className,
}: Readonly<DynamicFormSectionProps>) {
  // Filtra apenas os tipos suportados (não modifica o array original)
  const supportedFields = fields.filter((field) =>
    SUPPORTED_FIELD_TYPES.includes(field.blockType as (typeof SUPPORTED_FIELD_TYPES)[number]),
  )

  const form = useForm({
    defaultValues: generateDefaultValues(supportedFields),
  })

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (onSubmitProp) {
      await onSubmitProp(data)
    } else {
      console.log('Form data:', data)
    }
  }

  const renderField = (fieldConfig: FormFieldBlock) => {
    const { blockType, name, label, width, required } = fieldConfig
    const widthClass = getWidthClass(width)
    const placeholder = label || name

    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        rules={{ required: required ? 'Campo obrigatório' : false }}
        render={({ field }) => (
          <FormItem className={widthClass}>
            <FormControl>
              {blockType === 'select' && 'options' in fieldConfig ? (
                <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fieldConfig.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : blockType === 'textarea' ? (
                <Textarea placeholder={placeholder} {...field} value={field.value as string} />
              ) : (
                <Input
                  type={blockType === 'number' ? 'number' : blockType === 'email' ? 'email' : 'text'}
                  placeholder={placeholder}
                  {...field}
                  value={field.value as string | number}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <section className={className}>
      {title && <h2 className="typography-subheading mb-5 font-bold text-secondary">{title}</h2>}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-y-5"
        >
          {supportedFields.map(renderField)}

          <div className="col-span-full mt-2.5 flex flex-col gap-5.25 lg:mt-0 lg:flex-row lg:justify-between lg:gap-6">
            {showPrivacyText && (
              <p className="typography-caption opacity-50">
                *Ao clicar em enviar, você concorda com a{' '}
                <Link href={privacyPolicyUrl} className="underline">
                  Política de Privacidade
                </Link>{' '}
                e{' '}
                <Link href={termsUrl} className="underline">
                  Termos de Uso
                </Link>{' '}
                do Grupo Eureka
              </p>
            )}

            <Button
              type="submit"
              hasIcon
              variant="secondary"
              className="self-end lg:self-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Enviando...' : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
