import type { Metadata } from 'next'

import { PageBanner } from '@/components/PageBanner'
import { IntroSection } from '@/components/Sections/About/IntroSection'
import { VideoSection } from '@/components/Sections/About/VideoSection'

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
  }
  missionBlocks: Array<{
    layout: 'text-left' | 'text-right'
    headline?: string
    paragraph?: string
    images?: Array<{
      src: string
      alt: string
      size: 'small' | 'medium' | 'large'
    }>
  }>
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
    title: 'Por que <strong class="font-bold text-[#f37700]">Eureka?</strong>',
  },
  missionBlocks: [
    {
      layout: 'text-right',
      headline:
        'O Grupo Eureka acredita na <strong class="font-bold text-[#f37700]">educação pública brasileira</strong> e <strong class="font-bold text-[#f37700]">colabora para transformar</strong> o currículo em prática viva nas salas de aula.',
      paragraph:
        'Atuamos lado a lado com redes públicas de ensino, escolas e professores, traduzindo políticas curriculares em <strong class="font-bold text-[#f37700]">experiências concretas de aprendizagem</strong>, sempre com o <strong class="font-bold text-[#f37700]">professor no centro</strong> de cada iniciativa.',
      images: [
        { src: '/mock/sede-1.png', alt: 'Sede Grupo Eureka', size: 'large' },
        { src: '/mock/sede-2.png', alt: 'Equipe Grupo Eureka', size: 'medium' },
      ],
    },
    {
      layout: 'text-left',
      headline:
        'Personalizamos materiais paradidáticos, tecnologias educacionais, encontros pedagógicos e eventos em que o estudante é o protagonista. Tudo a partir do <strong>contexto local</strong> de cada parceiro.',
      paragraph:
        'O Grupo Eureka constrói parcerias com propósito público, sustentadas por evidências pedagógicas, inovação responsável e compromisso com a equidade educacional.',
      images: [
        { src: '/mock/sede-3.png', alt: 'Atividades educacionais', size: 'medium' },
        { src: '/mock/sede-4.png', alt: 'Encontro pedagógico', size: 'small' },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen space-y-10 lg:space-y-20">
      <PageBanner
        title={aboutData.banner.title}
        backgroundImage={aboutData.banner.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sobre' }]}
      />

      {/* Seção Intro */}
      <IntroSection headline={aboutData.intro.headline} paragraphs={aboutData.intro.paragraphs} />

      {/* Seção Vídeo */}
      <VideoSection
        backgroundImage={aboutData.videoSection.backgroundImage}
        headline={aboutData.videoSection.headline}
        buttonLabel={aboutData.videoSection.buttonLabel}
        videoUrl={aboutData.videoSection.videoUrl}
      />

      {/* Seção Por que Eureka? - será implementada na Fase 4 */}

      {/* Blocos de Missão - serão implementados na Fase 5 */}
    </main>
  )
}
