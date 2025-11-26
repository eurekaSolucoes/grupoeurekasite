import { ArrowRight } from '@/components/Icons/ArrowRight'
import { cn } from '@/utilities/ui'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-between whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-15 p-2.5',
        icon: 'size-10',
        lg: 'h-11 px-8',
        sm: 'h-9 px-3',
      },
      variant: {
        default:
          'bg-white/30 text-white progressive-blur border-t border-white/50 shadow-[0_12px_24px_0_rgba(0,0,0,0.40)]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
  icon?: React.ReactNode | null
  hasIcon?: boolean
}

const DEFAULT_ICON = <ArrowRight className="size-10" />

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  children,
  icon = DEFAULT_ICON,
  hasIcon = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }), {
        'group gap-5 pl-7.5 *:ease-in-out *:first:duration-300 hover:*:first:translate-x-4':
          hasIcon,
      })}
      ref={ref}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {hasIcon && (
        <div className="size-10 transition-transform duration-300 group-hover:translate-x-7.5">
          {icon}
        </div>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
