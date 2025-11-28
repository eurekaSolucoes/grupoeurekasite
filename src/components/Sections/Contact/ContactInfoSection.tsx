import { MapPin, Clock, Mail, Phone, type LucideIcon } from 'lucide-react'

interface ContactInfoData {
  address: { label: string; value: string }
  hours: { label: string; value: string }
  email: { label: string; value: string }
  phone: { label: string; value: string }
}

interface ContactInfoSectionProps {
  data: ContactInfoData
}

interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

export function ContactInfoSection({ data }: Readonly<ContactInfoSectionProps>) {
  const items: ContactItem[] = [
    { icon: MapPin, ...data.address },
    { icon: Clock, ...data.hours },
    { icon: Mail, ...data.email, href: `mailto:${data.email.value}` },
    { icon: Phone, ...data.phone, href: `tel:${data.phone.value.replaceAll(/\D/g, '')}` },
  ]

  return (
    <dl className="flex flex-wrap items-center gap-5 lg:gap-16">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <dt className="flex items-center gap-3 typography-body font-bold text-secondary">
            <item.icon
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
