'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ScrollAnimatedWrapper,
  useScrollAnimation,
} from '@/components/animate/ScrollAnimatedWrapper'
import { motion } from 'motion/react'

interface AISectionProps {
  title?: string
  subtitle?: string
  description?: React.ReactNode
  buttonLabel?: string
  buttonHref?: string
  backgroundImage?: string
  avatarImage?: string
  avatarAlt?: string
}

const defaultDescription = (
  <>
    A <span className="font-bold">inteligência artificial</span> do Grupo Eureka e estou aqui para
    facilitar seu dia a dia na busca de novas ferramentas de ensino.{' '}
    <a href="#" title="Clique aqui para iniciarmos">
      Clique aqui para iniciarmos
    </a>{' '}
    essa jornada.
  </>
)

export function AISection({
  title = 'Olá, educador!',
  subtitle = 'Sou a Maria de Fátima.',
  description = defaultDescription,
  buttonLabel = 'Iniciar teste',
  buttonHref = '#',
  backgroundImage = '/assets/ai-section-background.png',
  avatarImage = '/assets/ai-maria-fatima.png',
  avatarAlt = 'Maria de Fátima - Assistente de IA do Grupo Eureka',
}: Readonly<AISectionProps>) {
  const scrollAnimation = useScrollAnimation({ scrollRange: [0, 0.4] })

  return (
    <ScrollAnimatedWrapper scrollAnimation={scrollAnimation} background="bg-accent">
      <section
        aria-labelledby="ai-section-title"
        className="relative z-10 flex min-h-177 w-full items-center justify-center overflow-hidden py-15 lg:min-h-screen"
      >
        {/* Background Image - decorativo */}
        <Image src={backgroundImage} alt="" fill className="object-cover" aria-hidden="true" />

        {/* Gradient Overlay - decorativo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1 bg-linear-to-t from-secondary/65 from-31% to-primary/65 to-86% mix-blend-multiply"
        />

        {/* Content */}
        <div className="relative z-10 container flex w-full flex-col lg:max-w-[937px]">
          {/* Header */}
          <header className="mb-4 self-center text-center *:w-fit lg:mb-14 lg:w-full lg:max-w-[calc(100%-300px)] lg:self-end lg:text-start">
            <motion.h2
              initial={{ x: 'var(--entry-distance-x)' }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{
                amount: 0.8,
                once: true,
              }}
              id="ai-section-title"
              className="pb-1 font-heading text-[2.75rem]/[1.1] font-bold text-secondary-foreground [--entry-distance-x:-25px] md:[--entry-distance-x:-50px] lg:typography-display"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ x: 'var(--entry-distance-x)' }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{
                amount: 0.8,
                once: true,
              }}
              className="font-heading text-[2rem]/[33px] text-accent [--entry-distance-x:25px] md:[--entry-distance-x:50px] lg:ml-auto lg:typography-heading lg:text-[3.375rem]/[1.2]"
            >
              {subtitle}
            </motion.p>
          </header>

          <div className="mb-6 flex w-full flex-col items-center justify-center lg:relative lg:flex-row lg:justify-normal">
            {/* Avatar */}
            <motion.figure
              initial={{ x: 'var(--entry-distance-x)' }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{
                amount: 0.8,
                once: true,
              }}
              className="lg:[--entry-distance-x]:-25px flex h-[228px] w-[231px] items-center justify-center overflow-hidden lg:absolute lg:bottom-0 lg:-left-5 lg:h-[407px] lg:w-[415px]"
            >
              <Image
                src={avatarImage}
                alt={avatarAlt}
                width={415}
                height={407}
                className="-scale-y-100 rotate-180"
              />
            </motion.figure>

            {/* Info Card */}
            <article className="w-full rounded-[30px] bg-white p-7 lg:rounded-[40px] lg:py-10 lg:pr-20 lg:pl-83">
              <p className="typography-body text-pretty [&_a]:font-bold [&_a]:text-accent [&_a]:underline [&_a]:decoration-transparent [&_a]:hover:decoration-current">
                {description}
              </p>
            </article>
          </div>

          {/* CTA Button */}
          <Button asChild hasIcon className="min-w-62 self-end">
            <Link href={buttonHref}>
              <span>{buttonLabel}</span>
            </Link>
          </Button>
        </div>
      </section>
    </ScrollAnimatedWrapper>
  )
}
