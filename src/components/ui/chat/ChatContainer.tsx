"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ChatContainerProps {
  children: ReactNode;
  className?: string;
}

export function ChatContainer({ children, className }: Readonly<ChatContainerProps>) {
  return (
    <div
      role="log"
      aria-live="polite"
      className={cn(
        "overflow-clip rounded-[20px] lg:rounded-bl-[22px] lg:rounded-br-[22px] lg:rounded-tl-[40px] lg:rounded-tr-[40px]",
        "border border-white/50 bg-white/10 backdrop-blur-[22px]",
        "shadow-[0px_12px_24px_0px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
