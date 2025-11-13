import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Navigation } from '@/payload-types'
import { Logo } from './components/Logo'
import { NavContainer } from './components/NavContainer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { MobileNav } from './components/MobileNav'
import { DesktopNav } from '@/Header/components/DesktopNav'

/**
 * Header Component
 *
 * Componente de header que consome dados do Navigation global do Payload CMS.
 * Renderiza menu de navegação com suporte a dropdowns com imagens e descrições.
 */
export async function Header() {
  const { headerMenu, whatsappLink } = (await getCachedGlobal('navigation', 1)()) as Navigation

  return (
    <header className="pointer-events-auto sticky top-0 z-60 w-full">
      <div className="container mt-5 flex h-16 items-center justify-between lg:h-18">
        <Logo />

        <NavContainer>
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
  )
}
