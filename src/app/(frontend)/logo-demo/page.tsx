'use client'
import { EurekaLogo, EurekaLogoVariants } from '@/components/animate/EurekaLogo'
import { useState } from 'react'

interface VariantButton {
  variant: EurekaLogoVariants
  label: string
  bgHex: string
}

export default function LogoDemoPage() {
  const logoVariants: VariantButton[] = [
    {
      variant: 'full',
      label: 'Full',
      bgHex: '#000000',
    },
    {
      variant: 'icon-blue',
      label: 'Icon Blue',
      bgHex: '#000000',
    },
    {
      variant: 'icon-white',
      label: 'Icon White',
      bgHex: '#000000',
    },
    {
      variant: 'icon-full-white',
      label: 'Icon Full White',
      bgHex: '#000000',
    },
  ]
  const [variant, setVariant] = useState<EurekaLogoVariants>('full')
  return (
    <div className="flex flex-col justify-center gap-6 items-center h-screen bg-blue-600">
      <EurekaLogo variant={variant} />

      <div className="grid grid-flow-col auto-cols-fr gap-2">
        {logoVariants.map((variant) => (
          <button
            style={{ backgroundColor: variant.bgHex }}
            key={variant.variant}
            onClick={() => setVariant(variant.variant)}
            className="text-white p-2 rounded-md cursor-pointer"
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  )
}
