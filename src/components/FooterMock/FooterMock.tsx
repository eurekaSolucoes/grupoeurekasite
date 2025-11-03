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
      <section className="container flex flex-col gap-y-7 pt-12 pb-7 xl:flex-row xl:gap-16 xl:items-end">
        {/* Top Section: Logo + Contact Info */}
        <div className="flex flex-col gap-7 xl:basis-1/4 xl:gap-20">
          <Link href="/">
            <Image
              src="/eureka-logo-icon.svg"
              alt="Eureka Logo"
              width={56}
              height={69}
              className="w-10 h-14 xl:size-auto"
            />
          </Link>
          <div className="flex flex-col gap-3 xl:gap-4 text-sm xl:text-xl">
            <p className="flex items-start gap-2 text-balance w-3/5 xl:w-full">
              <MapPin className="size-4 xl:size-5 xl:mt-1 text-accent shrink-0" />
              <Link
                title="Ver no Mapa"
                href="https://maps.app.goo.gl/Ca1bn3aFVCy9zWpi9"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-on-hover"
              >
                {footerMockData.contactInfo.address}
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 xl:size-5 xl:mt-1 text-accent shrink-0" />
              <Link
                title="Fale conosco pelo telefone"
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

        <div className="grid grid-cols-2 gap-5 xl:grid-cols-none xl:grid-flow-col xl:basis-1/2 xl:gap-16">
          {footerMockData.navColumns.map((column) => (
            <div className="space-y-1.5 xl:space-y-4" key={column.title}>
              <h3 className="text-xs text-accent xl:text-sm">{column.title}</h3>
              <ul className="space-y-3 xl:space-y-4 text-sm xl:text-xl leading-none">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} title={link.label} className="underline-on-hover ">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="xl:flex-1">
          <h3 className="text-xs text-accent mb-3 xl:text-sm">Redes</h3>
          <ul className="flex items-center gap-4 xl:flex-col xl:items-start">
            {footerMockData.socialLinks.map((social) => {
              const Icon = socialIcons[social.platform] // pega o ícone correto

              if (!Icon) return null // caso venha algo inesperado

              return (
                <li key={social.platform}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                  >
                    <Icon className="size-5 text-foreground hover:text-accent transition-colors" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {/* Bottom: Legal Info */}
      <section className="container text-xs xl:text-sm">
        <div className="border-black/20 pt-7 pb-5 border-t gap-5 flex flex-col md:flex-row justify-between text-black/50">
          <p>
            © Grupo Eureka I CNPJ 06.982.873/0001-23. Todos os direitos reservados.{' '}
            <Link
              title="Política de Privacidade"
              href="/politica-de-privacidade"
              className="hover:text-black underline"
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
