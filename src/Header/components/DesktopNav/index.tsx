'use client'

import { CMSLink } from '@/components/Link'
import { isDropdownItem, isLinkItem, type HeaderMenuItem } from '@/Navigation/types'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useCallback, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { NavigationDropdownItem } from '@/Header/components/DesktopNav/NavigationDropdownItem'
import { NavigationLinkItem } from '@/Header/components/DesktopNav/NavigationLinkItem'

/**
 * DesktopNav Component
 *
 * Menu de navegação desktop com suporte a dropdowns com imagens e descrições.
 * Renderiza itens simples de link ou dropdowns baseado no tipo do item.
 */
interface DesktopNavProps {
  menuItems: HeaderMenuItem[]
}

export function DesktopNav({ menuItems }: Readonly<DesktopNavProps>) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null)
  const [previousItemIndex, setPreviousItemIndex] = useState<number | null>(null)

  const isComingFromOutside = useMemo(() => {
    return previousItemIndex === null && hoveredItemIndex !== null
  }, [previousItemIndex, hoveredItemIndex])
  const isGoingToOutside = useMemo(() => {
    return previousItemIndex !== null && hoveredItemIndex === null
  }, [previousItemIndex, hoveredItemIndex])

  const handleMouseEnter = useCallback(
    (index: number) => {
      setPreviousItemIndex(hoveredItemIndex)
      setHoveredItemIndex(index)
    },
    [hoveredItemIndex],
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredItemIndex(null)
  }, [])

  const isItemHovered = useCallback(
    (index: number) => {
      return hoveredItemIndex === index
    },
    [hoveredItemIndex],
  )

  const stableIsDropdownItem = useCallback((item: HeaderMenuItem) => {
    return isDropdownItem(item)
  }, [])

  const stableIsLinkItem = useCallback((item: HeaderMenuItem) => {
    return isLinkItem(item)
  }, [])

  return (
    <NavigationMenu
      viewport={false}
      className="hidden lg:block"
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
    >
      <NavigationMenuList className="lg:gap-2.5">
        {menuItems.map((item, index) => {
          const isHovered = isItemHovered(index)
          const isDropdown = stableIsDropdownItem(item)
          const isLink = stableIsLinkItem(item)
          let Component = null
          let key

          if (isDropdown) {
            key = item.label
            Component = <NavigationDropdownItem item={item} />
          } else if (isLink) {
            key = item.link?.label
            Component = <NavigationLinkItem item={item} />
          }

          if (Component) {
            return (
              <NavigationMenuItem
                className="h-12 *:relative *:z-20 *:h-full"
                onMouseEnter={handleMouseEnter.bind(null, index)}
                onFocus={handleMouseEnter.bind(null, index)}
                onBlur={handleMouseLeave}
                key={key}
              >
                {Component}
                {isHovered ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      opacity: {
                        duration: isComingFromOutside || isGoingToOutside ? 0.3 : 0,
                      },
                    }}
                    className="absolute! inset-0 z-10! rounded-full bg-background"
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </NavigationMenuItem>
            )
          }

          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
