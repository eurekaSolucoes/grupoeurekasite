'use client'

import Image from 'next/image'
import {
  ScrollAnimatedWrapper,
  useScrollAnimation,
} from '@/components/animate/ScrollAnimatedWrapper'
import { motion } from 'motion/react'
import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'
import { ChatInterface } from '@/components/ui/chat'
import type { Homepage } from '@/payload-types'
import RichText from '@/components/RichText'

export interface AIBlockProps {
  ai: Homepage['ai']
}

export function AIBlock({ ai }: Readonly<AIBlockProps>) {
  const scrollAnimation = useScrollAnimation({ scrollRange: [0, 0.4] })

  // Don't render if section is hidden or no messages
  if (!ai?.messages || ai.messages.length === 0) {
    return null
  }

  // Transform CMS data to ChatMessage format
  const messages = ai.messages.map((msg, idx) => ({
    id: msg.id || `msg-${idx}`,
    type: msg.type,
    content: <RichText data={msg.content} enableGutter={false} enableProse={false} />,
  }))

  const backgroundImage = '/assets/ai-section-background.png'
  const avatarImage = '/assets/ai-maria-fatima.png'
  const avatarAlt = 'Maria de Fátima - Assistente de IA do Grupo Eureka'

  return (
    <HeaderThemeSetter logoMobile="icon-white" logoDesktop="icon-white">
      <ScrollAnimatedWrapper scrollAnimation={scrollAnimation} background="bg-accent">
        <section
          aria-label="Chat com Maria de Fátima"
          className="relative z-10 flex min-h-[708px] w-full items-center justify-center overflow-hidden py-15 lg:min-h-screen"
        >
          {/* Background Image - decorativo */}
          <Image src={backgroundImage} alt="" fill className="object-cover" aria-hidden="true" />

          {/* Gradient Overlay - decorativo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-1 bg-linear-to-t from-secondary/65 from-31% to-primary/65 to-86% mix-blend-multiply"
          />

          {/* Content */}
          <div className="container lg:max-w-[937px]">
            {/* Chat + Avatar wrapper */}

            <div className="relative z-10 lg:flex lg:items-end">
              <ChatInterface
                messages={messages}
                className="w-full lg:max-w-[573px] min-h-[350px] lg:min-h-[422px] pb-26 lg:pb-10 lg:relative lg:-z-2"
              />
              <motion.figure
                initial={{ x: 'var(--entry-distance-x)', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.3, once: true }}
                className="relative -mt-24 flex h-[223px] w-[228px] items-center justify-center overflow-hidden [--entry-distance-x:-25px] lg:order-first lg:mt-0 lg:-mr-6 lg:h-[407px] lg:w-[415px] lg:shrink-0"
              >
                <Image
                  src={avatarImage}
                  alt={avatarAlt}
                  width={415}
                  height={407}
                  className="-scale-y-100 rotate-180"
                />
              </motion.figure>

              <div className="absolute bottom-0 -z-1 -mt-10 h-10 w-full rounded-full border-t border-t-white/30 bg-linear-to-tl from-brand-dark-blue to-brand-blue" />
            </div>
          </div>
        </section>
      </ScrollAnimatedWrapper>
    </HeaderThemeSetter>
  )
}
