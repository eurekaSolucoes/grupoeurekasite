import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation } from '@/payload-types'
import { Logo } from './components/Logo'
import { NavContainer } from './components/NavContainer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { MobileNav } from './components/MobileNav'
import { DesktopNav } from '@/Header/components/DesktopNav'
import { HeaderBackground } from './components/HeaderBackground'
import { bgThemeConfig, type BgTheme } from './bgThemeConfig'

// Re-export para compatibilidade com layouts existentes
export { type BgTheme }

interface HeaderProps {
  bgTheme?: BgTheme
}

/**
 * Header Component
 *
 * Componente de header que consome dados do Navigation global do Payload CMS.
 * Renderiza menu de navegação com suporte a dropdowns com imagens e descrições.
 */

export async function Header({ bgTheme }: HeaderProps = {}) {
  const { headerMenu, whatsappLink } = (await getCachedGlobal('navigation', 1)()) as Navigation

  // Se tem bgTheme, usa as configs correspondentes
  const config = bgTheme ? bgThemeConfig[bgTheme] : null

  return (
    <>
      <header className="pointer-events-auto fixed inset-x-0 top-0 z-50 w-full">
        <div className="container mt-5 flex h-16 items-center justify-between lg:mt-12 lg:h-18">
          <Logo
            className="animate-in duration-700 fade-in slide-in-from-top"
            defaultMobileVariant={config?.logoMobile}
            defaultDesktopVariant={config?.logoDesktop}
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
