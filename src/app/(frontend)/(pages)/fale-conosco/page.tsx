import type { Metadata } from 'next'

import { PageBanner } from '@/components/PageBanner'
import { ContactInfoSection } from '@/components/Sections/Contact/ContactInfoSection'
import { ContactFormSection } from '@/components/Sections/Contact/ContactFormSection'
import { PressContactSection } from '@/components/Sections/Contact/PressContactSection'

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
  contactInfo: {
    address: { label: string; value: string }
    hours: { label: string; value: string }
    email: { label: string; value: string }
    phone: { label: string; value: string }
  }
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
  contactInfo: {
    address: {
      label: 'Endereço',
      value: 'Av. Brasil 2241, Jardim América,\nSão Paulo/SP',
    },
    hours: {
      label: 'Horário de atendimento',
      value: 'De segunda a sexta-feira, das 9h às 17h\n(Horário de Brasília).',
    },
    email: {
      label: 'E-mail',
      value: 'comercial@grupoeureka.com.br',
    },
    phone: {
      label: 'Telefone',
      value: '(11) 5549-1702',
    },
  },
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
    <main className="min-h-screen space-y-10 lg:space-y-20">
      <PageBanner
        title={contactData.hero.title}
        backgroundImage={contactData.hero.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Fale conosco' }]}
      />

      {/* Informações de Contato */}
      <section className="container" aria-labelledby="contact-info-heading">
        <h2 id="contact-info-heading" className="sr-only">
          Informações de contato
        </h2>
        <ContactInfoSection data={contactData.contactInfo} />
      </section>

      {/* Formulário de Contato */}
      <section className="container px-5 lg:px-8" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading" className="sr-only">
          Formulário de contato
        </h2>
        <ContactFormSection
          title={contactData.form.title}
          subjects={contactData.form.subjects}
          privacyText={contactData.form.privacyText}
          submitLabel={contactData.form.submitLabel}
        />
      </section>

      {/* Assessoria de Comunicação */}
      <section className="container px-5 lg:px-8" aria-labelledby="press-contact-heading">
        <h2 id="press-contact-heading" className="sr-only">
          Assessoria de comunicação
        </h2>
        <PressContactSection
          title={contactData.pressContact.title}
          contacts={contactData.pressContact.contacts}
        />
      </section>
    </main>
  )
}
