'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { EurekaLogo } from '@/components/animate/EurekaLogo'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

// Configuracao de animacoes
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 50, damping: 15 }

// Componente de circulos decorativos
function DecorativeCircles() {
  return (
    <>
      {/* Circulo laranja - canto superior direito */}
      <motion.div
        className="pointer-events-none absolute -top-20 right-0 z-0 size-60 translate-x-1/4 rounded-full border border-accent/30 lg:size-100"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Circulo azul - canto inferior esquerdo */}
      <motion.div
        className="pointer-events-none absolute bottom-1/4 left-0 z-0 size-80 -translate-x-1/2 rounded-full border border-white/10 lg:size-120"
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  )
}

// Componente de background 404
function Background404() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
      animate={{ opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <span className="font-heading text-[200px] font-bold leading-none text-white lg:text-[400px]">
        404
      </span>
    </motion.div>
  )
}

export default function NotFound() {
  return (
    <HeaderThemeSetter
      as="main"
      theme="default"
      logoMobile="icon-white"
      logoDesktop="full"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark-blue via-secondary to-brand-dark-blue"
    >
      {/* Elementos decorativos */}
      <DecorativeCircles />
      <Background404 />

      {/* Conteudo principal */}
      <div className="container relative z-10 flex flex-col items-center px-5 text-center">
        {/* Logo Eureka */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ ...SPRING_CONFIG, delay: 0.2 }}
        >
          <EurekaLogo variant="icon-full-white" height={80} />
        </motion.div>

        {/* Numero 404 */}
        <motion.span
          className="mt-2 font-heading text-[120px] font-bold leading-none text-accent lg:text-[200px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_CONFIG, delay: 0.3 }}
        >
          404
        </motion.span>

        {/* Titulo */}
        <motion.h1
          className="mt-4 typography-heading text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Ops! Esta página não existe
        </motion.h1>

        {/* Texto explicativo */}
        <motion.p
          className="mt-6 max-w-md typography-body-large text-white/80"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          O caminho que você procura não foi encontrado. Que tal voltar ao início e explorar nossas
          soluções?
        </motion.p>

        {/* Botao CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button asChild variant="default" hasIcon>
            <Link href="/">
              <span>Ir para a página inicial</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </HeaderThemeSetter>
  )
}
