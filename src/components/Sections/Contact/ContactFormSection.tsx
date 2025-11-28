'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().min(1, 'Campo obrigatório').email('E-mail inválido'),
  city: z.string().min(1, 'Campo obrigatório'),
  state: z.string().min(1, 'Campo obrigatório'),
  subject: z.string().min(1, 'Campo obrigatório'),
  message: z.string().min(1, 'Campo obrigatório'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormSectionProps {
  title: string
  subjects: string[]
  privacyText: string
  submitLabel: string
}

export function ContactFormSection({
  title,
  subjects,
  submitLabel,
}: Readonly<ContactFormSectionProps>) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      state: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data)
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="typography-subheading font-bold text-secondary">{title}</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-y-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormControl>
                  <Input type="email" placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="col-span-full lg:col-span-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assunto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormControl>
                  <Textarea placeholder="Mensagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full mt-2.5 flex flex-col gap-5.25 lg:mt-0 lg:flex-row lg:justify-between lg:gap-6">
            <p className="typography-caption opacity-50">
              *Ao clicar em enviar, você concorda com a{' '}
              <Link href="/politica-de-privacidade" className="underline">
                Política de Privacidade
              </Link>{' '}
              e{' '}
              <Link href="/termos-de-uso" className="underline">
                Termos de Uso
              </Link>{' '}
              do Grupo Eureka
            </p>

            <Button hasIcon variant="secondary" className="self-end lg:self-auto">
              {submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
