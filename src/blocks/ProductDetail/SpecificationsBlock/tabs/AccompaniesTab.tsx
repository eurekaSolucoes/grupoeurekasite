'use client'

import type { ProductDetail } from '@/services/products'
import { ACCOMPANIES_CONFIG } from '../config'

interface AccompaniesTabProps {
  product: ProductDetail
}

export function AccompaniesTab({ product }: AccompaniesTabProps) {
  const activeFeatures = ACCOMPANIES_CONFIG.filter((config) => {
    const value = product[config.key]
    return value === true
  })

  if (activeFeatures.length === 0) {
    return <p className="text-muted-foreground">Nenhum recurso adicional disponível.</p>
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-9">
      {/* Header com descrição fixa */}
      <div className="flex flex-col gap-3 lg:gap-4">
        <h3 className="hidden text-xl leading-relaxed font-bold text-foreground lg:block">
          Acompanha essa obra
        </h3>
        <p className="text-sm leading-relaxed text-foreground lg:text-lg">
          Adquira uma das nossas obras e tenha acesso a uma solução completa de educação que irá
          aprimorar o seu conhecimento com uma série de vantagens. Conte com uma experiência de
          aprendizagem enriquecedora e melhore suas habilidades com o nosso material de qualidade.
        </p>
        <div className="text-xs text-foreground lg:text-sm">
          <p>
            *Possibilidade de transferência da tecnologia em contratos com duração de 4 anos ou
            mais.
          </p>
          <p>*Itens inclusos de acordo com a negociação comercial.</p>
        </div>
      </div>

      {/* Lista de acompanhamentos */}
      <ul className="contents">
        {activeFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <li
              key={feature.key}
              className="flex flex-col gap-3 border-t border-muted-foreground/30 pt-5 lg:flex-row lg:gap-4 lg:pt-0 lg:border-t-0"
            >
              {/* Desktop: Divisor antes do item */}
              <div className="mb-0 hidden h-px w-full bg-muted-foreground/30 lg:mb-9 lg:block" />

              {/* Ícone */}
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary lg:size-10">
                <Icon className="size-5 text-white lg:size-6" aria-hidden="true" />
              </div>

              {/* Título e descrição */}
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-foreground lg:text-lg">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-foreground lg:text-base lg:leading-normal">
                  {feature.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
