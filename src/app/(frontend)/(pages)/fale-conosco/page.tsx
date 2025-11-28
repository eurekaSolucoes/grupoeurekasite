import type { Metadata } from 'next'
import { icons } from 'lucide-react'

import { PageBannerSection } from '@/components/Sections/Shared/PageBannerSection'
import {
  IconInfoListSection,
  type InfoItem,
} from '@/components/Sections/Shared/IconInfoListSection'
import { ContactFormSection } from '@/components/Sections/Contact/ContactFormSection'
import { PressContactSection } from '@/components/Sections/Contact/PressContactSection'
import { SpacerSection } from '@/components/Sections/Shared/SpacerSection'

export const metadata: Metadata = {
  title: 'Fale Conosco | Grupo Eureka',
  description: 'Entre em contato com o Grupo Eureka',
}

// Interface de dados (preparada para CMS)
interface ContactPageData {
  hero: {
    title: string
    backgroundImage: string
  }
  contactInfo: InfoItem[]
  form: {
    title: string
    subjects: string[]
    privacyText: string
    submitLabel: string
  }
  pressContact: {
    title: string
    contacts: { label: string; name: string; email: string }[]
  }
}

// Dados mockados (futuramente virão do CMS)
const contactData: ContactPageData = {
  hero: {
    title: 'Fale conosco',
    backgroundImage: '/mock/contact-page-banner.png',
  },
  contactInfo: [
    {
      icon: 'map-pin',
      label: 'Endereço',
      value: 'Av. Brasil 2241, Jardim América,\nSão Paulo/SP',
    },
    {
      icon: 'clock',
      label: 'Horário de atendimento',
      value: 'De segunda a sexta-feira, das 9h às 17h\n(Horário de Brasília).',
    },
    {
      icon: 'mail',
      label: 'E-mail',
      value: 'comercial@grupoeureka.com.br',
      href: 'mailto:comercial@grupoeureka.com.br',
    },
    {
      icon: 'phone',
      label: 'Telefone',
      value: '(11) 5549-1702',
      href: 'tel:1155491702',
    },
  ],
  form: {
    title: 'Preencha o formulário',
    subjects: ['Dúvidas sobre produtos', 'Orçamento', 'Suporte técnico', 'Parcerias', 'Outros'],
    privacyText:
      '*Ao clicar em enviar, você concorda com a Política de Privacidade e Termos de Uso do Grupo Eureka',
    submitLabel: 'Enviar',
  },
  pressContact: {
    title: 'Assessoria de comunicação - Tamer Comunicação',
    contacts: [
      {
        label: 'Assessora de comunicação',
        name: 'Ana Claudia Bellintane - Tamer Comunicação',
        email: 'anaclaudia@tamer.com.br',
      },
      {
        label: 'Assessora de imprensa',
        name: 'Iris Bertoncini - Tamer Comunicação',
        email: 'iris.bertoncini@tamer.com.br',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageBannerSection
        title={contactData.hero.title}
        backgroundImage={contactData.hero.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Fale conosco' }]}
      />

      <SpacerSection />

      <IconInfoListSection items={contactData.contactInfo} />
      <SpacerSection />

      <ContactFormSection
        title={contactData.form.title}
        subjects={contactData.form.subjects}
        privacyText={contactData.form.privacyText}
        submitLabel={contactData.form.submitLabel}
      />
      <SpacerSection size="lg" />

      <PressContactSection
        title={contactData.pressContact.title}
        contacts={contactData.pressContact.contacts}
      />
    </main>
  )
}
