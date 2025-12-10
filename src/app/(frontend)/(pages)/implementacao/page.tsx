import type { Metadata } from 'next'

import { PageBannerSection } from '@/components/Sections/Shared/PageBannerSection'
import { SpacerSection } from '@/components/Sections/Shared/SpacerSection'
import { OverlappingImageBlockSection } from '@/components/Sections/Shared/OverlappingImageBlockSection'
import { NumberedCardsSection } from '@/components/Sections/Shared/NumberedCardsSection'

export const metadata: Metadata = {
  title: 'Implementação | Grupo Eureka',
  description:
    'Conheça o processo de implementação do Grupo Eureka. Realizamos encontros com professores abordando materiais conectados com a realidade.',
}

// Interface de dados (preparada para CMS)
interface ProcessStep {
  number: number
  title: string
  description: string // Suporta HTML para <strong>
  image: {
    src: string
    alt: string
  }
}

interface ImplementationPageData {
  banner: {
    title: string
    backgroundImage: string
  }
  intro: {
    headline: string // Suporta HTML para <strong>
    description: string // Suporta HTML para <strong>
  }
  processSteps: ProcessStep[]
  overlappingBlock: {
    image: {
      src: string
      alt: string
    }
    title: string // Suporta HTML para <span> colorido
    paragraphs: string[]
  }
}

// Mock data (preparado para futura integração com CMS)
const implementationData: ImplementationPageData = {
  banner: {
    title: 'Implementação',
    backgroundImage: '/mock/implementation-page-banner.png',
  },
  intro: {
    headline:
      'Realizamos encontros com professores em que abordamos os <strong>materiais conectados com a realidade</strong> que eles apresentam.',
    description:
      '<strong>Criamos conjuntamente propostas que façam diferença na sala de aula.</strong> Trata-se de uma oportunidade para o professor experimentar a tecnologia, colaborando com o letramento digital das redes públicas de ensino.',
  },
  processSteps: [
    {
      number: 1,
      title: 'Acolhimento e escuta',
      description:
        'Tudo começa com um <strong>trabalho de escuta</strong>, para entender as <strong>necessidades de cada professor</strong>.',
      image: {
        src: '/mock/implementation-step-1.png',
        alt: 'Professores em reunião de acolhimento',
      },
    },
    {
      number: 2,
      title: 'Análise',
      description:
        'As demandas são, então, avaliadas para trazermos uma <strong>solução personalizada</strong> para cada rede de ensino.',
      image: {
        src: '/mock/implementation-step-2.png',
        alt: 'Equipe analisando demandas educacionais',
      },
    },
    {
      number: 3,
      title: 'Formação docente',
      description:
        'Nas jornadas pedagógicas, professores compartilham ideias, descobertas e práticas que <strong>aproximam os alunos da literatura</strong> e da <strong>produção de textos</strong> autorais.',
      image: {
        src: '/mock/implementation-step-3.png',
        alt: 'Professores em formação pedagógica',
      },
    },
    {
      number: 4,
      title: 'Ler e escrever',
      description:
        'Com uma mediação intencional, o professor <strong>desperta o interesse do estudante pela leitura</strong> e escrita, estimulando o <strong>pensamento crítico</strong> e a <strong>organização de ideias.</strong>',
      image: {
        src: '/mock/implementation-step-4.png',
        alt: 'Estudantes em atividade de leitura e escrita',
      },
    },
    {
      number: 5,
      title: 'Sarau Literário, Alunos Autores e ExpoTech',
      description:
        'Esse trabalho se materializa quando os alunos <strong>compartilham sua produção</strong> com toda a comunidade.',
      image: {
        src: '/mock/implementation-step-5.png',
        alt: 'Alunos apresentando no Sarau Literário',
      },
    },
    {
      number: 6,
      title: 'Legado Eureka',
      description:
        'Cada leitura, cada texto e cada encontro são essenciais na construção de um <strong>novo capítulo da educação brasileira</strong>.',
      image: {
        src: '/mock/implementation-step-6.png',
        alt: 'Celebração do legado educacional',
      },
    },
  ],
  overlappingBlock: {
    image: {
      src: '/mock/implementation-journey-cta.png',
      alt: 'Jornada de aprendizado do Grupo Eureka',
    },
    title: 'Cada jornada é também um aprendizado para o <span>Grupo Eureka</span>.',
    paragraphs: [
      'Crescemos ao escutar professores, alunos e gestores, porque acreditamos que é nesse diálogo que surgem projetos com propósito.',
      'Nosso trabalho acontece em parceria com as redes de ensino, mas cada escola tem sua própria história — e é respeitando essa identidade que construímos caminhos singulares, feitos de escuta, troca e criação coletiva.',
    ],
  },
}

export default function ImplementacaoPage() {
  return (
    <main className="min-h-screen">
      {/* Banner */}
      <PageBannerSection
        title={implementationData.banner.title}
        backgroundImage={implementationData.banner.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Implementação' }]}
      />
      <SpacerSection />

      {/* Seção de cards numerados com intro */}
      <NumberedCardsSection
        title={implementationData.intro.headline}
        subtitle={implementationData.intro.description}
        cards={implementationData.processSteps}
      />

      {/* <SpacerSection size="lg" /> */}

      {/* Overlapping Block Section */}
      <OverlappingImageBlockSection
        image={implementationData.overlappingBlock.image}
        title={implementationData.overlappingBlock.title}
        paragraphs={implementationData.overlappingBlock.paragraphs}
        variant="accent"
      />
    </main>
  )
}
