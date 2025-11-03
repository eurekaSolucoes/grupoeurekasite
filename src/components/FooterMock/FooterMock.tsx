import Link from 'next/link'
import { footerMockData } from '@/data/footer'
import { MapPin, Phone } from 'lucide-react'
import { SiouxLogo } from '@/components/Icons/SiouxLogo'
import { FacebookIcon } from '@/components/Icons/FacebookIcon'
import { InstagramIcon } from '@/components/Icons/InstagramIcon'
import { LinkedInIcon } from '@/components/Icons/LinkedInIcon'
import { YouTubeIcon } from '@/components/Icons/YouTubeIcon'
import { TikTokIcon } from '@/components/Icons/TikTokIcon'
import Image from 'next/image'

/**
 * Mapeamento de ícones de redes sociais
 */
const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
}

/**
 * FooterMock Component
 *
 * Componente de footer standalone que utiliza dados mockados.
 * Não depende do CMS e serve como placeholder visual.
 */
export function FooterMock() {
  return (
    <footer className="mt-auto">
      <section className="container flex flex-col gap-y-7 pt-12 pb-7">
        {/* Top Section: Logo + Contact Info */}
        <div className="flex flex-col gap-7">
          <Link href="/">
            <Image
              src="/eureka-logo-icon.svg"
              alt="Eureka Logo"
              width={56}
              height={69}
              className="w-10 h-14 lg:size-auto"
            />
          </Link>
          <div className="flex flex-col gap-3 text-sm">
            <p className="flex items-start gap-2 text-balance w-3/5">
              <MapPin className="size-4 text-accent" />
              <Link
                href="https://maps.app.goo.gl/Ca1bn3aFVCy9zWpi9"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-on-hover"
              >
                {footerMockData.contactInfo.address}
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-accent" />
              <Link
                href={`tel:${footerMockData.contactInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-on-hover"
              >
                {footerMockData.contactInfo.phone}
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {footerMockData.navColumns.map((column) => (
            <div className="space-y-1.2" key={column.title}>
              <h3 className="text-xs text-accent">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="underline-on-hover text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs text-accent mb-3">Redes</h3>
          <ul className="flex items-center gap-4">
            {footerMockData.socialLinks.map((social) => {
              const Icon = socialIcons[social.platform] // pega o ícone correto

              if (!Icon) return null // caso venha algo inesperado

              return (
                <li key={social.platform}>
                  <Link href={social.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="size-5 text-foreground hover:text-accent transition-colors" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {/* Bottom: Legal Info */}
      <section className="container text-xs">
        <div className="border-black/20 pt-7 pb-5 border-t gap-5 flex flex-col md:flex-row justify-between text-black/50">
          <p>
            © Grupo Eureka I CNPJ 06.982.873/0001-23. Todos os direitos reservados.{' '}
            <Link href="/politica-de-privacidade" className="hover:text-black underline">
              Política de Privacidade
            </Link>
          </p>
          <p className="flex items-center gap-2">
            Desenvolvido por{' '}
            <Link
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
