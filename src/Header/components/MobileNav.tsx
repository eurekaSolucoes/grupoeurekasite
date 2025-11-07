'use client'

import { HTMLAttributes, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CMSLink } from '@/components/Link'
import { isDropdownItem, isLinkItem, type HeaderMenuItem } from '@/Navigation/types'
import { HeaderTheme, useHeaderTheme } from '@/providers/HeaderTheme'

/**
 * MobileNav Component
 *
 * Menu de navegação mobile com Sheet que desliza de cima para baixo.
 * Ocupa 40% da tela no mínimo e até tela cheia com scroll.
 * Subitems são renderizados como links simples (sem imagens/descrições).
 */
interface MobileNavProps {
  menuItems: HeaderMenuItem[]
}

export function MobileNav({ menuItems }: Readonly<MobileNavProps>) {
  const [open, setOpen] = useState(false)
  const buttonClickRef = useRef(false)
  const { changeHeaderTheme, headerTheme } = useHeaderTheme()
  const previousHeaderThemeRef = useRef<HeaderTheme | null>(headerTheme ?? null)

  const toggleDialog = () => {
    buttonClickRef.current = true
    setOpen((prev) => !prev)
    const isOpening = !open
    if (isOpening) {
      changeHeaderTheme({
        ...headerTheme,
        logoTheme: 'icon-white',
      })
      return
    }
    changeHeaderTheme({
      ...headerTheme,
      logoTheme: previousHeaderThemeRef.current?.logoTheme ?? null,
    })
  }

  const handleOpenChange = (next: boolean) => {
    if (buttonClickRef.current) {
      buttonClickRef.current = false
      return // IGNORA evento extra
    }
    setOpen(next)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <Button
        data-open={open}
        variant="ghost"
        size="icon"
        className="group size-10 flex-col gap-y-1 text-white transition-all hover:cursor-pointer hover:bg-transparent hover:text-white data-[open=true]:gap-0 lg:hidden"
        onClick={toggleDialog}
      >
        {/* Top bar */}
        <span className="block h-0.75 w-6 rounded-full bg-current transition-transform duration-300 group-data-[open=true]:translate-y-0.75 group-data-[open=true]:rotate-45" />

        {/* Middle bar */}
        <span className="block h-0.75 w-6 rounded-full bg-current transition-opacity duration-300 group-data-[open=true]:opacity-0" />

        {/* Bottom bar */}
        <span className="block h-0.75 w-6 rounded-full bg-current transition-transform duration-300 group-data-[open=true]:-translate-y-0.75 group-data-[open=true]:-rotate-45" />
      </Button>
      <SheetContent
        side="top"
        className="group max-h-screen min-h-[40vh] overflow-y-hidden rounded-b-[60px] border-0 bg-linear-to-br from-secondary to-brand-dark-blue to-90% p-0 text-secondary-foreground"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navegue em nosso site</SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-38 h-[calc(100vh-100px)]">
          <nav className="container pb-18">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-7 font-heading group-data-[state=closed]:**:data-target:animate-out group-data-[state=closed]:**:data-target:fade-out-0 group-data-[state=closed]:**:data-target:slide-out-to-top-48 group-data-[state=open]:**:data-target:animate-in group-data-[state=open]:**:data-target:fade-in group-data-[state=open]:**:data-target:slide-in-from-top"
            >
              {menuItems.map((item, i) => {
                // Dropdown Menu
                if (isDropdownItem(item)) {
                  return (
                    <AccordionItem
                      key={item.label || i}
                      value={`item-${i}`}
                      className="border-none"
                    >
                      <AccordionTrigger
                        data-target
                        className="justify-normal gap-x-2 py-0 text-2xl font-normal hover:no-underline [&_svg]:size-6 [&_svg]:text-accent"
                        style={{
                          animationDuration: `${700 + i * 100}ms`,
                        }}
                      >
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="mt-5 flex flex-col gap-y-5 border-l-2 border-accent pb-0 pl-5">
                        {item.subitems.map((subitem, subIdx) => (
                          <CMSLink
                            key={subitem.link?.label || subIdx}
                            {...subitem.link}
                            className="text-xl text-secondary-foreground/70 duration-300 hover:text-secondary-foreground"
                            onClick={() => setOpen(false)}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )
                }

                // Simple Link (outside accordion)
                if (isLinkItem(item)) {
                  return (
                    <CMSLink
                      data-target
                      key={item.link.label || i}
                      {...item.link}
                      className="block text-2xl"
                      style={{
                        animationDuration: `${600 + i * 100}ms`,
                      }}
                      onClick={() => setOpen(false)}
                    />
                  )
                }

                return null
              })}
            </Accordion>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
