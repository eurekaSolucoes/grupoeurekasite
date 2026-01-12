import { GraduationCap, MonitorSmartphone, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProductDetail } from '@/services/products'

export type TabKey = 'specs' | 'justification' | 'prices' | 'accompanies' | 'collection'

export interface TabConfig {
  key: TabKey
  label: string
  hasContent: (product: ProductDetail) => boolean
}

export const TABS: TabConfig[] = [
  {
    key: 'specs',
    label: 'Especificações técnicas',
    hasContent: (p) => {
      if (p.products && p.products.length > 0) {
        return p.products.some(
          (prod) => prod.technicalSpecifications && prod.technicalSpecifications.length > 0,
        )
      }
      return !!(p.technicalSpecifications && p.technicalSpecifications.length > 0)
    },
  },
  {
    key: 'justification',
    label: 'Justificativa',
    hasContent: (p) => !!(p.justifications && p.justifications.length > 0),
  },
  {
    key: 'prices',
    label: 'Valores unitários',
    hasContent: (p) => {
      if (p.products && p.products.length > 0) {
        return p.products.some((prod) => prod.unitPrices && prod.unitPrices.length > 0)
      }
      return !!(p.unitPrices && p.unitPrices.length > 0)
    },
  },
  {
    key: 'accompanies',
    label: 'Acompanha essa obra',
    hasContent: (p) =>
      p.hasTraining ||
      p.hasDigitalPlatform ||
      p.hasLiteraverse ||
      p.hasMaterialCustomization ||
      p.hasImplementation,
  },
  {
    key: 'collection',
    label: 'Coleção',
    hasContent: (p) => !!(p.products && p.products.length > 0),
  },
]

export const SPEC_COLUMNS = ['Título', 'ISBN', 'Tamanho', 'Páginas', 'Acabamento', 'Cor'] as const

export interface AccompaniesFeature {
  key: keyof ProductDetail
  title: string
  description: string
  icon: LucideIcon
}

export const ACCOMPANIES_CONFIG: AccompaniesFeature[] = [
  {
    key: 'hasTraining',
    title: 'Encontros Pedagógicos',
    description:
      'Os encontros pedagógicos, presenciais ou online, são realizados com foco no desenvolvimento profissional e formação continuada dos profissionais da educação. O conteúdo programático é desenvolvido em conjunto com os parceiros das redes de ensino para atender às suas necessidades pedagógicas e potencializar o uso de nossas soluções educacionais.',
    icon: GraduationCap,
  },
  {
    key: 'hasDigitalPlatform',
    title: 'Plataforma digital',
    description:
      'A Plataforma tem diversas funcionalidades que visam facilitar o processo de ensino e aprendizagem, proporcionando uma experiência enriquecedora e eficaz para estudantes, professores(as) e instituições. Possui gestão de conteúdo, soluções alinhadas à BNCC, sequências didáticas, planos de aula, lições, avaliação diagnóstica, pílulas de conteúdo, podcast e ProfessorIA (recurso de Inteligência Artificial). A Plataforma Digital amplia o repertório dos professores e estudantes, podendo ser explorada como uma extensão do livro físico.',
    icon: MonitorSmartphone,
  },
  {
    key: 'hasImplementation',
    title: 'Implementação e engajamento',
    description:
      'O processo de implementação envolve a gestão, planejamento, execução e monitoramento de iniciativas que contribuem para o engajamento da comunidade escolar. Desta forma, é possível contribuir para que todas as etapas do processo educativo sejam executadas de forma coordenada, buscando um resultado positivo e sustentável.',
    icon: Rocket,
  },
]
