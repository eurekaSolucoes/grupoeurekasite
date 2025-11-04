import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateNavigation: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating navigation`)

    revalidateTag('global_navigation', 'max')
    revalidateTag('global_header', 'max')
    revalidateTag('global_footer', 'max')
  }

  return doc
}
