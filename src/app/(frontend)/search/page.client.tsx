'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be light mode */
  const { changeHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    changeHeaderTheme({ theme: 'light', logoTheme: null })
  }, [changeHeaderTheme])
  return <React.Fragment />
}

export default PageClient
