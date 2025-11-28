import { MapPin } from 'lucide-react'

interface PressContact {
  label: string
  name: string
  email: string
}

interface PressContactSectionProps {
  title: string
  contacts: PressContact[]
}

export function PressContactSection({ title, contacts }: Readonly<PressContactSectionProps>) {
  return (
    <section className="container flex flex-col gap-5">
      <h2 className="typography-subheading font-bold text-secondary">{title}</h2>

      <dl className="flex flex-wrap items-start gap-5 lg:gap-16">
        {contacts.map((contact) => (
          <div key={contact.label} className="flex flex-col gap-2">
            <dt className="flex items-center gap-3 typography-body font-bold text-secondary">
              <MapPin
                className="size-5 shrink-0 text-accent lg:size-6"
                strokeWidth={1.67}
                aria-hidden="true"
              />
              {contact.label}
            </dt>
            <dd className="whitespace-pre-line">
              {contact.name}
              <br />
              <a href={`mailto:${contact.email}`} className="underline-on-hover">
                {contact.email}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
