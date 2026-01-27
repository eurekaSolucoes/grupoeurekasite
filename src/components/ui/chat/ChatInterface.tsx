'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatContainer } from './ChatContainer'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ChatMessage {
  type: 'ai' | 'user'
  content: ReactNode
  id: string
}

export interface ChatInterfaceProps {
  messages: ChatMessage[]
  className?: string
  containerClassName?: string
  /** Delay em ms entre cada mensagem (default: 1800) */
  messageDelay?: number
  /** Delay inicial em ms antes de começar a mostrar mensagens (default: 800) */
  initialDelay?: number
}

export function ChatInterface({
  messages,
  className,
  containerClassName,
  messageDelay = 1800,
  initialDelay = 800,
}: Readonly<ChatInterfaceProps>) {
  const [visibleCount, setVisibleCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.8, once: false })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Reseta e inicia animação quando entra/sai do viewport
  useEffect(() => {
    if (!isInView) {
      // Reseta quando sai da tela
      setVisibleCount(0)
      return
    }

    // Delay inicial antes de começar a mostrar primeira mensagem
    const initialTimer = setTimeout(() => {
      setVisibleCount(1)
    }, initialDelay)

    return () => clearTimeout(initialTimer)
  }, [isInView, initialDelay])

  // Mostra mensagens sequencialmente após a primeira
  useEffect(() => {
    if (!isInView || visibleCount === 0 || visibleCount >= messages.length) return

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1)
    }, messageDelay)

    return () => clearTimeout(timer)
  }, [visibleCount, messages.length, messageDelay, isInView])

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (visibleCount > 0 && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        })
      }
    }
  }, [visibleCount])

  return (
    <ChatContainer className={cn(className, containerClassName)}>
      <ScrollArea ref={scrollAreaRef} className="h-120">
        <motion.div
          ref={containerRef}
          className="flex h-full w-full flex-col justify-end gap-4 p-4 lg:gap-5 lg:p-5"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatePresence initial={false}>
            {messages.slice(0, visibleCount).map((message) => (
              <motion.div
                key={message.id}
                layout
                className={cn('flex w-full', {
                  'justify-end': message.type === 'user',
                })}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ChatBubble type={message.type} content={message.content} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
    </ChatContainer>
  )
}
