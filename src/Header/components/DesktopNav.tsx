import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { isDropdownItem, isLinkItem, type HeaderMenuItem } from '@/Navigation/types'
import type { Media as MediaType } from '@/payload-types'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

/**
 * DesktopNav Component
 *
 * Menu de navegação desktop com suporte a dropdowns com imagens e descrições.
 * Renderiza itens simples de link ou dropdowns baseado no tipo do item.
 */
interface DesktopNavProps {
  menuItems: HeaderMenuItem[]
}

export function DesktopNav({ menuItems }: DesktopNavProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item, idx) => {
          // Dropdown Menu
          if (isDropdownItem(item)) {
            return (
              <NavigationMenuItem key={item.label || idx}>
                <NavigationMenuTrigger className="text-sm font-medium">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.subitems.map((subitem, subIdx) => (
                      <ListItem
                        key={subIdx}
                        title={subitem.link?.label || ''}
                        href={subitem.link || null}
                        image={subitem.image}
                        description={subitem.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // Simple Link
          if (isLinkItem(item)) {
            return (
              <NavigationMenuItem key={item.link.label || idx}>
                <NavigationMenuLink asChild>
                  <CMSLink
                    {...item.link}
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50',
                    )}
                  />
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * ListItem Component
 *
 * Item do dropdown menu com suporte a imagem e descrição
 */
interface ListItemProps {
  title: string
  href: any
  image?: MediaType | number | string | null
  description?: string | null
}

const ListItem: React.FC<ListItemProps> = ({ title, href, image, description }) => {
  return (
    <li>
      <CMSLink
        {...href}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        )}
      >
        {image && typeof image === 'object' && (
          <div className="mb-2 overflow-hidden rounded-md">
            <Media resource={image} imgClassName="object-cover w-full h-24" htmlElement={null} />
          </div>
        )}
        <div className="text-sm font-medium leading-none">{title}</div>
        {description && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
        )}
      </CMSLink>
    </li>
  )
}
