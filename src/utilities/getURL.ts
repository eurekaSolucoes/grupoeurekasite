import canUseDOM from './canUseDOM'
import { clientEnv } from '@/lib/env/client'
import { serverEnv } from '@/lib/env/server'

export const getServerSideURL = () => {
  return (
    clientEnv.NEXT_PUBLIC_SERVER_URL ||
    (serverEnv.VERCEL_URL
      ? `https://${serverEnv.VERCEL_URL}`
      : 'http://localhost:3000')
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (serverEnv.VERCEL_URL) {
    return `https://${serverEnv.VERCEL_URL}`
  }

  return clientEnv.NEXT_PUBLIC_SERVER_URL || ''
}
