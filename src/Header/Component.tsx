import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation } from '@/payload-types'
import { Logo } from './components/Logo'
import { NavContainer } from './components/NavContainer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { MobileNav } from './components/MobileNav'
import { DesktopNav } from '@/Header/components/DesktopNav'
import { HeaderBackground } from './components/HeaderBackground'
import { bgThemeConfig, type BgTheme } from './bgThemeConfig'
import type { EurekaLogoVariants } from '@/components/animate/EurekaLogo'

// Re-export para compatibilidade com layouts existentes
export { type BgTheme }

interface HeaderProps {
  bgTheme?: BgTheme
  /** Override logo variant for mobile (takes priority over bgTheme config) */
  defaultMobileVariant?: EurekaLogoVariants
  /** Override logo variant for desktop (takes priority over bgTheme config) */
  defaultDesktopVariant?: EurekaLogoVariants
}

/**
 * Header Component
 *
 * Componente de header que consome dados do Navigation global do Payload CMS.
 * Renderiza menu de navegação com suporte a dropdowns com imagens e descrições.
 */

export async function Header({
  bgTheme,
  defaultMobileVariant,
  defaultDesktopVariant,
}: HeaderProps = {}) {
  const { headerMenu, whatsappLink } = (await getCachedGlobal('navigation', 1)()) as Navigation

  // Se tem bgTheme, usa as configs correspondentes
  const config = bgTheme ? bgThemeConfig[bgTheme] : null

  // Props diretos têm prioridade sobre bgTheme config
  const mobileVariant = defaultMobileVariant ?? config?.logoMobile
  const desktopVariant = defaultDesktopVariant ?? config?.logoDesktop

  return (
    <>
      <header className="pointer-events-auto fixed inset-x-0 top-0 z-50 w-full">
        <div className="container mt-5 flex h-16 items-center justify-between lg:mt-12 lg:h-18">
          <Logo
            className="animate-in duration-700 fade-in slide-in-from-top"
            defaultMobileVariant={mobileVariant}
            defaultDesktopVariant={desktopVariant}
          />

          <NavContainer
            className="animate-in duration-1000 fade-in slide-in-from-top"
            theme={config?.navTheme}
          >
            {headerMenu && headerMenu.length > 0 && (
              <>
                <DesktopNav menuItems={headerMenu} />
                <MobileNav menuItems={headerMenu} />
              </>
            )}
            <WhatsAppButton url={whatsappLink} />
          </NavContainer>
        </div>
      </header>
      {!!bgTheme && <HeaderBackground bgTheme={bgTheme} />}
    </>
  )
}
