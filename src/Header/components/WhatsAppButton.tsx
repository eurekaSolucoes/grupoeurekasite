import Link from 'next/link'
import { WhatsAppIcon } from '@/components/Icons/WhatsAppIcon'
import { cn } from '@/utilities/ui'

interface WhatsAppButtonProps {
  url?: string | null
  className?: string
}

/**
 * WhatsAppButton Component
 *
 * Botão de contato do WhatsApp.
 * Renderiza apenas se houver URL configurada.
 */
export function WhatsAppButton({ url, className }: Readonly<WhatsAppButtonProps>) {
  if (!url) return null

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'grid size-12 place-items-center rounded-full bg-white text-whatsapp-green transition-colors duration-300 ease-in-out hover:bg-whatsapp-green hover:text-white',
        className,
      )}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="size-5.5 fill-current" />
    </Link>
  )
}
