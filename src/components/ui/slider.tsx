'use client'

import * as React from 'react'
import {
  useKeenSlider,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { cn } from '@/utilities/ui'

// Types
type SliderApi = KeenSliderInstance | null
type SliderOptions = KeenSliderOptions
type SliderPlugin = KeenSliderPlugin

type SliderProps = {
  opts?: SliderOptions
  plugins?: SliderPlugin[]
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: SliderApi) => void
}

type SliderContextProps = {
  sliderRef: (node: HTMLDivElement | null) => void
  api: SliderApi
  orientation: 'horizontal' | 'vertical'
  opts?: SliderOptions
}

// Context
const SliderContext = React.createContext<SliderContextProps | null>(null)

// Hook
function useSlider() {
  const context = React.useContext(SliderContext)

  if (!context) {
    throw new Error('useSlider must be used within a <Slider />')
  }

  return context
}

// Slider (Wrapper)
function Slider({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & SliderProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      ...opts,

      vertical: orientation === 'vertical',
    },
    plugins,
  )

  React.useEffect(() => {
    if (setApi && instanceRef.current) {
      setApi(instanceRef.current)
    }
  }, [instanceRef, setApi])

  const contextValue = React.useMemo(
    () => ({
      sliderRef,
      api: instanceRef.current,
      orientation,
      opts,
    }),
    [sliderRef, instanceRef.current, orientation, opts],
  )

  return (
    <SliderContext.Provider value={contextValue}>
      <div
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="slider"
        {...props}
      >
        {children}
      </div>
    </SliderContext.Provider>
  )
}

// SliderContent
function SliderContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { sliderRef, orientation } = useSlider()

  return (
    <div ref={sliderRef} className="keen-slider overflow-hidden" data-slot="slider-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '' : 'flex-col', className)}
        {...props}
      />
    </div>
  )
}

// SliderItem (Slide)
function SliderItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="slider-item"
      className={cn('keen-slider__slide min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  )
}

export { type SliderApi, Slider, SliderContent, SliderItem, useSlider }
