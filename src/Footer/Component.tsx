import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { SiouxLogo } from '@/components/Icons/SiouxLogo'
import { FacebookIcon } from '@/components/Icons/FacebookIcon'
import { InstagramIcon } from '@/components/Icons/InstagramIcon'
import { LinkedInIcon } from '@/components/Icons/LinkedInIcon'
import { YouTubeIcon } from '@/components/Icons/YouTubeIcon'
import { TikTokIcon } from '@/components/Icons/TikTokIcon'
import { TwitterIcon } from '@/components/Icons/TwitterIcon'
import { WhatsAppIcon } from '@/components/Icons/WhatsAppIcon'
import { TelegramIcon } from '@/components/Icons/TelegramIcon'

/**
 * Mapeamento de ícones de redes sociais
 */
const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
}

interface FooterProps {
  className?: string
}

/**
 * Footer Component
 *
 * Componente de footer que consome dados do Navigation global do Payload CMS.
 * Renderiza menu de rodapé, informações de contato e redes sociais.
 */
export async function Footer({ className }: FooterProps = {}) {
  const { footerMenu, address, phone } = (await getCachedGlobal('navigation', 1)()) as Navigation

  return (
    <footer className={cn('mt-auto bg-white', className)}>
      <section className="container flex flex-col gap-y-7 pt-12 pb-7 xl:flex-row xl:items-end xl:gap-16">
        {/* Logo + Contact Info */}
        <div className="flex flex-col gap-7 xl:basis-1/4 xl:gap-20">
          <Link href="/">
            <Image
              src="/eureka-logo-icon.svg"
              alt="Eureka Logo"
              width={56}
              height={69}
              className="h-14 w-10 xl:size-auto"
            />
          </Link>
          <div className="flex flex-col gap-3 text-sm xl:gap-4 xl:text-xl">
            {address && (
              <p className="flex w-3/5 items-start gap-2 text-balance xl:w-full">
                <MapPin className="size-4 shrink-0 text-accent xl:mt-1 xl:size-5" />
                <Link
                  title="Ver no Mapa"
                  href="https://maps.app.goo.gl/Ca1bn3aFVCy9zWpi9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-on-hover"
                >
                  {address}
                </Link>
              </p>
            )}
            {phone && (
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-accent xl:mt-1 xl:size-5" />
                <Link
                  title="Fale conosco pelo telefone"
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="underline-on-hover"
                >
                  {phone}
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-5 xl:basis-1/2 xl:grid-flow-col xl:grid-cols-none xl:gap-16">
          {/* Solutions Column */}
          {footerMenu?.solutions && (
            <div className="space-y-1.5 xl:space-y-4">
              <h3 className="text-xs text-accent xl:text-sm">{footerMenu.solutions.title}</h3>
              {footerMenu.solutions.links && footerMenu.solutions.links.length > 0 && (
                <ul className="space-y-3 text-sm leading-none xl:space-y-4 xl:text-xl">
                  {footerMenu.solutions.links.map((item, idx) => (
                    <li key={idx}>
                      <CMSLink {...item.link} className="underline-on-hover" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Access Column */}
          {footerMenu?.access && (
            <div className="space-y-1.5 xl:space-y-4">
              <h3 className="text-xs text-accent xl:text-sm">{footerMenu.access.title}</h3>
              {footerMenu.access.links && footerMenu.access.links.length > 0 && (
                <ul className="space-y-3 text-sm leading-none xl:space-y-4 xl:text-xl">
                  {footerMenu.access.links.map((item, idx) => (
                    <li key={idx}>
                      <CMSLink {...item.link} className="underline-on-hover" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}
        {footerMenu?.social && (
          <div className="xl:flex-1">
            <h3 className="mb-3 text-xs text-accent xl:text-sm">{footerMenu.social.title}</h3>
            {footerMenu.social.links && footerMenu.social.links.length > 0 && (
              <ul className="flex items-center gap-4 xl:flex-col xl:items-start">
                {footerMenu.social.links.map((social, idx) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons]

                  if (!Icon) return null

                  return (
                    <li key={idx}>
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.label || social.icon}
                      >
                        <Icon className="size-5 text-foreground transition-colors hover:text-accent" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Bottom: Legal Info */}
      <section className="container text-xs xl:text-sm">
        <div className="flex flex-col justify-between gap-5 border-t border-black/20 pt-7 pb-5 text-black/50 md:flex-row">
          <p>
            © Grupo Eureka I CNPJ 06.982.873/0001-23. Todos os direitos reservados.{' '}
            <Link
              title="Política de Privacidade"
              href="/politica-de-privacidade"
              className="underline hover:text-black"
            >
              Política de Privacidade
            </Link>
          </p>
          <p className="flex items-center gap-2">
            Desenvolvido por{' '}
            <Link
              title="Desenvolvido por Sioux Digital 1:1"
              href="https://www.sioux.ag?lead=eureka"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sioux-blue"
            >
              <SiouxLogo className="*:fill-current" />
            </Link>
          </p>
        </div>
      </section>
    </footer>
  )
}
