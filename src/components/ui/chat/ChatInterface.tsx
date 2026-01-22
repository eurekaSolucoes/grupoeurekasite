"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatContainer } from "./ChatContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatMessage {
  type: "ai" | "user";
  content: ReactNode;
  id: string;
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  className?: string;
  containerClassName?: string;
  /** Delay em ms entre cada mensagem (default: 1000) */
  messageDelay?: number;
}

export function ChatInterface({
  messages,
  className,
  containerClassName,
  messageDelay = 1000,
}: Readonly<ChatInterfaceProps>) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Inicia a animação quando entra no viewport
  useEffect(() => {
    if (!isInView) return;

    if (visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, messageDelay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages.length, messageDelay, isInView]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (visibleCount > 0 && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [visibleCount]);

  return (
    <ChatContainer className={cn(containerClassName)}>
      <ScrollArea ref={scrollAreaRef} className="h-120">
        <motion.div
          ref={containerRef}
          className="flex flex-col justify-end h-full gap-4 p-4 lg:gap-5 lg:p-5"
          viewport={{ once: true, amount: 0.3 }}
          layout
        >
          <AnimatePresence initial={false}>
            {messages
              .slice(0, visibleCount)
              .map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  className={cn("flex w-full", {
                    "justify-end": message.type === "user",
                  })}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ChatBubble type={message.type} content={message.content} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
    </ChatContainer>
  );
}
