import type { Metadata } from 'next'

import { PageBannerBlock } from '@/blocks/PageBannerBlock/Component'
import { TextImageStackBlock } from '@/blocks/TextImageStackBlock/Component'
import { StatsBlock } from '@/blocks/StatsBlock/Component'
import { CardListBlock } from '@/blocks/CardListBlock/Component'
import { SocialCTABlock } from '@/blocks/SocialCTABlock/Component'
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'

export const metadata: Metadata = {
  title: 'Resultados | Grupo Eureka',
  description:
    'Conheça os resultados do Grupo Eureka. Transformando a educação pública brasileira com projetos integrados e tecnologia com propósito.',
}

// Mock data (prepared for future CMS integration)
const resultsData = {
  banner: {
    title: 'Resultados',
    backgroundImage: '/mock/results-page-banner.png',
  },
  aboutSection: {
    headingText:
      'Para além da melhora do aprendizado formal em sala de aula, educação é também <strong>experimentação do sucesso</strong>.',
    mainImage: { src: '/mock/results-intro-1.png', alt: 'Alunos em atividade' },
    bodyText:
      'Nosso trabalho possibilita <strong>valorização do professor</strong>, <strong>protagonismo do estudante</strong>, <strong>renovação das práticas pedagógicas</strong> com o uso de tecnologia com sentido no dia a dia e <strong>engajamento das comunidades escolares</strong> em diferentes mídias e nas redes sociais.',
    overlappingImages: [
      { src: '/mock/results-impact-1.png', alt: 'Professores em formação' },
      { src: '/mock/results-impact-2.png', alt: 'Estudantes protagonistas' },
    ],
  },
  stats: [
    { stat: 18, label: 'estados parceiros' },
    { stat: 103, label: 'municípios parceiros' },
    { stat: 130, suffix: 'mil', label: 'usuários ativos na plataforma' },
    { stat: 45, suffix: 'mil', label: 'professores alcançados' },
  ],
  projectsSection: {
    title: 'Nossos projetos',
    introText:
      'Muitas editoras vendem livros. Nós desenvolvemos <strong>projetos integrados</strong> que <strong>fortalecem a prática docente</strong> e <strong>ampliam as possibilidades</strong> de aprendizagem nas redes públicas.',
    subtitleAlign: 'end',

    cards: [
      {
        image: '/mock/project-rj.png',
        title: 'Rio de Janeiro',
        description: 'Apoio técnico com intencionalidade pedagógica para a SEEDUC-RJ',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/project-nova-lima.png',
        title: 'Nova Lima',
        description: 'Ação com professores da rede municipal de Nova Lima-MG',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/project-tocantins.png',
        title: 'Tocantins',
        description: 'Jornada com professores da EJA sobre a coleção e a Plataforma Eureka Digital',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/project-ceara.png',
        title: 'Ceará',
        description:
          'Trabalhando sustentabilidade de forma prática com educadores do Consórcio Público de Manejo dos Resíduos Sólidos Crateús-2, CE.',
        link: { type: 'custom' as const, url: '#' },
      },
    ],
  },
  mediaSection: {
    title: 'Educação na Mídia',
    subtitle: 'Vitrine das nossas repercussões na grande mídia',
    cards: [
      {
        image: '/mock/media-1.png',
        description:
          'O GLOBO lança ferramenta de IA que corrige redação do Enem, apontando erros e acertos nas 5 competências',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/media-2.png',
        description: 'IA na educação: desafios e oportunidades - O Assunto #1577',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/media-3.png',
        description:
          'Sarau literário da rede estadual de ensino é realizado no jardim do Liceu, em Campos (RJ)',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/media-4.png',
        description: 'Rede estadual do RJ alcança 20 mil professores em plataforma com IA',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/media-5.png',
        description:
          'Estudantes da região de Petrópolis terão textos publicados pelo Projeto Alunos Autores',
        link: { type: 'custom' as const, url: '#' },
      },
      {
        image: '/mock/media-6.png',
        description:
          'Estudantes da região de Petrópolis terão textos publicados pelo Projeto Alunos Autores',
        link: { type: 'custom' as const, url: '#' },
      },
    ],
  },
  socialCTA: {
    text: 'Acompanhe a <strong>Eureka nas redes sociais</strong> e mergulhe em um universo de projetos, ideias e transformação!',
    backgroundImage: '/mock/social-cta-bg.png',
  },
}

export default function ResultadosPage() {
  return (
    <main className="min-h-screen">
      {/* Banner */}
      <PageBannerBlock
        title={resultsData.banner.title}
        backgroundImage={resultsData.banner.backgroundImage}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resultados' }]}
      />
      <SpacerBlock />

      {/* About Section - Text and images stack */}
      <TextImageStackBlock
        headingText={resultsData.aboutSection.headingText}
        mainImage={resultsData.aboutSection.mainImage}
        bodyText={resultsData.aboutSection.bodyText}
        overlappingImages={resultsData.aboutSection.overlappingImages}
      />
      <SpacerBlock size="lg" />

      {/* Stats Block */}
      <StatsBlock items={resultsData.stats} />
      <SpacerBlock size="lg" />

      {/* Projects Cards */}
      <CardListBlock
        items={resultsData.projectsSection.cards}
        title={resultsData.projectsSection.title}
        subtitle={resultsData.projectsSection.introText}
        columns={2}
      />
      <SpacerBlock size="lg" />

      {/* Media Section */}
      <CardListBlock
        title={resultsData.mediaSection.title}
        subtitle={resultsData.mediaSection.subtitle}
        items={resultsData.mediaSection.cards}
        columns={3}
      />
      <SpacerBlock size="lg" />

      {/* Social CTA Block */}
      <SocialCTABlock
        text={resultsData.socialCTA.text}
        backgroundImage={resultsData.socialCTA.backgroundImage}
      />
    </main>
  )
}
