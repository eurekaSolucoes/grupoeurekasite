import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="email"
        placeholder={label}
        className="h-13 w-full rounded-xl border-0  px-5 py-4 placeholder:text-foreground placeholder:opacity-50"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
