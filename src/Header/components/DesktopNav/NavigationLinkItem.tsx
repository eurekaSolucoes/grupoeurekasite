import { HeaderMenuItem } from '@/Navigation/types'
import { CMSLink } from '@/components/Link'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'

interface NavigationLinkItemProps {
  item: HeaderMenuItem
}

export function NavigationLinkItem({ item }: Readonly<NavigationLinkItemProps>) {
  return (
    <NavigationMenuLink
      asChild
      className="justify-center rounded-full px-6 text-lg font-medium text-white hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-white"
    >
      <CMSLink {...item.link} />
    </NavigationMenuLink>
  )
}
