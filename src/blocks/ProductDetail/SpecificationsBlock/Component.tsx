'use client'

import type { ProductDetail } from '@/services/products'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TABS, type TabKey } from './config'
import {
  SpecificationsTab,
  JustificationTab,
  PricesTab,
  AccompaniesTab,
  CollectionTab,
} from './tabs'

interface ProductDetailSpecificationsBlockProps {
  product: ProductDetail
}

const TAB_COMPONENTS: Record<TabKey, React.ComponentType<{ product: ProductDetail }>> = {
  specs: SpecificationsTab,
  justification: JustificationTab,
  prices: PricesTab,
  accompanies: AccompaniesTab,
  collection: CollectionTab,
}

export function ProductDetailSpecificationsBlock({
  product,
}: ProductDetailSpecificationsBlockProps) {
  const availableTabs = TABS.filter((tab) => tab.hasContent(product))

  if (availableTabs.length === 0) {
    return null
  }

  const defaultTab = availableTabs[0]?.key || 'specs'

  return (
    <section aria-labelledby="product-specs-heading" className="container py-12 lg:py-20">
      <h2 id="product-specs-heading" className="sr-only">
        Detalhes da obra
      </h2>

      {/* Desktop: Tabs */}
      <Tabs defaultValue={defaultTab} className="hidden w-full lg:block">
        <TabsList className="h-auto w-full justify-start gap-2 rounded-none bg-transparent p-0 pl-14">
          {availableTabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="product-detail-tab rounded-none rounded-t-[30px] bg-linear-to-b from-input to-transparent px-6 py-3 text-sm font-normal text-muted-foreground shadow-none data-[state=active]:bg-input data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-none xl:px-10 xl:py-4 xl:text-base"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableTabs.map((tab) => {
          const TabComponent = TAB_COMPONENTS[tab.key]
          return (
            <TabsContent
              key={tab.key}
              value={tab.key}
              className="mt-0 rounded-[30px] bg-input px-8 py-10"
            >
              <TabComponent product={product} />
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Mobile: Accordion */}
      <Accordion type="single" collapsible className="space-y-3 lg:hidden">
        {availableTabs.map((tab) => {
          const TabComponent = TAB_COMPONENTS[tab.key]
          return (
            <AccordionItem
              key={tab.key}
              value={tab.key}
              className="overflow-hidden rounded-xl border-none bg-input"
            >
              <AccordionTrigger className="px-5 py-4 text-base font-bold hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {tab.label}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <TabComponent product={product} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
