import { cn } from '@/utilities/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation } from '@/payload-types'
import Link from 'next/link'
import { FacebookIcon } from '@/components/Icons/FacebookIcon'
import { InstagramIcon } from '@/components/Icons/InstagramIcon'
import { LinkedInIcon } from '@/components/Icons/LinkedInIcon'
import { YouTubeIcon } from '@/components/Icons/YouTubeIcon'
import { TikTokIcon } from '@/components/Icons/TikTokIcon'
import { TwitterIcon } from '@/components/Icons/TwitterIcon'
import { WhatsAppIcon } from '@/components/Icons/WhatsAppIcon'
import { TelegramIcon } from '@/components/Icons/TelegramIcon'
import Image from 'next/image'

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

const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitter: 'Twitter',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
}

export interface SocialCTABlockProps {
  text: string
  backgroundImage: string
  className?: string
  type?: 'social' | 'whatsapp'
}

export async function SocialCTABlock({
  text,
  backgroundImage,
  className,
  type = 'social',
}: Readonly<SocialCTABlockProps>) {
  const { footerMenu } = (await getCachedGlobal('navigation', 1)()) as Navigation
  const socialLinks = footerMenu?.social?.links || []

  return (
    <section
      className={cn('relative py-16 lg:h-150 lg:py-24', className)}
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
    >
      {/* Background Image with Gradient Overlay */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
              linear-gradient(2.7deg, rgba(1, 15, 59, 0.9) 1.8%, rgba(1, 15, 59, 0) 65.75%),
              linear-gradient(258.17deg, rgba(243, 112, 33, 0.55) 7.02%, rgba(35, 62, 148, 0.55) 38.72%, rgba(35, 62, 148, 0.55) 59.41%, rgba(1, 15, 59, 0.55) 76.98%)
            `,
        }}
      />

      <div className="container h-full">
        <div className="flex h-full flex-col justify-center gap-8 lg:gap-12">
          {/* Text with Highlights */}
          <h2
            className="max-w-2xl typography-subheading text-balance text-secondary-foreground [&_strong]:font-bold [&_strong]:text-accent"
            dangerouslySetInnerHTML={{ __html: text }}
          />

          {/* Social Icons */}
          {type === 'social' && socialLinks.length > 0 && (
            <ul className="flex items-center gap-3 lg:gap-7">
              {socialLinks.map((social, idx) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]

                if (!Icon || !social.url) return null

                const label = socialLabels[social.icon as keyof typeof socialLabels]

                return (
                  <li
                    key={idx}
                    className="group relative rounded-full border-t border-white/50 bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/50"
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Siga-nos no ${label}`}
                      className="flex size-12 items-center justify-center overflow-hidden rounded-full lg:size-15"
                    >
                      <Icon className="size-5 text-white transition-transform duration-300 group-hover:scale-110 lg:size-6" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {/* WhatsApp CTA - TODO: Implementar */}
          {type === 'whatsapp' && (
            <div className="flex items-center gap-4">
              {/* TODO: Adicionar botão de WhatsApp com link configurável */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
