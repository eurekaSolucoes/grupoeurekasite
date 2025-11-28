import type { Metadata } from 'next'

import { PageBannerSection } from '@/components/Sections/Shared/PageBannerSection'
import { AlternatingBlocksSection } from '@/components/Sections/Shared/AlternatingBlocksSection'
import { IntroSection } from '@/components/Sections/About/IntroSection'
import { VideoSection } from '@/components/Sections/About/VideoSection'
import { SpacerSection } from '@/components/Sections/Shared/SpacerSection'

export const metadata: Metadata = {
  title: 'Sobre | Grupo Eureka',
  description:
    'Conheça o Grupo Eureka. Somos professores com ideias guiadas por propósito e colaboração, transformando a educação pública brasileira.',
}

// Interface de dados (preparada para CMS)
interface AboutPageData {
  banner: {
    title: string
    backgroundImage: string
  }
  intro: {
    headline: string
    paragraphs: string[]
  }
  videoSection: {
    backgroundImage: string
    headline: string
    buttonLabel: string
    videoUrl?: string
  }
  whyEureka: {
    title: string
    subtitle: string
    showArrow: boolean
    items: Array<{
      primaryText?: string
      secondaryText?: string
      images?: Array<{
        src: string
        alt: string
      }>
    }>
  }
}

// Dados mockados completos (preparados para futura migração ao CMS)
const aboutData: AboutPageData = {
  banner: {
    title: 'Sobre',
    backgroundImage: '/mock/about-page-banner.png',
  },
  intro: {
    headline: 'Somos <strong>professores</strong> com ideias guiadas por propósito e colaboração.',
    paragraphs: [
      'Valorizamos o respeito, a pluralidade e a criatividade, que caminham juntos da flexibilidade e da agilidade.',
      'Acreditamos no <strong>compromisso que gera resultados</strong>. Cada conversa, esforço e mudança de rota fazem parte da construção de um futuro melhor para milhões de alunos e professores. Desejamos que cada entrega possa <strong class="font-bold text-[#f37700]">inspirar e transformar</strong>.',
    ],
  },
  videoSection: {
    backgroundImage: '/mock/about-page-video-cover.png',
    headline: 'Conheça como surgiu o <strong>Grupo Eureka</strong>!',
    buttonLabel: 'Assistir vídeo',
    videoUrl: 'https://www.youtube.com/watch?v=example',
  },
  whyEureka: {
    title: 'Eureka?',
    subtitle: 'Por que',
    showArrow: true,
    items: [
      {
        primaryText:
          'O Grupo Eureka acredita na <strong>educação pública brasileira</strong> e <strong>colabora para transformar</strong> o currículo em prática viva nas salas de aula.',
        secondaryText:
          'Atuamos lado a lado com redes públicas de ensino, escolas e professores, traduzindo políticas curriculares em <strong>experiências concretas de aprendizagem</strong>, sempre com o <strong>professor no centro</strong> de cada iniciativa.',
        images: [
          { src: '/mock/why-eureka-1.png', alt: 'Equipe Grupo Eureka em reunião' },
          { src: '/mock/why-eureka-2.png', alt: 'Professores em atividade' },
        ],
      },
      {
        primaryText:
          'Personalizamos materiais paradidáticos, tecnologias educacionais, encontros pedagógicos e eventos em que o estudante é o protagonista. Tudo a partir do <strong>contexto local</strong> de cada parceiro.',
        secondaryText:
          'O Grupo Eureka constrói parcerias com propósito público, sustentadas por evidências pedagógicas, inovação responsável e compromisso com a equidade educacional.',
        images: [
          { src: '/mock/why-eureka-3.png', alt: 'Atividades educacionais em sala' },
          { src: '/mock/why-eureka-4.png', alt: 'Encontro pedagógico com professores' },
        ],
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageBannerSection
        title={aboutData.banner.title}
        backgroundImage={aboutData.banner.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sobre' }]}
      />
      <SpacerSection />

      {/* Seção Intro */}
      <IntroSection headline={aboutData.intro.headline} paragraphs={aboutData.intro.paragraphs} />
      <SpacerSection />

      {/* Seção Vídeo */}
      <VideoSection
        backgroundImage={aboutData.videoSection.backgroundImage}
        headline={aboutData.videoSection.headline}
        buttonLabel={aboutData.videoSection.buttonLabel}
        videoUrl={aboutData.videoSection.videoUrl}
      />
      <SpacerSection size="lg" />

      {/* Seção Por que Eureka? */}
      <AlternatingBlocksSection
        title={aboutData.whyEureka.title}
        subtitle={aboutData.whyEureka.subtitle}
        showArrow={aboutData.whyEureka.showArrow}
        items={aboutData.whyEureka.items}
      />
    </main>
  )
}
