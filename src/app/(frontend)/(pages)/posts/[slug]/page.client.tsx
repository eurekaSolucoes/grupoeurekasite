'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { changeHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    changeHeaderTheme({
      theme: 'dark',
      logoTheme: null, // Use defaults
    })
  }, [changeHeaderTheme])
  return <React.Fragment />
}

export default PageClient
