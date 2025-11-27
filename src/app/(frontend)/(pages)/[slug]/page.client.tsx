'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Reset header theme to light with default logo variants */
  const { changeHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    changeHeaderTheme({
      theme: 'default',
      logoTheme: null, // Use defaults: icon-blue (mobile) and full (desktop)
    })
  }, [changeHeaderTheme])
  return null
}

export default PageClient
