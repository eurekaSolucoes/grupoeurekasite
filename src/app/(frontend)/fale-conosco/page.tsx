import type { Metadata } from 'next'

import { PageBanner } from '@/components/PageBanner'

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
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageBanner
        title={contactData.hero.title}
        backgroundImage={contactData.hero.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Fale conosco' }]}
      />

      {/* Debug: Dados da página */}
      <div className="container px-5 py-10 lg:px-8">
        <h2 className="mb-4 text-xl font-bold">Dados da Página (Debug)</h2>
        <pre className="overflow-auto rounded-lg bg-gray-100 p-8 text-sm">
          {JSON.stringify(contactData, null, 2)}
        </pre>
      </div>
    </main>
  )
}
