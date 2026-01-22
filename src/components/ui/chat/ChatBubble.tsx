"use client";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

const chatBubbleVariants = cva(
  "px-[26px] py-[14px] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.4)] backdrop-blur-[22px]",
  {
    variants: {
      type: {
        ai: "bg-white text-foreground rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[4px] [&_a]:font-bold [&_a]:text-secondary [&_a]:underline [&_a]:hover:text-secondary/80",
        user: "bg-accent text-white rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[4px]",
      },
    },
    defaultVariants: {
      type: "ai",
    },
  },
);

export interface ChatBubbleProps extends VariantProps<typeof chatBubbleVariants> {
  content: ReactNode;
  className?: string;
}

export function ChatBubble({ type, content, className }: Readonly<ChatBubbleProps>) {
  return (
    <div className={cn(chatBubbleVariants({ type }), className)}>
      <p className="text-[18px] leading-[1.2] lg:typography-body">{content}</p>
    </div>
  );
}
