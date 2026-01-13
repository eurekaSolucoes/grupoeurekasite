import { HeaderMenuItem, isDropdownItem } from '@/Navigation/types'
import { ArrowRight } from '@/components/Icons/ArrowRight'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import {
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Media as MediaType } from '@/payload-types'
import { Fragment } from 'react/jsx-runtime'
interface NavigationDropdownItemProps {
  item: HeaderMenuItem
}

export function NavigationDropdownItem({ item }: Readonly<NavigationDropdownItemProps>) {
  const isDropdown = isDropdownItem(item)

  if (!isDropdown) return null
  return (
    <Fragment>
      <NavigationMenuTrigger className="rounded-full bg-transparent! px-6 text-lg font-medium text-white duration-300 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[state=open]:bg-background! data-[state=open]:text-foreground! data-[state=open]:[transition:color_300ms,background-color_300ms_300ms]">
        {item.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-110! rounded-[25px] p-0!">
        <ScrollArea className="max-h-[calc(100vh-150px)] [&>[data-radix-scroll-area-viewport]]:max-h-[inherit]">
          <ul className="flex w-full flex-col gap-8 p-8">
            {item.subitems.map((subitem, innerIndex) => (
              <ListItem
                key={subitem.link?.label || innerIndex}
                title={subitem.link?.label || ''}
                href={subitem.link || null}
                image={subitem.image}
                description={subitem.description}
              />
            ))}
          </ul>
        </ScrollArea>
      </NavigationMenuContent>
    </Fragment>
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
      <NavigationMenuLink asChild>
        <CMSLink
          {...href}
          label={null}
          className="group/link flex w-full cursor-pointer flex-row items-center gap-4 hover:bg-transparent hover:text-current"
        >
          <div className="relative">
            <Media
              resource={image}
              className="h-27 w-32 overflow-hidden rounded-lg"
              imgClassName="h-27 w-32 object-cover group-hover/link:scale-110 transition-transform duration-300"
            />
            <ArrowRight className="absolute right-4 bottom-0 translate-y-1/2 animate-out shadow-[0_6.857px_13.714px_0_rgba(0,0,0,0.40)] duration-300 fill-mode-forwards zoom-out-90 fade-out slide-out-to-left-4 group-hover/link:animate-in group-hover/link:zoom-in-90 group-hover/link:fade-in group-hover/link:slide-in-from-left-4" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CMSLink>
      </NavigationMenuLink>
    </li>
  )
}
