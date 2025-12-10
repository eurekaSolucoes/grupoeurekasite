import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { FormBlock } from '@/blocks/Form/Component'
import { PageBannerBlock } from '@/blocks/PageBannerBlock/Component'
import {
  IconInfoListBlock,
  type InfoItem,
} from '@/blocks/IconInfoListBlock/Component'
import { ContactFormBlock } from '@/blocks/Contact/ContactFormBlock/Component'
import { PressContactBlock } from '@/blocks/Contact/PressContactBlock/Component'
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { DynamicFormBlock } from '@/blocks/DynamicFormBlock/Component'

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

export default async function ContactPage() {
  // Buscar form do CMS para teste de comparação
  const payload = await getPayload({ config })
  const { docs: forms } = await payload.find({
    collection: 'forms',
    limit: 1,
  })
  const cmsForm = forms[0]

  return (
    <main className="min-h-screen">
      <PageBannerBlock
        title={contactData.hero.title}
        backgroundImage={contactData.hero.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Fale conosco' }]}
      />

      <SpacerBlock />

      <IconInfoListBlock items={contactData.contactInfo} />
      <SpacerBlock />

      <ContactFormBlock
        title={contactData.form.title}
        subjects={contactData.form.subjects}
        privacyText={contactData.form.privacyText}
        submitLabel={contactData.form.submitLabel}
      />
      <SpacerBlock size="lg" />

      {/* FormBlock do Payload (CMS) */}
      {cmsForm && (
        <section className="container">
          <h2 className="typography-subheading mb-5 font-bold text-secondary">
            FormBlock do Payload (CMS)
          </h2>
          <FormBlock form={cmsForm} enableIntro={false} />
        </section>
      )}
      <SpacerBlock size="lg" />

      {cmsForm?.fields && (
        <DynamicFormBlock
          title="DynamicFormBlock (CMS direto)"
          fields={cmsForm.fields}
          submitLabel={cmsForm.submitButtonLabel || 'Enviar'}
          className="container"
          onSubmit={(data) => {
            console.log('Dados do formulário dinâmico:', data)
          }}
        />
      )}
      <SpacerBlock size="lg" />

      <PressContactBlock
        title={contactData.pressContact.title}
        contacts={contactData.pressContact.contacts}
      />
      <SpacerBlock size="lg" />
    </main>
  )
}
